import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db, { auth } from "../firebase";

const DataTable = () => {
  let users = [];
  const [data, setData] = useState([]);
  const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "studentUsers"));
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
    <div>
      <table className="table-auto overflow-x-scroll w-full block">
        <thead>
          <tr className="">
            <th className="px-4 py-2 whitespace-nowrap">Councellor Email</th>
            <th className="px-4 py-2 whitespace-nowrap">Email</th>
            <th className="px-4 py-2 whitespace-nowrap">Name</th>
            <th className="px-4 py-2 whitespace-nowrap">Mobile Number</th>
            <th className="px-4 py-2 whitespace-nowrap">USN</th>
            <th className="px-4 py-2 whitespace-nowrap">Date of Birth</th>
            <th className="px-4 py-2 whitespace-nowrap">Department</th>
            <th className="px-4 py-2 whitespace-nowrap">Game</th>
          </tr>
        </thead>

        {data.map((item) => (
          <tr id={item.USN}>
            <td className="px-4 py-2 whitespace-nowrap">
              {item.Counselor_email}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Email}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              {item.First_name} {item.Last_name}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">
              {item.Mobile_number}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{item.USN}</td>
            <td className="px-4 py-2 whitespace-nowrap">
              {item.date_of_birth}
            </td>
            <td className="px-4 py-2 whitespace-nowrap">{item.department}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.gameName}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default DataTable;
