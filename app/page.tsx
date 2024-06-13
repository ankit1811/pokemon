import { fetchPokemon } from "./actions/getPokemon";
import LoadPokemon from "@/components/LoadPokemon";
import Search from "@/components/Search";
const Page = async ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {

  const res = await fetch('https://pokeapi.co/api/v2/type');
  const types = await res.json();

	const search =
		typeof searchParams.search === "string" ? searchParams.search : undefined;
	
	const type =
		typeof searchParams.type === "string" ? searchParams.type : undefined;

	const pokemon = await fetchPokemon({ search, type });
	return (
		<div className="max-w-[1500px] w-[100%] mx-auto">
			<Search search={search} types={types?.results}/>
			<ul key={Math.random()}>
				<LoadPokemon search={search} type={type} initialPokemon={pokemon} />
			</ul>
		</div>
	);
};

export default Page;
