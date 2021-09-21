import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import AllPokemon from "./AllPokemon";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PokemonInfo from "./PokemonInfo";
import SearchedPokemon from "./SearchedPokemon";

function App() {
	const [pokemon, setPokemon] = useState([]);

	useEffect(() => {
		fetch("https://pokeapi.co/api/v2/pokemon?limit=151").then((res) => {
			res.json().then((data) => {
				setPokemon(data.results);
			});
		});
	}, [setPokemon]);

	return (
		<BrowserRouter>
			<div className="App">
				<SearchBar pokemon={pokemon} />
				<h1>Welcome to My Pokedex</h1>
				<p>
					This is a recreational project of mine aimed to enable users to search
					for any Pokemon they desire and find all the information they require
					such as type, location in game and stats.
					<br />
					<br />
					At this stage, users can:
					<li>View all Generation 1 Pokemon</li>
					<li>
						Click on Pokemon and view relevant statistics for the selected
						Pokemon
					</li>
					<li>Search for specific generation 1 Pokemon using the search bar</li>
				</p>
				<Switch>
					<Route exact path="/">
						<AllPokemon pokemon={pokemon} />
					</Route>
					<Route exact path="/:something*/stats">
						<PokemonInfo pokemon={pokemon} />
					</Route>
					<Route exact path="/search">
						<SearchedPokemon pokemon={pokemon} />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
