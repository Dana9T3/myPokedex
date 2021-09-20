import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const SearchedPokemon = ({ pokemon }) => {
	const [searchedPokemon, setSearchedPokemon] = useState([]);
	const location = useLocation();
	const query = location.state;

	const results = pokemon.filter((poke) => {
		return poke.name.startsWith(query);
	});

	useEffect(() => {
		async function fetchData() {
			const fetchedStats = await Promise.all(
				results.map((poke) => fetch(poke.url).then((res) => res.json()))
			);
			setSearchedPokemon(fetchedStats);
		}
		fetchData();
	}, [pokemon]);

	return (
		<div className="pokemonGrid">
			{searchedPokemon.map((poke) => {
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
								<p>{poke.name}</p>
							</div>
						</Link>
					</div>
				);
			})}
		</div>
	);
};

export default SearchedPokemon;
