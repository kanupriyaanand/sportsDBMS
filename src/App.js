import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import DataTable from "./components/DataTable";
import UpcomingEvents from "./components/UpcomingEvents";
import Achievements from "./components/Achievements";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
            isAdmin: false
          })
        );
        console.log(userAuth);
      } else {
        //Logged Out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Router>
          <Routes>
            <Route path="/" element={<LoginScreen />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path={"/"} exact element={<HomeScreen />} />
            <Route
              path={"/upcomingEvents"}
              exact
              element={<UpcomingEvents />}
            />
            <Route
              path={"/Achievements"}
              exact
              element={<Achievements />}
            />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
