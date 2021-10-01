import { Radar } from "react-chartjs-2";
import React from "react";

const RadarChart = ({ pokeStats }) => {
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
      label: "pokemon",
      backgroundColor: "rgba(34, 202, 236, .2)",
      borderColor: "rgba(34, 202, 236, 1)",
      pointBackgroundColor: "rgba(34, 202, 236, 1)",
      poingBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(34, 202, 236, 1)",
      // the stat values need to be in this array in the order of the labels so some fancy mapping needed
      data: [80, 82, 83, 100, 100, 80],
    },
  ];

  console.log(RadarData);
  console.log(pokeStats);

  const RadarOptions = {
    scale: {
      ticks: {
        min: 0,
        max: 100,
        stepSize: 20,
        showLabelBackdrop: false,
        backdropColor: "rgba(203, 197, 11, 1)",
      },
    },
  };

  return (
    <div>
      <Radar data={RadarData} options={RadarOptions} />
    </div>
  );
};

export default RadarChart;
