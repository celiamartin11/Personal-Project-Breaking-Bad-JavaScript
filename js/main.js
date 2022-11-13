'use strict'; 

//VARIABLES HTML
const inputSearchHtml = document.querySelector('.js-input');
const buttonSearchHtml = document.querySelector('.js-button-search');
const charactersHtml = document.querySelector('.js-character-list');


//ARRAY
let characterList = [];


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


//EVENTO
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
        `<li class="card">
            <img class="card-image" src="${character.img}" alt="${character.name}">
            <h2 class="card-name">${character.name}</h2>
            <h2 class="card-life">
            </h2>
        </li>`;
    }
};


