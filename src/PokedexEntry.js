import React, { useEffect, useState } from "react";
import fetchSpeciesData from "./util-functions/fetchPokeSpecies";

const PokedexEntry = ({ pokeId }) => {
	const [pokemonData, setPokemonData] = useState({});

	useEffect(() => {
		async function useUtil() {
			const data = await fetchSpeciesData(pokeId);
			setPokemonData(data);
		}
		useUtil();
	}, [pokeId]);

	return (
		<div>
			{pokemonData.flavor_text_entries ? (
				<div className="pokemonEntry">
					{pokemonData.flavor_text_entries.map((entry) => {
						if (entry.language.name === "en" && entry.version.name === "red") {
							return <p>{entry.flavor_text}</p>;
						} else return null;
					})}
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default PokedexEntry;
