import React, { useEffect, useState } from "react";
import fetchSpeciesData from "./util-functions/fetchPokeSpecies";
import fetchEvoChain from "./util-functions/fetchEvoChain";

const PokemonSpecies = ({ pokeId, poke }) => {
	const [pokemonData, setPokemonData] = useState({});
	const [evolutonChainData, setEvolutionChainData] = useState({});
	const [evoChainUrl, setEvoChainUrl] = useState("");
	const [evolutions, setEvolutions] = useState([]);

	useEffect(() => {
		async function useUtil() {
			const data = await fetchSpeciesData(pokeId);
			setPokemonData(data);
			setEvoChainUrl(data.evolution_chain.url);
		}
		useUtil();
		async function fetchEvoData() {
			const data = await fetchEvoChain(evoChainUrl);

			setEvolutionChainData(data);
		}
		fetchEvoData();
	}, [pokeId, evoChainUrl]);

	//console.log("chain", evolutonChainData);

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
