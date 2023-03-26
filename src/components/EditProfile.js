import React, {useEffect, useState } from 'react';

import db, { auth } from "../firebase";
import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";
import { collection, getDocs, query, where, doc, updateDoc, documentId } from "firebase/firestore";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";


import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { async } from "@firebase/util";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60vw",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    maxWidth: 700,
    p: 4,
  };

function EditProfile({docId}) {
    const [user, setUser] = useState(null);
    const [isAdmin, setAdmin] = useState(false);
    const userVal = useSelector(selectUser);

const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [mobilenumber, setMobileNumber] = useState('');
const [username, setUsername] = useState('');
const [usn, setUsn] = useState('');
const [dateofbirth, setdob] = useState('');
const [semester, setSemester] = useState('');
const [cemail, setCEmail] = useState('');



  useEffect(() => {
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
        console.log(data)
        setFirstName(user?.First_name)
        setLastName(user?.Last_name)
        setEmail(user?.Email)
        setMobileNumber(user?.Mobile_number)
        setUsername(user?.Username)
        setUsn(user?.USN)
        setdob(user?.date_of_birth)
        setSemester(user?.semester)
        setCEmail(user?.Counselor_email)

      };
    getUserData();

  }, []);

//   async function getUserIdByFirstName(firstName) {
//     const usersCollection = collection(db, "studentUsers");
//     const q = query(usersCollection, where("First_name", "==", firstName));
//     const querySnapshot = await getDocs(q);
//     if (querySnapshot.empty) {
//       console.log("n");
//       return null;
//     } else {
//       const userDoc = querySnapshot.docs[0];
//       console.log(userDoc.id);
//       return userDoc.id;
//     }
//   }
// getUserIdByFirstName(firstName);
  async function handleUpdate() {
    const userDocRef = doc(db, "studentUsers", docId);
    try {
      await updateDoc(userDocRef, { First_name: firstName, Last_name: lastName , Email: email, Mobile_number: mobilenumber, Username: username, USN: usn, date_of_birth: dateofbirth, semester: semester, Counselor_email: cemail});
      console.log("name updated successfully");
    } catch (error) {
      console.error("Error updating first name: ", error);
    }
  }

 
const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlemobileChange = (event) => {
    setMobileNumber(event.target.value);
  };
  const handleusernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handleusnChange = (event) => {
    setUsn(event.target.value);
  };
  const handledobChange = (event) => {
    setdob(event.target.value);
  };
  const handleSemChange = (event) => {
    setSemester(event.target.value);
  };
  const handleCEmailChange = (event) => {
    setCEmail(event.target.value);
  };

  return (

    <Box sx={{ flexGrow: 1 }}
    className="bg-logged-in bg-right min-h-[100vh] bg-cover">
        <AppBar position="static">
        <Toolbar sx={{ paddingY: "10px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, marginLeft: "15px" }}
          >
            Edit Profile
          </Typography>

         
        </Toolbar>
      </AppBar>
        <div className="bg-white bg-opacity-60 rounded-lg p-5 my-auto flex justify-center mt-10 w-fit mx-auto">
        <form className="flex flex-col justify-center space-y-5 w-[40vw]">
    <label>
  First Name:
  <input type="text" className="px-3 py-2 rounded-md" placeholder={firstName} defaultValue={firstName} onChange={handleFirstNameChange} />
  </label>
  <label>
  Last Name: 
  <input type="text" className="px-3 py-2 rounded-md" placeholder={lastName} defaultValue={lastName} onChange={handleLastNameChange} />
  </label>
  <label>
  Email: 
  <input type="email" className="px-3 py-2 rounded-md" placeholder={email} defaultValue={email} onChange={handleEmailChange} />
  </label>
  <label>
  Mobile Number: 
  <input type="tel" className="px-3 py-2 rounded-md" placeholder={mobilenumber} defaultValue={mobilenumber} onChange={handlemobileChange} />
  </label>
  <label>
  Username: 
  <input type="text" className="px-3 py-2 rounded-md" placeholder={username} defaultValue={username} onChange={handleusernameChange} />
  </label>
  
  <label>
  DOB: 
  <input type="date" className="px-3 py-2 rounded-md" placeholder={dateofbirth} defaultValue={dateofbirth} onChange={handledobChange} />
  </label>
  <label>
  Semester: 
  <input type="undefined" className="px-3 py-2 rounded-md" placeholder={semester} defaultValue={semester} onChange={handleSemChange} />
  </label>
  <label>
  Counselor Email: 
  <input type="email" className="px-3 py-2 rounded-md" placeholder={cemail} defaultValue={cemail} onChange={handleCEmailChange} />
  </label>
  
  <button onClick={handleUpdate}  className="px-3 py-2 rounded-md bg-blue-900 text-white" >Edit Profile</button>
  </form>
  
</div>

    </Box>
  );
}

export default EditProfile;
