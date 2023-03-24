import React, { useEffect, useState } from "react";
import { collection, deleteDoc, getDocs, query, where, doc } from "firebase/firestore";
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
import AddEvent from "./AddEvent";
import toast, { Toaster } from "react-hot-toast";

const UpcomingEvents = () => {
  let users = [];
  const [open2, setOpen] = useState(false);
  const [docId, setDocId] = useState("");
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [isAdmin, setAdmin] = useState(false);

  const handleOpen2 = () => setOpen(true);
  const handleClose2 = () => setOpen(false);
  const user = useSelector(selectUser);

  const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "Upcoming_Tournaments"));
    querySnapshot.forEach((doc1) => {
      users.push(doc1.data());
    });
    console.log(users);
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
    getUserData();
    getUserDataagain();
  }, []);

  const calling = (d, id) => {
    setData1(d);
    setDocId(id);
    d.isAdmin && setAdmin(true);
    console.log(d.isAdmin);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const doc2 = new jsPDF();

  const handlePrint = () => {
    console.log("this works");
    const dataPlot = data.map((item) => {
      return [
        item.Name,
        item.Venue,
        item.Date,
      ];
    });

    autoTable(doc2, {
      head: [["Competition Name", "Venue", "Date"]],
      body: dataPlot,
    });
    doc2.save("events.pdf");
  };
  return (
    
    <Box
      sx={{ flexGrow: 1 }}
      className="bg-logged-in bg-right min-h-[100vh] bg-cover"
    >
      <Toaster />
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
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <table className="table-auto bg-black flex flex-col opacity-75 mt-52 px-16 mx-16 text-white">
        <div className="flex w-[60vw] justify-between mt-3">
          <span>Achievements 5th sem- 2022</span>
          {isAdmin &&<span
            onClick={handleOpen2}
            className="ml-10 cursor-pointer bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            Add event
          </span>}
          <span
            onClick={handlePrint}
            className="ml-10 cursor-pointer bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            Click here to download the pdf
          </span>
        </div>

        <thead>
          <tr className="grid grid-cols-4">
            <th className="px-4 py-2 whitespace-nowrap">Date</th>
            <th className="px-4 py-2 whitespace-nowrap">Event Name</th>
            <th className="px-4 py-2 whitespace-nowrap">Venue</th>
            
            {isAdmin &&<th
            
           
          >
            delete event
          </th>}
          </tr>
        </thead>

        {data.map((item) => (
          <tr id={item.Date} className="grid grid-cols-4 text-center">
            <td className="px-4 py-2 whitespace-nowrap">{item.Date}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Name}</td>
            <td className="px-4 py-2 whitespace-nowrap">{item.Venue}</td>
           { isAdmin && <td><button onClick={async ()=>{await deleteDoc(doc(db, "Upcoming_Tournaments", item.Date))
          toast.success("Deleted successfully, refresh page")}} ><image><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9M7 6h10v13H7V6m2 2v9h2V8H9m4 0v9h2V8h-2Z"/></svg></image></button></td>}
          </tr>
        ))}
      </table>
      <AddEvent
        data={data}
        open={open2}
        handleClose={handleClose2}
        docId={docId}
        admin={isAdmin}
      />
    </Box>
    
  );
};

export default UpcomingEvents;
