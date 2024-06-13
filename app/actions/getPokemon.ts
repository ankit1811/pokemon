"use server"
// Define a type for individual Pokemon

export async function getPokemon({query, page = 1, limit = 1000}: {
  query?: string
  page? :number
  limit?: number
}) {
  let apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * 24}`
  try {
    const response = await fetch(apiUrl)
    const data = await response.json()

    if (query) {
      const filteredPokemon = data.results.filter((pokemon: {name: string}) => 
      pokemonNameStartsWithQuery(pokemon.name, query.toLowerCase())
      )

      return filteredPokemon.slice(0, 24)
    } else {
      return data.results.slice(0, 24)
    }
  } catch (error) {
    console.log(error)
    return null
  }
}

function pokemonNameStartsWithQuery(name: string, query: string) {
  return name.toLowerCase().startsWith(query)
}

export async function fetchPokemon({page = 1, search, type,}: {page?:number; search?: string | undefined; type?: string | undefined}) {
  try {
    if(type){
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}/`)
      const pokemonData = await res.json()
      const pokemonList = pokemonData.pokemon.map((item:{pokemon:{name:string;url:string}})=>item.pokemon)
      return pokemonList
      // console.log(pokemonList,  "above")
    }
    const pokemonData = await getPokemon({query: search, page})
    // console.log("pokemonData", pokemonData)
    return pokemonData

    
  } catch (error) {
    console.log(error)
    return null
  }
}



