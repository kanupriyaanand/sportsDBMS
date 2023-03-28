import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Toaster } from "react-hot-toast";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ApplicantsTable from "./ApplicantsTable";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase";
import AddEvent from "./AddEvent";
import AddSport from "./AddSport";

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

const ViewFinalTeam = ({ open, handleClose }) => {
  const [value, setValue] = useState("");
  const [isAdmin, setAdmin] = useState(false);
  const [open2, setOpen] = useState(false);
  const [docId, setDocId] = useState("");
  const [data1, setData1] = useState([]);
  const [sportsData, setSportNames]=useState([]);
  const handleOpen2 = () => setOpen(true);
  const handleClose2 = () => setOpen(false);
  const user = useSelector(selectUser);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue)
  };

  const getUserDataagain = async () => {
    const userData = collection(db, "studentUsers");
    const docSnap = await getDocs(
      query(userData, where("Email", "==", user.email))
    );
    docSnap.forEach((doc) => calling(doc.data(), doc.id));
  };

  const sportsNames= async() => {
    const CollectionR = collection(db, `sports`);
    const col = await getDocs(CollectionR);
    col.forEach((col) => {
     setSportNames(col.data().Game)
    })
  };
  useEffect(() => {
    sportsNames();
    getUserDataagain();
  }, []);

  const calling = (d, id) => {
    setData1(d);
    setDocId(id);
    d.isAdmin && setAdmin(true);
    console.log(d.isAdmin);
  };

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
            Applicants for try-outs
          </Typography>
          
          {isAdmin &&<span
            onClick={handleOpen2}
            sx={{ flexGrow: 1, marginLeft: "15px" }}
            style={{ float: 'right' }}
            className="ml-10  cursor-pointer bg-blue-700 text-white px-3 py-2 rounded-lg"
          >
            Add new sport
          </span>} 
          <div className="mt-2">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
               {
                sportsData?.map((e)=><Tab label={e} value={e}/>)
              }
            {/* tabs.map((e)=><Tab label={e.value} value={e.value}/>) */}
            </Tabs>
           
            {value && <ApplicantsTable value={value}/>}
                      
          </div>
          <AddSport
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

export default ViewFinalTeam;
