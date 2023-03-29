import React, { useEffect } from "react";
import Chart from "react-apexcharts";

const Graph = ({ data, setFiler }) => {
  console.log(data);
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
    "tennis",
    "weight lifting",
    "table tennis",
    "high jump",
    "long jump",
    "swimming",
  ];

  const options = {
    labels: game,
  };



  return (
    <div className="bg-white w-fit mt-5 mx-auto rounded-2xl p-5">
      <span>Statistics of applicants for try-outs</span>
      
      <Chart options={options} type="pie" series={data} width="380" />
    </div>
  );

  // const data1= data.map((e,i)=>{ return {x:game[i], y:e}});
  // console.log(data1)
  // const state = {
  //   options: {
  //     chart: {
  //       id: "basic-bar"
  //     },
  //     xaxis: {
  //       categories: game
  //     }
  //   },
  //   series: [
  //     {
  //       name: "series-1",
  //       data: data
  //     }
  //   ]
  // };
  // const options = {
  //   chart: {
  //     type: 'bar'
  //   },
  //   series: [{
  //     data: data1
  //   }]
  // };
  // return (
  //   <div className="bg-white w-fit mt-5 mx-auto rounded-2xl p-5">
  //     <span>Statistics of applicants for try-outs</span>

  //     <Chart
  //             options={state.options}
  //             series={state.series}
  //             type="bar"
  //             width="500"
  //           />
  //   </div>
  // );
};

export default Graph;
