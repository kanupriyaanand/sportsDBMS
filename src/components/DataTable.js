import React from 'react'
import { collection, getDocs, query, where } from "firebase/firestore";
import { useState} from 'react';
import db, { auth } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";



const DataTable = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [docId, setDocId] = useState("");
  const user = useSelector(selectUser);

  const calling = (data, id) => {
    setData(data);
    setDocId(id);
  };
   

 const getUserData = async () => {
    const userData = collection(db, "Branch/USN/Dates");
    const docSnap = await getDocs( 
      query(userData, where("Sport", "==", user.Game))
    );

    docSnap.forEach((doc) => calling(doc.data(), doc.id));
  };
  return (
    <div>
      
    </div>
  )
}

export default DataTable
