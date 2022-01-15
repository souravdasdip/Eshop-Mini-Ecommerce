import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import OurProducts from "./OurProducts";
import Login from "./Login";
import Admin from "./Admin";
import Orders from "./Orders";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { AnimatePresence } from "framer-motion";

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    // Set the listener onAuthStateChanged() if the user is in or out
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Set authUser into data layer if user logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        //Set null to data layer if the user logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });

    return () => {
      //Any cleanup operation go in here
      unsubscribe();
    };
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <Route path="/login">
              <Header />
              <Login />
            </Route>
            <Route path="/orders">
              <Header />
              <Orders />
            </Route>
            <Route path="/ourproducts">
              <Header />
              <OurProducts />
            </Route>
            {/* ADMIN */}
            <Route path="/admin">
              <Header />
              <Admin userid={user?.uid} />
            </Route>
            {/* Default Page */}
            <Route path="/">
              <Header />
              <Home />
              <OurProducts />
            </Route>
          </Switch>
        </div>
      </Router>
    </AnimatePresence>
  );
}

export default App;
