import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Toaster } from "react-hot-toast";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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

const ViewFinalTeam = ({ open, handleClose }) => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
            Applicants for try-outs
          </Typography>
          <div className="mt-2">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {/* <Tab label="Basketball" value={1} />*/}
              <Tab label="Gymnastics" value={2} /> 
              <Tab label="Football" value={1} />
              <Tab label="Badminton" value={4} />
              {/*<Tab label="Boys Cricket" value={5} />*/}
              <Tab label="Hockey" value={6} />
            </Tabs>
            {value === 1 && <DataTable value={"Football"} />}
            {/* {value === 2 && <DataTable value={"Gymnastics"} />}
            {/*value === 3 && <DataTable value={"Football"} />}
            {value === 4 && <DataTable value={"Badminton"} />}
            {value === 5 && <DataTable value={"Cricket"} />}
            {value === 6 && <DataTable value={"Hockey"} />}*/}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewFinalTeam;
