import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db, { auth } from "../firebase";

const DataTable = ({ value }) => {
  const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "Branch"));
    querySnapshot.forEach((doc) => console.log(doc.id, " => ", doc.data()));
  };

  getUserData();
  return <div>aaya</div>;
};

export default DataTable;
