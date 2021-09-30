const fetchEvoChain = async (evoChainUrl) => {
	const fetchedEvoChain = fetch(evoChainUrl).then((res) => res.json());
	return fetchedEvoChain;
};

export default fetchEvoChain;
