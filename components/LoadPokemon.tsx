"use client";
import { fetchPokemon } from "@/app/actions/getPokemon";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";
import PokemonCard, { Pokemon } from "./PokemonCard";
import SkeletonLoader from "./SkeletonLoader";
import NoDataFound from "./NoDataFound";

const LoadPokemon = ({
  search,
  initialPokemon,
}: {
  type: string | undefined;
  search: string | undefined;
  initialPokemon: Pokemon[] | undefined;
}) => {
  const [pokemon, setPokemon] = useState(initialPokemon);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const { inView, ref } = useInView();

  //HELPER FUNCTION HERE!!
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMorePokemon = async () => {
    setLoading(true);
    await delay(1000);
    const nextPage = page + 1;
    const newPokemon = await fetchPokemon({
      search,
      page: nextPage,
    });
    setPage(nextPage);
    setPokemon((prev) => {
      if (!prev) return newPokemon;
      const uniquePokemon = newPokemon.filter(
        (poke: Pokemon) =>
          !prev.some((p) => p.name === poke.name)
      );
      return [...prev, ...uniquePokemon];
    });
    setLoading(false);
  };


  useEffect(() => {
    if (inView) {
      loadMorePokemon();
    }
  }, [inView]);

  useEffect(()=>{
    setPokemon(initialPokemon)
  },[initialPokemon])



  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:pl-[3.1rem] place-items-center px-5 md:px-10">
        {loading && Array(3)
        .fill(1)
        .map((card, index) => (
           <SkeletonLoader />
        ))}
        {pokemon?.map((poke: Pokemon) => (
          <PokemonCard key={poke.url} pokemon={poke} />
        ))}
      </div>
      {pokemon && pokemon.length >= 24 && (
        <div
          className="flex justify-center items-center p-4"
          ref={ref}
        > 
          <ClipLoader color="#60e2c9" />
        </div>
      )}
        {loading &&<div
          className="flex justify-center items-center p-4"
        
        >
          <ClipLoader color="#60e2c9" />
        </div>}
        {!pokemon?.length && !loading && <NoDataFound  message="There is no data available at the moment."/>}

    </>
  );
};

export default LoadPokemon;
