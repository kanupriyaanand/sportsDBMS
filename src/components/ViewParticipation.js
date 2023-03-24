import React, { useState } from "react";
import { auth } from "../firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DataTable from "./DataTable";

const ViewParticipation = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <Link className="underline mr-8" to="/upcomingEvents">
            Participants
          </Link>
          <Button color="inherit" onClick={handleLogout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <div className="mt-32 overflow-x-auto mx-16 shadow-4xl rounded-lg">
        <Tabs
          className="bg-white"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs"
        >
          <Tab label="M.Tech" value={1} />
          <Tab label="ME" value={2} />
          <Tab label="MCA" value={3} />
          <Tab label="IM" value={4} />
          <Tab label="IS" value={5} />
          <Tab label="ET" value={6} />
          <Tab label="EI" value={7} />
          <Tab label="EE" value={8} />
          <Tab label="EC" value={9} />
          <Tab label="CV" value={10} />
          <Tab label="CS" value={11} />
          <Tab label="CH" value={12} />
          <Tab label="BT" value={13} />
          <Tab label="AS" value={14} />
          <Tab label="AIML" value={15} />
        </Tabs>
        {value === 1 && <DataTable value={"M.Tech"} />}
        {value === 2 && <DataTable value={"ME"} />}
        {value === 3 && <DataTable value={"MCA"} />}
        {value === 4 && <DataTable value={"IM"} />}
        {value === 5 && <DataTable value={"IS"} />}
        {value === 6 && <DataTable value={"ET"} />}
        {value === 7 && <DataTable value={"EI"} />}
        {value === 8 && <DataTable value={"EE"} />}
        {value === 9 && <DataTable value={"EC"} />}
        {value === 10 && <DataTable value={"CV"} />}
        {value === 11 && <DataTable value={"CS"} />}
        {value === 12 && <DataTable value={"CH"} />}
        {value === 13 && <DataTable value={"BT"} />}
        {value === 14 && <DataTable value={"AS"} />}
        {value === 15 && <DataTable value={"AIML"} />}
      </div>
    </Box>
  );
};

export default ViewParticipation;
