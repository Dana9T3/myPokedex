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
		<div>
			<p>Filter by</p>
			<div className="searchOptions">
				<li>Type</li>
				<li>HP</li>
				<li>Attack</li>
				<li>Defense</li>
				<li>Speed</li>
				<li>Location</li>
			</div>

			<div className="pokemonGrid">
				{pokemonStats.map((poke) => {
					return (
						<div className="pokemonSlot">
							<Link
								to={{
									pathname: `${poke.name}/stats`,
									state: poke,
								}}
							>
								<div className="pokemonCard" key={poke.name}>
									<img src={poke.sprites.front_default} alt={poke.name} />
									<p>{poke.name.toUpperCase()}</p>
								</div>
							</Link>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default AllPokemon;
