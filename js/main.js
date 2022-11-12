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
        //GUARDA RESPUESTA DE API EN NUESTRO ARRAY (LISTA DE PERSONAJES)
        characterList = data;
        console.log(characterList);
        //RECORRE LISTA DE PERSONAJES
        for (const character of characterList) {
            console.log(character);
            //CREAR TARJETA CON NOMBRE, IMAGEN Y VIVO/MUERTO
            charactersHtml.innerHTML += 
            `<li class="card">
                <img class="card-image" src="${character.img}">
                <h2 class="card-name">${character.name}</h2>
                <h2 class="card-life">${character.status}</h2>
            </li>`;
        }
    });


    