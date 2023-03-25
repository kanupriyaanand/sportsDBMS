import { Modal, Tab, Tabs, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import AddDates from './AddDates';



const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "27vw",
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: 24,
    maxWidth: 700,
    p: 4,
  };

const TryoutDates = ({ open, handleClose }) => {
    const [value, setValue] = useState(1);
  const [isAdmin, setAdmin] = useState(false);
  const [open2, setOpen] = useState(false);
  const [docId, setDocId] = useState("");
  
  const [data, setData] = useState([]);
  const handleOpen2 = () => setOpen(true);
  const handleClose2 = () => setOpen(false);
  const user = useSelector(selectUser);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let users = [];
  const getUserData = async () => {
    const querySnapshot = await getDocs(collection(db, "TryoutDates"));
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });
    console.log(users);
    setData(users);
  };
  const getUserDataagain = async () => {
    const userData = collection(db, "studentUsers");
    const docSnap = await getDocs(
      query(userData, where("Email", "==", user.email))
    );
    docSnap.forEach((doc) => calling(doc.data(), doc.id));
  };
  const calling = (d, id) => {
    
    setDocId(id);
    d.isAdmin && setAdmin(true);
    console.log(d.isAdmin);
  };

  useEffect(() => {
    getUserData();
    getUserDataagain();
  }, []);
  return (
    <>
    <Toaster />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Dates for try-outs
          </Typography>
          
          {isAdmin &&<span
            onClick={handleOpen2}
            sx={{ flexGrow: 1, marginLeft: "15px" }}
            style={{ float: 'right' }}
            className="ml-10  cursor-pointer bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            Add Date
          </span>} 
          <div className="mt-2">
          <table className="table overflow-x-auto" id="data-table">
          <thead>
            <tr className="grid-cols-2">
              <th className="px-4 py-2 whitespace-nowrap">Game</th>
              <th className="px-2 py-2 whitespace-nowrap">Date</th>

            </tr>
          </thead>

          {data.map((item) => (
            <tr id={item.Name}>
              <td className="grid-cols-2 text-center">{item.gameName}</td>
              <td className="px-3 py-2  whitespace-nowrap">{item.Date}</td>
              
              <td className="px-4 py-2 w-[80px] whitespace-nowrap">
                {item.rank}
              </td>
            </tr>
          ))}
        </table>
           
          </div>
          <AddDates
        open={open2}
        handleClose={handleClose2}
        docId={docId}
        admin={isAdmin}
      />
        </Box>
      </Modal>
      </>
  );
};

export default TryoutDates
