import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

const ApplicantsTable = ({value}) => {
    let users = [];
  const [data, setData] = useState([]);
  const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, value));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    console.log(users);
    setData(users);
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div className="mb-32 bg-white">
    <table className="table-auto overflow-x-scroll w-full block ">
      <thead>
        <tr className="">
          <th className="px-4 py-2 whitespace-nowrap">Name</th>
          <th className="px-4 py-2 whitespace-nowrap">Email</th>
          <th className="px-4 py-2 whitespace-nowrap">USN</th>
          <th className="px-4 py-2 whitespace-nowrap">Mobile number</th>
          <th className="px-4 py-2 whitespace-nowrap">Department</th>
          <th className="px-4 py-2 whitespace-nowrap">Game</th>
          <th className="px-4 py-2 whitespace-nowrap">Gender</th>
          
        </tr>
      </thead>

      {data.map((item) => (
        <tr id={item.USN}>
          <td className="px-4 py-2 whitespace-nowrap">{item.First_name}{" "}{item.Last_name}</td>
          <td className="px-4 py-2 whitespace-nowrap">{item.Email}</td>
          <td className="px-4 py-2 whitespace-nowrap">{item.USN}</td>
          <td className="px-4 py-2 whitespace-nowrap">{item.Mobile_number}</td>
          <td className="px-4 py-2 whitespace-nowrap">{item.department}</td>
          <td className="px-4 py-2 whitespace-nowrap">{item.dataForm.gameName}</td>
          <td className="px-4 py-2 whitespace-nowrap">{item.gender}</td>
          
        </tr>
      ))}
    </table>
  </div>
  )
}

export default ApplicantsTable
