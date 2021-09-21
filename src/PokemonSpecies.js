import React, { useEffect, useState } from "react";
import fetchSpeciesData from "./util-functions/fetchPokeSpecies";

const PokemonSpecies = ({ pokeId }) => {
	const [pokemonData, setPokemonData] = useState({});
	const [evolutonChainData, setEvolutionChainData] = useState({});
	//const evoChainUrl = pokemonData.evolution_chain.url;
	useEffect(() => {
		async function useUtil() {
			const data = await fetchSpeciesData(pokeId);
			setPokemonData(data);
		}
		useUtil();
	}, [pokeId]);

	useEffect(() => {
		async function fetchSpeciesData() {
			const fetchedStats = await fetch(pokemonData.evolution_chain.url).then(
				(res) => res.json()
			);

			setEvolutionChainData(fetchedStats);
		}
		fetchSpeciesData();
	}, [pokeId]);

	console.log(pokemonData.evolution_chain);

	return (
		<div>
			<h1>Evolution Chain</h1>
			<div className="evoGrid">
				<h3>evo1</h3>
				<h3>evo1</h3>
				<h3>evo1</h3>
			</div>
		</div>
	);
};

export default PokemonSpecies;
