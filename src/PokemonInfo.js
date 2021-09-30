import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import RadarChart from "./RadarChart";
import PokedexEntry from "./PokedexEntry";
import PokemonSpecies from "./PokemonSpecies";

function PokemonInfo() {
	const [damageRelations, setDamageRelations] = useState({});
	const [encounterLocation, setEncounterLocation] = useState([]);
	const [open, setOpen] = useState(false);

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

	const toggleOpen = () => {
		setOpen((currOpen) => !currOpen);
	};

	return (
		<div className="pokemonContainer">
			<h1 className="pokeName">{poke.name.toUpperCase()}</h1>
			<PokedexEntry pokeId={poke.id} />
			<div className="singlePokemonGrid">
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
										{stat.stat.name.replace(/-/g, " ").toUpperCase()}:{" "}
										{stat.base_stat}
									</li>
								</div>
							);
						})}
						<button
							onClick={() => {
								toggleOpen();
							}}
						>
							See Stats on Chart
						</button>
						{open ? <RadarChart pokeStats={poke.stats} /> : null}
					</div>
				) : (
					<p>Loading...</p>
				)}

				{damageRelations.damage_relations ? (
					<div className="pokemonInfo2">
						<h2>Damage Relations</h2>
						<h3>Strengths</h3>
						{damageRelations.damage_relations.double_damage_to.length === 0 ? (
							<li>NONE</li>
						) : (
							damageRelations.damage_relations.double_damage_to.map((stat) => {
								return <li>{stat.name.toUpperCase()}</li>;
							})
						)}

						<h3>Weaknesses</h3>
						{damageRelations.damage_relations.double_damage_from.length ===
						0 ? (
							<li>NONE</li>
						) : (
							damageRelations.damage_relations.double_damage_from.map(
								(stat) => {
									return <li>{stat.name.toUpperCase()}</li>;
								}
							)
						)}

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
			<PokemonSpecies pokeId={poke.id} poke={poke} />
			<div className="locationContainer">
				<h2>Locations</h2>
				<div className="locationsGrid">
					{encounterLocation.map((loc) => {
						// if (encounterLocation === undefined) {
						// 	return (
						// 		<div className="pokemonLocationDetails">
						// 			<p>This Pokemon cannot be caught in the wild.</p>
						// 		</div>
						// 	);
						// } else
						return (
							<div className="pokemonLocationDetails">
								<h4>
									{loc.location_area.name.replace(/-/g, " ").toUpperCase()}
								</h4>
								<p>
									Version:{" "}
									{loc.version_details[0].version.name.replace(/-/g, " ")}
								</p>
								<p>
									Chance of Encounter:{" "}
									{loc.version_details[0].encounter_details[0].chance}%
								</p>
								<p>
									Max Level:{" "}
									{loc.version_details[0].encounter_details[0].max_level}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default PokemonInfo;
