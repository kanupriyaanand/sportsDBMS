import React from "react";
import Chart from "react-apexcharts";

const Graph = ({ data }) => {
  console.log(data);

  const options = {
    labels: [
      "football",
      "cricket",
      "yoga",
      "hockey",
      "basketball",
      "gymnastics",
      "badminton",
    ],
  };
  return (
    <div className="bg-white w-fit mt-5 mx-auto rounded-2xl p-5">
      <Chart options={options} type="pie" series={data} width="380" />
    </div>
  );
};

export default Graph;
