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

function EditProfile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
const [docId, setDocId] = useState("");



  useEffect(() => {
    const getUserData = async () => {
        const userData = collection(db, "studentUsers");
        const docSnap = await getDocs(
          query(userData, where("Email", "==", userVal.email))
        );
    
        docSnap.forEach((doc) => calling(doc.data(),doc.id));
      };
    
      const calling = (data,id) => {
        setUser(data);
        setDocId(id);
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
  /*async function handleUpdate() {
    const userDocRef = doc(db, "studentUsers", docId);
    try {
      await updateDoc(userDocRef, { First_name: firstName, Last_name: lastName , Email: email, Mobile_number: mobilenumber, Username: username, USN: usn, date_of_birth: dateofbirth, semester: semester, Counselor_email: cemail});
      console.log("name updated successfully");
    } catch (error) {
      console.error("Error updating first name: ", error);
    }
  }*/

  async function handleUpdate() {
    //console.log(dataForm);
    const CollectionRef = doc(db, "studentUsers", docId);
    try {
      
    await updateDoc(CollectionRef, {First_name: firstName,Last_name: lastName,semester: semester,Mobile_number: mobilenumber, Username: username,USN: usn,date_of_birth: dateofbirth});
    console.log("name updated"); 


      /*const userData = collection(db, "studentUsers");
      const docSnap = await updateDoc(userData, { First_name: firstName});
      docSnap.forEach((doc) => calling(doc.data()));
      const calling = (data) => {
        setUser(data);
        data.isAdmin && setAdmin(true);
        console.log(data)
        
      };*/
      //reset();

      //const collectionRef = collection(db, dataForm.gameName);

      /*const checkForDuplicate = async () => {
        const docSnap = await getDocs(
          query(collectionRef, where("Email", "==", user.email))
        );
        if (docSnap.empty) {
          await addDoc(collectionRef, { ...data, dataForm });
          toast.success("Registered Successfully");
        } else {
          toast.error("User already registered");
        }
      };*/
      

      
      //checkForDuplicate();
      //handleClose();
    } catch (e) {
      console.log(e);
    }
  };


 
const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleSemChange = (event) => {
    setSemester(event.target.value);
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
  /*const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  
  
  
  
  
  const handleCEmailChange = (event) => {
    setCEmail(event.target.value);
  };*/

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
        <form className="flex flex-col justify-center space-y-5 w-[40vw]"
        >
    <label>
  First Name:
  <input type="text" className="px-3 py-2 rounded-md" placeholder={firstName} {...register("First_name", { required: true, maxLength: 80 })} defaultValue={firstName} onChange={handleFirstNameChange} />
  </label>
  
  <label>
  Last Name: 
  <input type="text" className="px-3 py-2 rounded-md" placeholder={lastName} {...register("Last_name", { required: true, maxLength: 100 })} defaultValue={lastName} onChange={handleLastNameChange} />
  </label>

  <label>
  Semester: 
  <input type="number" className="px-3 py-2 rounded-md" placeholder={semester} min={1}
          max={8}
          
          {...register("semester", {
            required: true,
            maxLength: { value: 1, message: "enter a number between 1 and 8" },
            min: {
              value: 1,
              message: "Enter a value greater than or equal to 1",
            },
            max: {
              value: 8,
              message: "Enter a value less than or equal to 8",
            },
          })}defaultValue={semester} onChange={handleSemChange} />
          <div className="text-red-700">{errors.semester?.message}</div>
  </label>

  <label>
  Mobile Number: 
  <input type="tel" className="px-3 py-2 rounded-md" placeholder={mobilenumber} {...register("Mobile_number", {
            required: true,

            minLength: {
              value: 10,
              message: "enter a 10 digit phone number",
            },
            maxLength: {
              value: 10,
              message: "enter a 10 digit phone number",
            },
            pattern: {
              value: /(?:\d)(?:\d)(?:\d)(?:\d)(?:\d)(?:\d)(?:\d)(?:\d)(?:\d)(?:\d)$/,
              message: "only numbers to be entered",
            },
          })} defaultValue={mobilenumber} onChange={handlemobileChange} />
          <div className="text-red-700">{errors.Mobile_number?.message}</div>
  </label>

  <label>
  Username: 
  <input type="text" className="px-3 py-2 rounded-md" placeholder={username} {...register("Username", { required: true })} defaultValue={username} onChange={handleusernameChange} />
  </label>


  <label>
  USN: 
  <input type="text" className="px-3 py-2 rounded-md" placeholder={usn} {...register("USN", {
            required: true,
            pattern: {
              value: /(?:1RV)(?:\d)(?:\d)(?:[A-Z])(?:[A-Z])(?:\d)(?:\d)(?:\d)$/,
              message: "Please enter a valid USN",
            },
            maxLength: { value: 10, message: "enter valid USN" },
          })}  defaultValue={usn} onChange={handleusnChange} />
          <div className="text-red-700">{errors.USN?.message}</div>
  </label>

  <label>
  DOB: 
  <input type="date" className="px-3 py-2 rounded-md" placeholder={dateofbirth} min="1990-01-01"
          max="2006-12-31" {...register("date_of_birth", {
            required: true,
          })} defaultValue={dateofbirth} onChange={handledobChange} />
  </label>

  
  <button onClick={handleUpdate}  className="px-3 py-2 rounded-md bg-blue-900 text-white" >Submit details</button>
  </form>
  
</div>
     
    
    </Box>
  );
}

export default EditProfile;
