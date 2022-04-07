import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import './App.css';
import Header from '././components/header/Header';
import Homepage from './pages/homepage/Homepage';
import Stockpage from './pages/specificticker/Stockpage';
import { makeStyles } from "@material-ui/core";
import { FooterContainer } from './containers/footer';
import Favorite from "./pages/favorite/Favorite";
import Reminder from "./pages/reminder/Reminder";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import React, {useState, useEffect} from 'react';
import axios from "axios";
const useStyles = makeStyles(()=>({
  App:{
    backgroundColor: "black",
    color: "white",
    minHeight: "100vh",

  }
}));

function App() {

  const classes = useStyles()
  const [user,setUser] = useState(null);

  useEffect(() => {
    const getUser = () => {
      axios.get('https://trading-vision.herokuapp.com/auth/success')
        .then((response) => {
          if (response.status === 200) return response;
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <div className={classes.App} >
      <Router >
          <Header user={user}/>
          <Routes>
            <Route exact path="/" element={<Homepage user={user}/>} />
            <Route exact path="/stocks/:ticker" element={<Stockpage user={user}/>} />
            <Route path="/favorite" element={<Favorite user={user}/>}/>
            <Route path="/reminder" element={<Reminder user={user}/>}/>
            <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>} />
            <Route path="/profile" element={<Profile user={user}/>}/>
          </Routes>
          <FooterContainer />
      </Router>
    </div>
  );
}

export default App;
