import React,{ useEffect,useState } from 'react';
import { useStateValue } from './StateProvider';
import { auth, db } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { motion } from 'framer-motion';
import './Orders.css';

function Orders() {
    const [{ user }] = useStateValue(); 
    const [fetchOrders, setfetchOrders] = useState([]);
    console.log(fetchOrders);

    const useStyles = makeStyles({
        table: {
          minWidth: 650,
        },
      });
      

    //Fetch User Orders
    useEffect(() => {
        //Fetch orders from db
        if(auth){
            if(user?.uid){
                db.collection(user?.uid).orderBy('timestamp','desc').onSnapshot( snapShot => {
                    setfetchOrders(snapShot.docs.map(doc => 
                      ({
                        basket: doc.data().basket,
                        orderTime: doc.data().timestamp
                      })
                    ))
                })
            }else{
                setfetchOrders([])
                alert("Log in fist to see your orders with us")
            }
        }else{
            setfetchOrders([])
            alert("Log in fist to see your orders with us")
        }
        
      }, [user])

    
      const classes = useStyles();
    return (
        
        <motion.div initial={{ opacity: 0, x: -10}} animate={{ opacity: 1, x: 0}} transition={{ delay: .5}} className="ordersTable" style={{padding:"2rem"}}>
            <h1 style={{padding:"1rem"}}>My Orders</h1>
            <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="order table">
                <TableHead>
                <TableRow>
                    <TableCell style={{fontWeight:"700 !important"}}>Image</TableCell>
                    <TableCell style={{fontWeight:"700 !important"}}>Product</TableCell>
                    {/* <TableCell style={{fontWeight:"700 !important"}}>Quantity</TableCell> */}
                    <TableCell style={{fontWeight:"700 !important"}} align="right">Total&nbsp;Price</TableCell>
                    {/* <TableCell align="right">Deliver</TableCell> */}
                </TableRow>
                </TableHead>
                <TableBody>
                {
                    fetchOrders.map( singleOrder => 
                        singleOrder.basket.map(item => (
                            <TableRow key={item.id}>
                                <TableCell> <img alt="product" style={{objectFit:"contain", width:"50px"}} src={item.image} /></TableCell>
                                <TableCell component="th" scope="row">
                                    {item.title}
                                </TableCell>
                                {/* <TableCell >{item.count}</TableCell> */}
                                <TableCell align="right">{item.price}</TableCell>
                                {/* <TableCell align="right">{}</TableCell> */}
                            </TableRow>
                            )
                            // <>
                            // <li key={item.id}>{item.title}</li>
                            // </>
                        )
                    )
                }
            </TableBody>
            </Table>
            </TableContainer>
        </motion.div>
    )
}

export default Orders
