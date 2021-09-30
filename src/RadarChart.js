import { Radar } from "chart.js";
import React from "react";

const RadarChart = ({ pokeStats }) => {
	console.log(pokeStats);

	return (
		<div>
			<Radar />
		</div>
	);
};

export default RadarChart;
