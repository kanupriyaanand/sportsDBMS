import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DataTable = ({ value }) => {
  let users = [];
  const [data, setData] = useState([]);
  const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, value));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
 
    setData(users);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const doc = new jsPDF();

  const handlePrint = () => {
   
    const dataPlot = data.map((item) => {
      return [
        item.Name,
        item.Tournament,
        item.USN,
        item.Dates,
        item.Branch,
        item.Game,
        item.place,
        item.Result,
        console.log(data)
      ];
    });

    autoTable(doc, {
      
      head: [
        ["RVCE", "CONSOLIDATED", "ATTENDANCE", "FOR","" ,"","",data[0].Branch],
        [  
          "Name",
          "Tournament",
          "USN",
          "Dates",
          "Department",
          "Game",
          "Place",
          "Result",
        ],
      ],
      body: dataPlot,
    });
    doc.save("table.pdf");
  };

  const getTable = () => {
    return (
      <table className="table-auto overflow-x-scroll w-full block ">
        <thead>
          <tr className="">
            <th className="px-4 py-2 whitespace-nowrap">Name</th>
            <th className="px-4 py-2 whitespace-nowrap">Tournament</th>
            <th className="px-4 py-2 whitespace-nowrap">USN</th>
            <th className="px-4 py-2 whitespace-nowrap">Dates</th>
            <th className="px-4 py-2 whitespace-nowrap">Department</th>
            <th className="px-4 py-2 whitespace-nowrap">Game</th>
            <th className="px-4 py-2 whitespace-nowrap">Place</th>
            <th className="px-4 py-2 whitespace-nowrap">Result</th>
          </tr>
        </thead>

        {data.map((item) => (
          <tr id={item.USN}>
            <td className="px-4 py-2 whitespace-nowrap">{item.Name}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Tournament}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.USN}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Dates}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Branch}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Game}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.place}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Result}</td>
          </tr>
        ))}
      </table>
    );
  };
  return (
    <>
      <div className="flex space-x-2">
        <button
          onClick={handlePrint}
          className="float-right mr-10 my-1 bg-blue-600 text-white px-3 py-4 rounded-md"
        >
          Download PDF
        </button>
        <button className="float-right my-1 bg-blue-600 text-white px-3 py-4 rounded-md">
          <a href="mailto:kanupriya.a01@gmail.com">Send email</a>
        </button>
      </div>

      <div className="mb-32 bg-white">{getTable()}</div>
    </>
  );
};

export default DataTable;
