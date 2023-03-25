import React,{useEffect} from "react";
import Chart from "react-apexcharts";

const Graph = ({ data }) => {
  const game = [
    "football",
    "cricket",
    "yoga",
    "hockey",
    "basketball",
    "gymnastics",
    "badminton",
    "volleyball",
    "javelin",
    "throwball",
    "weight lifting",
    "table tennis",
    "swimming"
  ];

  const options = {
    labels: game
  };

  return (
    <div className="bg-white w-fit mt-5 mx-auto rounded-2xl p-5">
      <span>Statistics of applicants for try-outs</span>
      <Chart options={options} type="pie" series={data} width="380" />
    </div>
  );
};

export default Graph;
