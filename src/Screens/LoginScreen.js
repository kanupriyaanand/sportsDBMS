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
          <svg className="-translate-y-6" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="white" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m.25-6.73h-1.44v3.23H9V7.71h3.26c1.03 0 1.83.23 2.4.69c.56.47.84 1.1.84 1.96c0 .6-.13 1.1-.39 1.5c-.26.4-.65.72-1.18.95l1.9 3.59v.1h-1.94l-1.64-3.23m-1.44-1.46h1.46c.45 0 .8-.12 1.05-.35c.25-.23.37-.55.37-.96c0-.41-.11-.73-.35-.97c-.23-.24-.59-.35-1.08-.35h-1.45v2.63Z"/></svg>
          
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
