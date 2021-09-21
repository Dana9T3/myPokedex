import React, { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar({ pokemon }) {
	const [query, setQuery] = useState("");

	const searchQuery = (event) => {
		event.preventDefault();
		setQuery(event.target.value);
	};

	return (
		<div className="topnav">
			<Link to="/">Home</Link>
			<Link to="/types">Types</Link>
			<Link to="/gen">Gen</Link>
			<form>
				<input
					type="text"
					onChange={searchQuery}
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
