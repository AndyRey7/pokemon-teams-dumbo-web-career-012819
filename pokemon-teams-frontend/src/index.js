const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const mainTag = document.querySelector("main");


const trainerCard = (trainer) => {
    return `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
                <button data-trainer-id=${trainer.id}>Add Pokemon</button>
                <ul>
                </ul>
            </div>`
}

fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then((parsed) => {
        parsed.forEach(trainer => {
        //console.log(trainer.name)
        mainTag.innerHTML += trainerCard(trainer)
        let trainerCardDiv = document.querySelector(`[data-id='${trainer.id}']`)
        trainer.pokemons.forEach(pokemon => {
            trainerCardDiv.innerHTML +=
            `<li>
            ${pokemon.nickname} (${pokemon.species})
            <button class="release" data-pokemon-id="140">Release</button>
            </li>`
        })
    })
})

const addPokemonFetchData = (event) => {
    return fetch(POKEMONS_URL, {
       method: 'POST',
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       },
       body: JSON.stringify({trainer_id: event.target.dataset.trainerId})
   }).then(response => response.json())
}

const releasePokemonFetch = (event) => {
    return fetch(POKEMONS_URL, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}


    mainTag.addEventListener('click', (event) => {
        if(event.target.textContent === "Add Pokemon") {
             addPokemonFetchData(event)
             .then(pokemonObj => {
                 event.target.parentElement.innerHTML +=
                 `<li>
                 ${pokemonObj.nickname} (${pokemonObj.species})
                 <button class="release" data-pokemon-id="${pokemonObj.id}">Release</button>
                 </li>`;
             })
         }
          else if (event.target.textContent === "Release") {
              releasePokemonFetch(event.target.dataset.id).then(() => {
                  //debugger
                  event.target.parentElement.remove();
              })
          }
         //     releasePokemonFetch(event).then( () => {
         //
         //     })
         // }
    })
