import React, { useState } from "react";
import SignUpScreen from "./SignUpScreen";
import SignInScreen from "./SignInScreen";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function LoginScreen() {
  const [signUp, setSignUp] = useState(false);
  const handleSignUp = () => setSignUp(true);
  const handleSignIn = () => setSignUp(false);
  return (
    <Box sx={{ flexGrow: 1 }} className="bg-login-page min-h-[100vh] bg-cover">
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
          {!signUp ? (
            <Button color="inherit" onClick={handleSignUp}>
              Sign Up
            </Button>
          ) : (
            <Button color="inherit" onClick={handleSignIn}>
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div className="flex justify-center py-24 rounded-lg ">
        {signUp ? (
          <SignInScreen setSignIn={handleSignIn} />
        ) : (
          <SignUpScreen setSignUp={handleSignUp} />
        )}
      </div>
    </Box>
  );
}

export default LoginScreen;
