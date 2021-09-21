async function fetchSpeciesData(id) {
	const fetchedSpeciesData = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id}/`
	).then((res) => res.json());

	return fetchedSpeciesData;
}

async function fetchEvoChain() {}

export default fetchSpeciesData;
