const params = new URLSearchParams(window.location.search)
const name = params.get('name')
const number = params.get('number')

if (name && number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`

    // Reutiliza o método que já busca e converte os detalhes
    pokeApi.getPokemonDetail({ url })
        .then(pokemon => {
            const detalheDiv = document.getElementById('detalhePokemon')
            detalheDiv.innerHTML = `
                <div class="pokemon ${pokemon.type}">
                    <a href="../index.html" class="btn-voltar">⬅</a>
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>

                    
                    <div class="detail">
                        <div class="types">
                            ${pokemon.types.map(tipo => `<span class="type ${tipo}">${tipo}</span>`).join('')}
                            <div class="caracteristicas">
                                <p>Height: ${pokemon.height / 10} m</p>
                                <p>Weight: ${pokemon.weight / 10} kg</p>
                                <p>Abilities: ${pokemon.abilities.join(', ')}</p>
                            </div>
                        </div>
                            
                        <img src="${pokemon.photo}" alt="${pokemon.name}">
                    </div>

                        
                    <h3>Stats</h3>
                    <ul class="stats-list">
                        ${pokemon.stats.map(stat => `
                            <li class="stat">
                                <span class="stat-name">${stat.name}</span>
                                <div class="stat-bar">
                                    <div class="stat-fill" style="width: ${stat.base / 2}%;"></div>
                                </div>
                                <span class="stat-value">${stat.base}</span>
                            </li>
                        `).join('')}
                    </ul>                           
                </div>
            `
        })
} else {
    document.getElementById('detalhePokemon').innerHTML = `<h1>Pokémon não encontrado</h1><a href="index.html">⬅ Voltar</a>`
}
