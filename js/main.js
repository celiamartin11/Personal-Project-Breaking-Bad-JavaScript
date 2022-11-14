'use strict'; 

//VARIABLES HTML
const inputSearchHtml = document.querySelector('.js-input');
const buttonSearchHtml = document.querySelector('.js-button-search');
const charactersHtml = document.querySelector('.js-character-list');
const charactersFavHtml = document.querySelector('.js-character-favourites-list');
const buttonResetHtml = document.querySelector('.js-button-reset');
let cardHtml;

//ARRAY
let characterList = [];
let characterFavList = [];

//LLAMAR API. 
fetch('https://breakingbadapi.com/api/characters')
    .then(function (response) {
        return response.json();
    })
    //INFO QUE DEVUELVE LA API
    .then(function(data) { 
        //LLAMA A LA FUNCIÓN showCaracterCards PASANDO EL data QUE RECIBO DEL API (LINE41)
        showCharacterCards(data);
    });



//EVENTO BUTTON SEEARCH
buttonSearchHtml.addEventListener("click", (event) => {
    event.preventDefault();
    //LLAMAR A LA API
    fetch(`https://breakingbadapi.com/api/characters?name=${inputSearchHtml.value}`)
    .then(function (response) {
        return response.json();
    })
    //INFO QUE DEVUELVE LA API
    .then(function(data) { 
        //LLAMA A LA FUNCIÓN showCaracterCards PASANDO EL data QUE RECIBO DEL API (LINE41)
        showCharacterCards(data);
    });
});


//FUNCIÓN QUE MUESTRA LAS TARJETAS DE PERSONAJES RECIBIENDO data 
function showCharacterCards(data) {
    //LIMPIA EL CONTENIDO (MENSAJE 'CARGANDO...')
    charactersHtml.innerHTML = '';
    //GUARDA RESPUESTA DE API EN NUESTRO ARRAY (LISTA DE PERSONAJES)
    characterList = data;
    //RECORRE LISTA DE PERSONAJES
    for (const character of characterList) {
        //CREA Y MUESTRA TARJETA CON NOMBRE, IMAGEN Y VIVO/MUERTO
        charactersHtml.innerHTML += 
        `<li class="card js-card" id="${character.char_id}">
            <img class="card-image" src="${character.img}" alt="${character.name}">
            <h2 class="card-name">${character.name}</h2>
            <h2 class="card-life">${character.status}</h2>
        </li>`;
    }

    //UNA VEZ MOSTRAMOS TODAS LAS TARJETAS DE LOS PERSONAJES, LES AGREGAMOS LOS EVENT LISTENERS DE CLICK
    //GUARDAMOS EN UNA LISTA TODOS LOS ELEMENTOS HTML DE TARJETAS DE PERSONAJE
    let allCharactersCards = document.querySelectorAll(".js-card");
    //RECORREMOS LA LISTA DE ELEMENTOS DE PERSONAJES DE HTML
    for(const characterCard of allCharactersCards) {
        //LE AGREGAMOS A CADA TARJETA DE PERSONAJE UN LISTENER DE CLICK, Y CUANDO SE HAGA CLICK LLAMA A LA FUNCION 'clickCharacterEvent'
        characterCard.addEventListener("click", clickCharacterEvent);
    }
};

function clickCharacterEvent(event) {
    //RECORRE EL ARRAY (LISTA) ENTERA DE PERSONAJES
    for(const character of characterList) {
        //SI EL ID DEL PERSONAJE QUE ESTOY RECORRIENDO (character.char_id) ES IGUAL AL ID DEL PERSONAJE QUE HE SELECCIONADO (event.currentTarget.id)
        if(character.char_id == event.currentTarget.id) {
            //SI EL PERSONAJE QUE ESTAMOS SELECIONANDO (character) NO ESTÁ YA INCLUIDO EN LA LISTA DE FAVORITOS (characterFavList)
            if(!characterFavList.includes(character)) {
                //SE GUARDA EL SELECCIONADO EN LA VARIABLE characterFavSelected
                characterFavList.push(character);
            }
        }
    }

    charactersFavHtml.innerHTML = '';
    //UNA VEZ AGREGADO EL PERSONAJE A LA LISTA DE FAVORITOS, MOSTRAMOS LA LISTA POR PANTALLA
    for (const characterFav of characterFavList) {
        //CREA Y MUESTRA TARJETA CON NOMBRE, IMAGEN Y VIVO/MUERTO
        charactersFavHtml.innerHTML += 
        `<li class="card js-card" id="${characterFav.char_id}">
            <img class="card-image" src="${characterFav.img}" alt="${characterFav.name}">
            <h2 class="card-name">${characterFav.name}</h2>
            <h2 class="card-life">${characterFav.status}</h2>
        </li>`;
    }
}

/*
//EVENTO BUTTON RESET
buttonResetHtml.addEventListener("click", (event) => {
    event.preventDefault();
});
*/