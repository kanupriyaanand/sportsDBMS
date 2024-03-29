import React, { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import db, { auth } from "../firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import AddAchievement from "./AddAchievement";

const Achievements = () => {
  const [open2, setOpen] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const [docId, setDocId] = useState("");
  const userVal = useSelector(selectUser);
  const handleOpen2 = () => setOpen(true);
  const handleClose2 = () => setOpen(false);
  const user = useSelector(selectUser);


  const getUserData1 = async () => {
    const userData = collection(db, "studentUsers");
    
    
    const docSnap = await getDocs(
      query(userData, where("Email", "==", userVal.email))
    );

    docSnap.forEach((doc) => calling(doc.data()));
  };


  const calling = (d, id) => {
    
    setDocId(id);
    d.isAdmin && setAdmin(true);
 
  };

  let users = [];
  const [data, setData] = useState([]);
  const getUserData = async () => {
    const querySnapshot = await getDocs(query(collection(db, "Achievements"), orderBy("rank", "asc")));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    setData(users);
  };

  const getUserDataagain = async () => {
    const userData = collection(db, "studentUsers");
    const docSnap = await getDocs(
      query(userData, where("Email", "==", user.email))
    );

    docSnap.forEach((doc1) => calling(doc1.data(), doc1.id));
  };

  useEffect(() => {
    getUserData1();
    getUserData();
  }, []);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {

      })
      .catch((error) => {
  
      });
  };

  const doc = new jsPDF();

  const handlePrint = () => {

const   dataPlot = 
      data.map((item) => {
        return   [item.Name,
        item.Game,
        item.Department,
        item.Semester,
        item.Venue,
        item.rank]
      })
   
     autoTable(doc, {
      head: [['Name', "Game", "Department", "Semester", "Venue", "Rank"]],
      body: dataPlot,
    })
    doc.save('table.pdf');
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
            Events
          </Link>
          <Link className="underline mr-8" to="/Achievements">
            Achievements
          </Link>
          <Link className="underline mr-8" to={"/myProfile"}>
            My Profile
          </Link>
          {isAdmin && (
            <Link className="underline mr-8" to={"/viewParticipation"}>
              Participation
            </Link>)}
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className="overflow-x-auto max-w-fit rounded-md  bg-black opacity-75 mt-16 px-16 mx-16 text-white whitespace-nowrap">
        <div className="flex w-[45vw] justify-between mt-3">
          <span>Achievements 5th sem- 2022</span>
          {isAdmin &&<span
            onClick={handleOpen2}
            className="ml-10 cursor-pointer bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            Add Achievement
          </span>}
          <span
            onClick={handlePrint}
            className="ml-10 cursor-pointer bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            Click here to download the pdf
          </span>
        </div>
        <table className="table overflow-x-auto" id="data-table">
          <thead>
            <tr className="grid-cols-6">
              <th className="px-4 py-2 whitespace-nowrap">Name</th>
              <th className="px-2 py-2 whitespace-nowrap">Game</th>
              <th className="px-4 py-2 whitespace-nowrap">Department</th>
              <th className="px-4 py-2 whitespace-nowrap">Semester</th>
              <th className="px-4 py-2 whitespace-nowrap">Venue</th>
              <th className="px-4 py-2 whitespace-nowrap">Rank</th>
            </tr>
          </thead>

          {data.map((item) => (
            <tr id={item.Name}>
              <td className="grid-cols-6 text-center">{item.Name}</td>
              <td className="px-3 py-2  whitespace-nowrap">{item.Game}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.Department}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.Semester}</td>
              <td className="px-4 py-2 whitespace-nowrap">{item.Venue}</td>
              <td className="px-4 py-2 w-[80px] whitespace-nowrap">
                {item.rank}
              </td>
            </tr>
          ))}
        </table>
      </div>
      <AddAchievement
        data={data}
        open={open2}
        handleClose={handleClose2}
        docId={docId}
        admin={isAdmin}
      />
    </Box>
  );
};

export default Achievements;
