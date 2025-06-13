const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;


function loadPokemonItens (offset, limit) {
    
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" 
                        alt="${pokemon.name}">
                </div>
            </li>
        `).join('')
        pokemonList.innerHTML += newHtml
    })

    //comecei a futricar:
    pokemonList.addEventListener('click', function(event) {
        const clickedItem = event.target.closest('.pokemon') // procura o pai com a classe 'pokemon'

        if (clickedItem) {
            const name = clickedItem.querySelector('.name').textContent
            const number = clickedItem.querySelector('.number').textContent.replace('#', '')

            // Chama a função que mostra os detalhes
            console.log(`Clicou no Pokémon: ${name}, número: ${number}`)

            // Exemplo:
            window.location.href = `assets/details.html?name=${name}&number=${number}`
        }
    })
    //estou futricando até aqui
}

loadPokemonItens (offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsWithNexPage = offset + limit 

    if(qtdRecordsWithNexPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItens (offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        
        loadPokemonItens (offset, limit)
    }
})