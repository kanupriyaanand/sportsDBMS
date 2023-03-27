import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import db, { auth } from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import EditProfile from './EditProfile';


const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setAdmin] = useState(false);
  const userVal = useSelector(selectUser);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();

  const handleEditClick = () => {
    // setEditMode(true);
    console.log('Clicked')
    navigate('/edit-profile');
  }

  const handleSave = (newDetails) => {
    // Update user details in Firebase database
    // ...

    setEditMode(false);
    navigate('/myProfile');
  }
  const handleCancel = () => {
    setEditMode(false);
    navigate('/myProfile');
  }

  const getUserData = async () => {
    const userData = collection(db, "studentUsers");
    const docSnap = await getDocs(
      query(userData, where("Email", "==", userVal.email))
    );

    docSnap.forEach((doc) => calling(doc.data()));
  };

  const calling = (data) => {
    setUser(data);
    data.isAdmin && setAdmin(true);
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

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

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
            </Link>
          )}

          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className="bg-white bg-opacity-60 rounded-lg p-5 my-auto flex justify-center mt-10 w-fit mx-auto">
        <form className="flex flex-col justify-center space-y-5 w-[40vw]">
          <input
            type="text"
            className="px-3 py-2 rounded-md"
            placeholder="First name"
            defaultValue={user?.First_name}
            disabled
          />
          <input
            type="text"
            className="px-3 py-2 rounded-md"
            placeholder="Last name"
            defaultValue={user?.Last_name}
            disabled
          />
          <input
            type="text"
            className="px-3 py-2 rounded-md"
            placeholder="Email"
            defaultValue={user?.Email}
            disabled
          />

          <input
            type="tel"
            className="px-3 py-2 rounded-md"
            placeholder="Mobile number"
            defaultValue={user?.Mobile_number}
            disabled
          />

          <input
            type="text"
            className="px-3 py-2 rounded-md"
            placeholder="User?name"
            defaultValue={user?.Username}
            disabled
          />

          <select className="px-3 py-2 rounded-md" required disabled>
            <option value={null} selected disabled hidden>
              {user?.gender}
            </option>
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="others">Others</option>
          </select>
          <input
            defaultValue={user?.semester}
            disabled
            className="px-3 py-2 rounded-md"
            type="undefined"
            placeholder="Semester"
          />

          <input
            defaultValue={user?.date_of_birth}
            disabled
            className="px-3 py-2 rounded-md"
            type="date"
            placeholder="Date of Birth"
          />
          <input
            defaultValue={user?.department}
            disabled
            className="px-3 py-2 rounded-md"
            type="text"
            placeholder="Department"
          />
          <input
            defaultValue={user?.USN}
            disabled
            className="px-3 py-2 rounded-md"
            type="text"
            placeholder="USN"
          />
          <input
            defaultValue={user?.Counselor_email}
            disabled
            className="px-3 py-2 rounded-md"
            type="email"
            placeholder="Counselor email"
          />
          <button onClick={handleEditClick} className="px-3 py-2 rounded-md bg-blue-900 text-white">Edit Profile</button>
        </form>
        
      </div>
    </Box>
  );
};

export default MyProfile;
