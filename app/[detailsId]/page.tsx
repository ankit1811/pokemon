"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "@/components/SkeletonLoader";
import BackButton from "@/components/GoBack"

interface Ablility {
	ability: {
		name: string;
	};
}

interface PokemonData {
	name: string;
	abilities: Ablility[];
	sprites: {
		front_default: string;
	};
	types: { type: { name: string } }[];
	stats: { stat: { name: string } }[];
	moves: { move: { name: string } }[];
}

const PokemonDetails = ({
	searchParams,
}: {
	searchParams: {
		[key: string]: string | string[] | undefined;
	};
}) => {
	const [data, setData] = useState<PokemonData | null>(null);
	const [loader, setLoader] = useState(false)

	const pathname = usePathname();
	useEffect(() => {
		const fetchPokemonData = async () => {
			try {
				setLoader(true)
				const response = await fetch(
					`https://pokeapi.co/api/v2/pokemon/${searchParams?.id}/`,
				);
				setLoader(false)
				if (!response.ok) {
					throw new Error("failed to fetch");
				}
				const fetchedData: PokemonData = await response.json();
				setData(fetchedData);
			} catch (error) {
				console.log(error);
				return null;
			}
		};

		fetchPokemonData();
	}, []);
	
	return (
		<div className="px-5">
			<BackButton />
			<div>
			<Link href="/" className="text-blue-900">{`Home > ${pathname.replace(/\//g, '')}`}</Link>

			</div>
			<div className="flex items-center justify-center flex-col relative mt-5">
				{loader ? <SkeletonLoader />:
				<div className="max-w-sm bg-primary border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
					<img
						className="rounded-t-lg"
						src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${searchParams?.id}.png`}
						alt=""
					/>
					<div className="p-5 bg-secondry rounded-b-lg text-gray-900 font-bold">
						<p className="">
							Name :<span className="font-normal">{data?.name}</span>
						</p>
						<p className="with-comma">
							Type :
							{data?.types &&
								data.types.map((type, index) => (
									<span key={index} className="font-normal">{type.type.name}</span>
								))}
						</p>
						<p className="with-comma">
							Stats :
							{data?.types &&
								data.stats.map((stat, index) => (
									<span key={index} className="font-normal">{stat?.stat?.name}</span>
								))}
						</p>
						<p className="with-comma">
							Abilities :
							{data?.abilities &&
								data.abilities.map((ability, index) => (
									<span key={index} className="font-normal">{ability.ability.name}</span>
								))}
						</p>
						<p className="with-comma">
							Some Moves :
							{data?.moves &&
								data.moves
									.slice(0, 3)
									.map((move, index) => (
										<span key={index} className="font-normal">{move.move.name}</span>
									))}
						</p>
					</div>
				</div>}
			</div>
		</div>
	);
};

export default PokemonDetails;
