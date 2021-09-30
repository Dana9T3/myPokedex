const fetchSpeciesData = async (id) => {
	const fetchedSpeciesData = await fetch(
		`https://pokeapi.co/api/v2/pokemon-species/${id}/`
	).then((res) => res.json());

	return fetchedSpeciesData;
};

export default fetchSpeciesData;
//export { fetchEvoChain };
