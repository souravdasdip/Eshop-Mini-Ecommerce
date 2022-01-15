import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import { auth } from './firebase';
import logo from './images/icon.svg';

function Header() {
  const [{ user, basket,admin }] = useStateValue();
  // If User login, onClick on Header Name => its Sign Out
  const login = () => {
    if(user){
      // console.log(user.uid);
      auth.signOut();
    }
  }

  return (
    
    <nav className="header__area">
      {/* Logo */}
      <Link to="/">
        <img
          className="header__logo"
          src={logo}
          alt="LOGO"
        />
      </Link>
      
      <div className="links">
      {/* 3 links */}
      {/* <div className="links"> */}
      <Link to={!user && "/login"} className="header__link">
        <div onClick={login} className="header__option">
          <span style={{color:"rgb(85, 26, 139)"}}>Hello <strong style={{color:"#333"}}>{user?.email}</strong> </span>
        <span style={{color:"rgb(85, 26, 139)"}} onClick={login}>{user ? "Sign Out" : "Sign In"}</span>
        </div>
      </Link>
      <Link to="/ourproducts" className="header__link">
        <div className="header__option">
            <span style={{color:"rgb(85, 26, 139)"}}>Products</span>
        </div>
      </Link>
      <Link to="/orders" className="header__link">
        <div className="header__option">
          <span style={{color:"rgb(85, 26, 139)"}}>Orders</span>
        </div>
      </Link>
      {/* Busket */}
      <Link to="/checkout" className="header__link">
          <div className="header__optionBusket">
              <ShoppingBasketIcon style={{color:"rgb(85, 26, 139)"}}/>
              <span style={{position:"absolute", top:"14px",color:"rgb(85, 26, 139)"}}>{basket?.length}</span>
          </div>
      </Link>
      {/* </div> */}
      </div>
    </nav>
  );
}

export default Header;
