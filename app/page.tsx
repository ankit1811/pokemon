import { fetchPokemon } from "./actions/getPokemon";
import { fetchPokemonType } from "./actions/getPokemonTypes"
import LoadPokemon from "@/components/LoadPokemon";
import Search from "@/components/Search";
const Page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	
	const type =
		typeof searchParams.type === "string" ? searchParams.type : undefined;

	const pokemonTypes = await fetchPokemonType()
	const pokemon = await fetchPokemon({ search, type });
	return (
		<div className="max-w-[1500px] w-[100%] mx-auto">
			<Search search={search} types={pokemonTypes}/>
			<div className="pt-10">
				<LoadPokemon search={search} type={type} initialPokemon={pokemon} />
			</div>
		</div>
	);
};

export default Page;
