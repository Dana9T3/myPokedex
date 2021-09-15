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
				<Switch>
					<Route exact path="/">
						<AllPokemon pokemon={pokemon} />
					</Route>
					<Route exact path="/:something*/stats">
						<PokemonInfo />
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
