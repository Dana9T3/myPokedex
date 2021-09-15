import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//import PokemonInfo from "./PokemonInfo";

function AllPokemon({ pokemon }) {
	const [pokemonStats, setPokemonStats] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const fetchedStats = await Promise.all(
				pokemon.map((poke) => fetch(poke.url).then((res) => res.json()))
			);
			setPokemonStats(fetchedStats);
		}
		fetchData();
	}, [pokemon]);

	return (
		<div className="pokemonGrid">
			{pokemonStats.map((poke) => {
				return (
					<Link
						to={{
							pathname: `${poke.name}/stats`,
							state: poke,
						}}
					>
						<div className="pokemonCard" key={poke.name}>
							<img src={poke.sprites.front_default} alt={poke.name} />
							<p>{poke.name}</p>
						</div>
					</Link>
				);
			})}
		</div>
	);
}

export default AllPokemon;
