import React, { useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import UpcomingEvents from "./components/UpcomingEvents";
import Achievements from "./components/Achievements";
import NotFound from "./components/NotFound";
import MyProfile from "./components/MyProfile";
import ViewParticipation from "./components/ViewParticipation";
import Chatbot from "./components/Chatbot";
import EditProfile from "./components/EditProfile";


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
            isAdmin: false,
          })
        );
    
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
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<LoginScreen />} />
          </Routes>
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path={"/"} exact element={<HomeScreen />} />
            <Route path="/upcomingEvents" exact element={<UpcomingEvents />} />
            <Route path="/Achievements" exact element={<Achievements />} />
            <Route path="/myProfile" exact element={<MyProfile />} />
            <Route path="/edit-profile" exact element={<EditProfile />} />
            <Route
              path="/viewParticipation"
              exact
              element={<ViewParticipation />}
            />
            <Route element={<NotFound />} />
          </Routes>
        </Router>
      )}
      <Chatbot/>
    </div>
    
  );
}

export default App;
// add filter to graph to applicants from different dates