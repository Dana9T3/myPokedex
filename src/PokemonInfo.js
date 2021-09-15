import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
//import { Radar } from "react-chartjs-2";

function PokemonInfo() {
	const [damageRelations, setDamageRelations] = useState({});
	const [encounterLocation, setEncounterLocation] = useState([]);
	const location = useLocation();
	const poke = location.state;

	useEffect(() => {
		async function fetchData() {
			const fetchedStats = await fetch(poke.types[0].type.url).then((res) =>
				res.json()
			);

			setDamageRelations(fetchedStats);
		}
		fetchData();
	}, [poke]);

	useEffect(() => {
		async function fetchLocation() {
			const fetchedLocation = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${poke.id}/encounters`
			).then((res) => res.json());
			setEncounterLocation(fetchedLocation);
		}
		fetchLocation();
	}, [poke.id]);

	console.log(encounterLocation);

	return (
		<div className="pokemonContainer">
			<h1 className="pokeName">{poke.name.toUpperCase()}</h1>
			<div className="pokemonGrid">
				<img src={poke.sprites.front_default} alt={poke.name}></img>
				<img src={poke.sprites.front_shiny} alt={poke.name}></img>
				<p>Default Sprite</p>
				<p>Shiny Variant</p>
				{encounterLocation ? (
					<div className="pokemonInfo1">
						<h2>Types</h2>

						{poke.types.map((type) => {
							return <li>{type.type.name.toUpperCase()}</li>;
						})}

						<h2>Base Stats</h2>
						{poke.stats.map((stat) => {
							return (
								<div>
									<li>
										{stat.stat.name.toUpperCase()}: {stat.base_stat}
									</li>
								</div>
							);
						})}
					</div>
				) : (
					<p>Loading...</p>
				)}

				{damageRelations.damage_relations ? (
					<div className="pokemonInfo2">
						<h2>Damage Relations</h2>
						<h3>Strengths</h3>
						{damageRelations.damage_relations.double_damage_to.map((stat) => {
							return <li>{stat.name.toUpperCase()}</li>;
						})}
						<h3>Weaknesses</h3>
						{damageRelations.damage_relations.double_damage_from.map((stat) => {
							return <li>{stat.name.toUpperCase()}</li>;
						})}
						<h3>Immune Against</h3>
						{damageRelations.damage_relations.no_damage_from.length === 0 ? (
							<li>NONE</li>
						) : (
							damageRelations.damage_relations.no_damage_from.map((stat) => {
								return <li>{stat.name.toUpperCase()}</li>;
							})
						)}
					</div>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<div className="locationContainer">
				<h2>Locations</h2>
				<div className="locationsGrid">
					{encounterLocation.map((loc) => {
						return (
							<p>{loc.location_area.name.replace(/-/g, " ").toUpperCase()}</p>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default PokemonInfo;
