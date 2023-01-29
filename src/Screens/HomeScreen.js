import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import db, { auth } from "../firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import RegisterForTryouts from "../components/RegisterForTryouts";
import ViewFinalTeam from "../components/ViewFinalTeam";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { collection, getDocs, query, where } from "firebase/firestore";

const HomeScreen = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [docId, setDocId] = useState("");

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector(selectUser);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);

  const getUserData = async () => {
    const userData = collection(db, "studentUsers");
    const docSnap = await getDocs(
      query(userData, where("Email", "==", user.email))
    );

    docSnap.forEach((doc) => calling(doc.data(), doc.id));
  };

  useEffect(() => {
    getUserData();
  }, []);

  const calling = (data, id) => {
    setData(data);
    setDocId(id);
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

          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className="bg-black bg-opacity-60 text-white  mt-40 space-y-5 mx-auto w-fit p-5 rounded-md">
        <button
          onClick={handleOpen}
          className="bg-white text-black w-full p-3 rounded-xl text-lg font-semibold  hover:bg-gray-300"
        >
          Register For Try-outs
        </button>
        <button
          className="bg-white text-black w-full p-3 rounded-xl text-lg font-semibold hover:bg-gray-300"
          onClick={handleOpen1}
        >
          View Final Team
        </button>
      </div>
      <RegisterForTryouts
        data={data}
        open={open}
        handleClose={handleClose}
        docId={docId}
      />
      <ViewFinalTeam
        data={data}
        open={open1}
        handleClose={handleClose1}
        docId={docId}
      />
    </Box>
  );
};

export default HomeScreen;
