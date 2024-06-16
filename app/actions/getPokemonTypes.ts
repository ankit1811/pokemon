"use server"

export async function fetchPokemonType() {
	try {
		const res = await fetch('https://pokeapi.co/api/v2/type');
		const pokemonTypes = await res.json()
		return await pokemonTypes.results
	} catch (error) {
		console.log(error)
		return []
	}
}