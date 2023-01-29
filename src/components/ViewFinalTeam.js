import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "react-hot-toast";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import db from "../firebase";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DataTable from "./DataTable";


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


const ViewFinalTeam = ({ open, handleClose, data, docId }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(data);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (dataForm) => {
    console.log(dataForm);
    try {
      const CollectionRef = doc(db, "studentUsers", docId);
      await updateDoc(CollectionRef, dataForm);
      reset();
      const collectionRef = collection(db, dataForm.gameName);
      await addDoc(collectionRef, { ...data, dataForm });
      toast.success("Registered Successfully");
      handleClose();
    } catch (e) {
      console.log(e);
    }
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

        <Box sx={style}>
        
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Final Teams
          </Typography>
          <div className="mt-2">
          <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
        
        <Tab label="Girls Basketball" value={1} />

        <Tab label="Boys Basketball" value= {2} />
        <Tab label="Girls Football" value={3} />
        <Tab label="Boys Football" value={4} />
        <Tab label="Boys Cricket" value={5} />
        <Tab label="Boys Hockey" value= {6}/>
        <Tab label="Item Seven" value={7}/>
        
      </Tabs>
      {value===0 && <div> choose a sport </div>}
      {value===1 && <DataTable/> }
      {value===2 && <div> working2 </div>}
      {value===3 && <div> working3 </div>}
      {value===4 && <div> working1 </div>}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewFinalTeam;
