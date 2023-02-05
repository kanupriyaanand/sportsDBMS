import React from "react";
import Chart from "react-apexcharts";

const Graph = ({ data }) => {
  console.log(data);
  const game = [
    "football",
    "cricket",
    "yoga",
    "hockey",
    "basketball",
    "gymnastics",
    "badminton",
  ];

  const options = {
    labels: game
  };

  return (
    <div className="bg-white w-fit mt-5 mx-auto rounded-2xl p-5">
      <Chart options={options} type="pie" series={data} width="380" />
    </div>
  );
};

export default Graph;
