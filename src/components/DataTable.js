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
      ];
    });
    /*var imgData = 'data:image/jpeg;base64,'+ Base64.encode ('your-image.jpeg');
    doc.addImage (imgData, 'JPEG', 15, 40, 180, 160);*/

    const stripWidth = doc.internal.pageSize.getWidth();
    const stripHeight = 30;

    //Set the fill color to blue
    doc.setFillColor('#0074D9');

// Draw a rectangle to create the blue strip
    doc.rect(0, 0, stripWidth, stripHeight, 'F');

// Load the image you want to add to the PDF document
   //const imgData = 'C:\Users\ANUSHKA JINDAL\Desktop\RVCE\EL\DBD EL\sportsDBMS\src\assets\R.V._College_of_Engineering_logo.png';

// Add the image to the PDF document at the top of the blue strip
   //doc.addImage(imgData,'PNG', 10, 10, 20, 20,null,20,0);
  

   doc.setFontSize(16);
   doc.setTextColor('#FFFFFF');
   doc.text(stripWidth / 2, stripHeight / 2, "RV College of Engineering", 'center', 'middle');

   // doc.text("Participation for ",10,10,{fontsize: 14,fontType: 'bold'}, 'center', 'middle');
    doc.text(data[0].Branch,10,10,{fontsize: 14,fontType: 'bold',align: "center"},);
    autoTable(doc, {
      head: [
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
      margin: {top: 40},
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