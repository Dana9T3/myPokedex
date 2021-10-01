import { Radar } from "react-chartjs-2";
import React from "react";

const RadarChart = ({ pokeStats, pokeName }) => {
	// docs found at https://github.com/reactchartjs/react-chartjs-2
	const RadarData = {
		labels: [],
		datasets: [],
	};

	// your current labels array was empty
	RadarData.labels = [
		"HP",
		"Attack",
		"Defense",
		"Special-Attack",
		"Special-Defense",
		"Speed",
	];

	// this is also empty you need your data in here rather than at the root of pokeStats object
	RadarData.datasets = [
		{
			label: pokeName,
			backgroundColor: "rgb(28, 99, 139)",
			borderColor: "white",
			pointBackgroundColor: "rgba(34, 202, 236, 1)",
			pointBorderColor: "#fff",
			pointHoverBackgroundColor: "#fff",
			pointHoverBorderColor: "rgba(34, 202, 236, 1)",
			// the stat values need to be in this array in the order of the labels so some fancy mapping needed
			data: [
				pokeStats[0].base_stat,
				pokeStats[1].base_stat,
				pokeStats[2].base_stat,
				pokeStats[3].base_stat,
				pokeStats[4].base_stat,
				pokeStats[5].base_stat,
			],
		},
	];

	//console.log(RadarData);
	//console.log(pokeStats);

	const RadarOptions = {
		scale: {
			ticks: {
				min: 0,
				max: 160,
				stepSize: 20,
				showLabelBackdrop: false,
				backdropColor: "rgba(203, 197, 11, 1)",
			},
		},
	};

	return (
		<div className="radarChart">
			<Radar data={RadarData} options={RadarOptions} height={200} />
		</div>
	);
};

export default RadarChart;
