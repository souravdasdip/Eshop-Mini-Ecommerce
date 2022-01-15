import React,{ useState } from 'react';
import "./Products.css";
import { useStateValue } from './StateProvider';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import firebase from 'firebase';

//Modal Design
function getModalStyle() {
    const top = 55;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
    }
    
    const useStyles = makeStyles((theme) => ({
      paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
      },
    }));
  //Modal Design

function Products({ id,title,price,image,details }) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const container = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delayChildren: 0.2,
            staggerChildren: 0.2
          }
        }
      }
      
      const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      }
  
    const [{user} , dispatch] = useStateValue();
    
    const addToBasket = () => {
        setOpen(false);
        if(user){
            const userEmail = user.email;
                        // Add Item to Basket and send to reducer
            dispatch({
                type: "ADD_TO_BASKET",
                item:{
                    id,
                    title,
                    price,
                    image,
                    details,
                    userEmail
                }
            })
        }else{
            alert("Login to Buy");
        }
        setOpen(false)
    }

    return (
        <>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .3 }}
        className="all__products">
            <Card className="single__product" style={{width:"250px"}}
            >
            <div className="product__details"  style={{marginBottom:".5rem"}}>
            <h2 style={{padding:".5rem"}}>{title}</h2>
            <div className="product__price" style={{marginTop:".2rem"}}>
                <strong style={{color:"rgb(24,194,179)"}}>BDT: </strong>
                <span>{price}tk</span>
            </div>

            </div>
            <img style={{ objectFit:"contain" }} src={image} alt=""/>
            
            <Button style={{marginTop:"1.5em"}} variant="contained" color="primary" onClick={addToBasket}>Add To Cart</Button>
            <Button variant="outlined" color="primary" onClick={() => setOpen(true)} style={{cursor:"pointer", marginTop:".3rem"}}>
              Show More
            </Button>
            </Card>


            <Modal open={open} onClose={() => setOpen(false)}>
                <div style={modalStyle} className={classes.paper}>
                        <motion.div 
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="single__product" style={{width:"100%"}}>
                        <motion.div variants={item} className="product__details">
                        <h2 style={{padding:".5rem"}}>{title}</h2>
                        <div className="product__price">
                            <strong style={{color:"rgb(24,194,179)"}}>BDT: </strong>
                            <span>{price}tk</span>
                        </div>
                        </motion.div>
                        <motion.img variants={item} style={{ objectFit:"contain",width:"100%",margin:".8rem 0" }} src={image} alt=""/>
                        <motion.p variants={item}> {details} </motion.p>
                        
                        <Button style={{marginTop:"1.5em"}} variant="contained" color="primary" onClick={addToBasket}>Add To Cart</Button>
                        </motion.div>
                </div>
            </Modal>
        
        </motion.div>
        </>
    )
}


export default Products
