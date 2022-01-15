import React, { useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router-dom';
import { auth } from './firebase';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { motion } from "framer-motion";

function Login() {
    // Declare the variable
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Login
    const login = (event) => {
        event.preventDefault(); //This stops refresh
        // Login Credential
        auth.signInWithEmailAndPassword(email,password)
        .then((auth) => {
            //Loggin in,redirect to Home
            history.push('/');
        })
        .catch((e) => alert(e.message));
    }

    // Register
    const register = (event) => {
        event.preventDefault(); //This stops refresh
        auth.createUserWithEmailAndPassword(email,password)
        .then(auth => {
            // Create User and Logged in, redirect the Home Page
            history.push('/');
        })
        .catch((e) => alert(e.message));
    }

    return (
        <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
        className="login">
            <Card className="login__form">
                <h1>Join Us</h1> 
                <TextField required style={{marginBottom:"5px"}} id="standard-basic" label="Email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
                <TextField required style={{marginBottom:"25px"}} type="password" label="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                <Button style={{marginBottom:"1rem"}} variant="contained" color="primary" type="submit" onClick={login}>Sign In</Button>
                <p style={{margin:".3rem .1rem",width:"22rem", fontSize:".8rem",color:"gray"}}>By signing up, You agree the terms and conditions of store room.</p>
                <Button style={{marginBottom:"5px"}} variant="contained" color="primary" onClick={register}>Create Your Store Room Account</Button>
            </Card>
        </motion.div>
    )
}

export default Login
