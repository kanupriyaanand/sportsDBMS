import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast, Toaster } from "react-hot-toast";
import db from "../firebase";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DataTable from "./DataTable";
import { collection, getDoc, doc } from "firebase/firestore";

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

              <Tab label="Boys Basketball" value={2} />
              <Tab label="Girls Football" value={3} />
              <Tab label="Boys Football" value={4} />
              <Tab label="Boys Cricket" value={5} />
              <Tab label="Boys Hockey" value={6} />
              <Tab label="Item Seven" value={7} />
            </Tabs>
            {value === 1 && <DataTable value={"basketball"} gender="F" />}
            {value === 2 && <DataTable />}
            {value === 3 && <DataTable />}
            {value === 4 && <DataTable />}
            {value === 5 && <DataTable />}
            {value === 6 && <DataTable />}
            {value === 7 && <DataTable />}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ViewFinalTeam;
