import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebase";

const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <div onClick={handleLogout}>Logout</div>;
};

export default HomeScreen;
