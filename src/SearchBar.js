import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar({ pokemon }) {
	const [query, setQuery] = useState("");

	const searchQuery = (event) => {
		event.preventDefault();
		setQuery(event.target.value);
	};

	// const handleKeyPress = (event) => {
	// 	if (event.keyCode === 13) {
	// 		handleSubmit();
	// 	}
	// };

	const handleSubmit = () => {
		// const matchedPokemon = pokemon.map((poke) => {
		// 	if (poke.name.includes(query)) {
		// 		return poke;
		// 	}
		// });
		//<SearchedPokemon />;
	};

	return (
		<div className="topnav">
			<Link to="/">Home</Link>
			<Link to="/types">Types</Link>
			<Link to="/gen">Gen</Link>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={searchQuery}
					//onKeyPress={handleKeyPress}
					placeholder="Search Pokemon..."
				></input>
				<button>
					<Link
						to={{
							pathname: "/search",
							state: query,
						}}
					>
						Search
					</Link>
				</button>
			</form>
		</div>
	);
}

export default SearchBar;
