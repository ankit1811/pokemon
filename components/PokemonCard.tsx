
import Image from "next/image";
import Link from "next/link";

export interface Pokemon {
	url: string;
	name: string;
}

interface Props {
	pokemon: Pokemon;
}
const PokemonCard: React.FC<Props> = ({ pokemon }) => {
	const parts = pokemon?.url.split("/");
	const pokemonId = parts[parts.length - 2];

	return (
		<div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-[100%] h-[100%]">
			<div className="flex items-center justify-center min-h-[200px]">
				<img
					className="rounded-t-lg max-w-[60%] "
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${pokemonId}.png`}
					alt=""
				/>
			</div>
			<div className="p-5 bg-gray-100 rounded-b-lg">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
					{pokemon?.name}
				</h5>

				<div>
					<Link
						href={`/${pokemon.name}?id=${pokemonId}`}
						className="mt-20 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-purple hover:underline"
					>
						Read more
						<svg
							className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 14 10"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 5h12m0 0L9 1m4 4L9 9"
							/>
						</svg>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
