import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db, { auth } from "../firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";

const UpcomingEvents = () => {
  let users = [];
  const [data, setData] = useState([]);
  const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "Upcoming_Tournaments"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    console.log(users);
    setData(users);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{ flexGrow: 1 }}
      className="bg-logged-in bg-right min-h-[100vh] bg-cover"
    >
      <AppBar position="static">
        <Toolbar sx={{ paddingY: "10px" }}>
          <img
            className="h-16"
            src="https://rvce.edu.in/sites/default/files/logo_0.png"
            alt=""
          />

          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "15px" }}
          >
            RV College of Engineering
          </Typography>
          <Link className="underline mr-8" to="/upcomingEvents">
            Upcoming Events
          </Link>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <table className="table-auto bg-black flex flex-col opacity-75 mt-52 px-16 mx-16 text-white">
        <thead>
          <tr className="grid grid-cols-3">
            <th className="px-4 py-2 whitespace-nowrap">Date</th>
            <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
            <th className="px-4 py-2 whitespace-nowrap">Venue</th>
          </tr>
        </thead>

        {data.map((item) => (
          <tr id={item.Date} className="grid grid-cols-3 text-center">
            <td className="px-4 py-2 whitespace-nowrap">{item.Date}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Name}</td>
            <td className="px-4 py-2 whitespace-nowrap">
             {item.Venue}
            </td>
          </tr>
        ))}
      </table>
    </Box>
  );
};

export default UpcomingEvents;
