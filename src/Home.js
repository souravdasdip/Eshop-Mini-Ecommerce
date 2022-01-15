import React from 'react';
import { Link } from "react-router-dom";
import "./Home.css";
import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
import { motion } from 'framer-motion';
import image from './images/0.svg';

function Home() {
    
    return (
        <motion.div 
        exit={{ opacity: 0}}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: .3}}
         className="main__home">
            <div className="carousal">
                <div className="inner">
                <div className="intro">
                    <h1>Store Room</h1>
                    <div style={{marginBottom: "1rem"}}>
                        <strong>- Easy shopping anywhere anytime</strong>
                    </div>
                    <Link to="/login" style={{textDecoration:"none"}}>
                        <Button variant="contained" color="primary" >
                        Join Us
                        </Button>
                    </Link>
                    
                   </div>
                <img src={image} alt=""/>
                </div>
            </div>  
        </motion.div>
    )
}
export default Home
