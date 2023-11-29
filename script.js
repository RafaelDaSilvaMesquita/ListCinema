const reponseArticles = await fetch("films-JSON.json");

const films = await reponseArticles.json();
//console.log(films);

// Trier les films par année du plus vieux au plus récent
films.sort((a, b) => a.year - b.year);

//j'appelle une première fois ma fonction pour remplir ma page
afficherFilms(films);


const boutonTriTitres = document.getElementById('triTitres');

boutonTriTitres.addEventListener('click', () => {
    // Triez les films par ordre alphabétique des titres
    films.sort((a, b) => a.title.localeCompare(b.title, 'fr', { sensitivity: 'base' }));
    afficherFilms(films);
});


// Sélectionnez le bouton
const boutonTriCroissant = document.getElementById('triBoutonCroissant');

// Ajoutez un écouteur d'événements pour le clic sur le bouton
boutonTriCroissant.addEventListener('click', () => {
    // Triez les films du plus récent au plus vieux
    films.sort((a, b) => a.year - b.year);
    // Appelez la fonction pour afficher les films après le tri
    afficherFilms(films);
});


// Sélectionnez le bouton
const boutonTriDecroissant = document.getElementById('triBoutonDecroissant');

// Ajoutez un écouteur d'événements pour le clic sur le bouton
boutonTriDecroissant.addEventListener('click', () => {
    // Triez les films du plus récent au plus vieux
    films.sort((a, b) => b.year - a.year);
    // Appelez la fonction pour afficher les films après le tri
    afficherFilms(films);
});


const selectGenre = document.getElementById('genre');

selectGenre.addEventListener('change', () => {
    const genreSelectionne = selectGenre.value;
    let filmsFiltres = [];

    if (genreSelectionne === 'Tous') {
        filmsFiltres = films; // Affichez tous les films si "Tous les genres" est sélectionné
    } else {
        // Filtrer les films par genre sélectionné
        filmsFiltres = films.filter(film => film.genre === genreSelectionne);
    }

    // Appelez la fonction pour afficher les films après le filtrage
    afficherFilms(filmsFiltres);
});


function afficherFilms(listFilms) 
{
    //selectioner les éléments du DOM que l'on veut modifier
    const monElement = document.querySelector('.main-content');

    //modifier le DOM pour le vider
    monElement.innerHTML = "";


    //console.log(listFilms)
    for (const film of listFilms) 
    {
       //console.log(film.title)
       const titreFilm = document.createElement('h2');
       titreFilm.innerHTML = film.title;
       monElement.appendChild(titreFilm);

       const anneFilm = document.createElement('p');
       anneFilm.innerHTML = film.year;
       monElement.appendChild(anneFilm);

       const genreFilm = document.createElement('p');
       genreFilm.innerHTML = film.genre;
       monElement.appendChild(genreFilm);

       const resumeFilm = document.createElement('p');
       resumeFilm.innerHTML = film.summary;
       monElement.appendChild(resumeFilm);

       const paysFilm = document.createElement('p');
       paysFilm.innerHTML = film.country;
       monElement.appendChild(paysFilm);

       // Créer une liste d'acteurs
       const acteursListe = document.createElement('p');
       acteursListe.innerHTML = 'Acteurs : ';
       for (const acteur of film.actors) {
           const acteurItem = document.createElement('li');
           acteurItem.innerHTML = `${acteur.first_name} ${acteur.last_name} (${acteur.birth_date})`;
           acteursListe.appendChild(acteurItem);
       }
       monElement.appendChild(acteursListe);

       // Afficher le réalisateur
       const realisateur = document.createElement('p');
       realisateur.innerHTML = `Réalisateur : ${film.director.first_name} ${film.director.last_name} (${film.director.birth_date})`;
       monElement.appendChild(realisateur);
    }
    
}


                    //<strong>Titre:</strong> ${film.titre}<br>
                    //<strong>Année:</strong> ${film.annee}<br>
                    //<strong>Genre:</strong> ${film.genre}<br>
                    //<strong>Resume:</strong> ${film.resume}<br>
                    //<strong>Pays:</strong> ${film.pays}<br></br>