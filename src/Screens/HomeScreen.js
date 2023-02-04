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
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [docId, setDocId] = useState("");
  const [isAdmin, setAdmin] = useState(false);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calling = (data, id) => {
    setData(data);
    setDocId(id);
    data.isAdmin && setAdmin(true);
    console.log(data.isAdmin);
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
          <svg
            className="-translate-y-6"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.25-6.73h-1.44v3.23H9V7.71h3.26c1.03 0 1.83.23 2.4.69c.56.47.84 1.1.84 1.96c0 .6-.13 1.1-.39 1.5c-.26.4-.65.72-1.18.95l1.9 3.59v.1h-1.94l-1.64-3.23m-1.44-1.46h1.46c.45 0 .8-.12 1.05-.35c.25-.23.37-.55.37-.96c0-.41-.11-.73-.35-.97c-.23-.24-.59-.35-1.08-.35h-1.45v2.63Z"
            />
          </svg>
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
          <Link className="underline mr-8" to="/Achievements">
            Achievements
          </Link>
          <Link className="underline mr-8" to={"/myProfile"}>
            My Profile
          </Link>
          {isAdmin && (
            <Link className="underline mr-8" to={"/viewParticipation"}>
              Participation
            </Link>
          )}

          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className="bg-black bg-opacity-60 text-white  mt-40 space-y-5 mx-auto w-fit p-5 rounded-md">
        {!isAdmin && (
          <button
            onClick={handleOpen}
            className="bg-white text-black w-full p-3 rounded-xl text-lg font-semibold  hover:bg-gray-300"
          >
            Register For Try-outs
          </button>
        )}
        <button
          className="bg-white text-black w-full p-3 rounded-xl text-lg font-semibold hover:bg-gray-300"
          onClick={handleOpen1}
        >
          View Applicants
        </button>
      </div>
      <RegisterForTryouts
        data={data}
        open={open}
        handleClose={handleClose}
        docId={docId}
        admin={isAdmin}
      />
      <ViewFinalTeam
        data={data}
        open={open1}
        handleClose={handleClose1}
        docId={docId}
        admin={isAdmin}
      />
    </Box>
  );
};

export default HomeScreen;
