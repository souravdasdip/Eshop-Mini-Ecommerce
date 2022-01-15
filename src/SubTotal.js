import React from 'react';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider';
import { getBasketTotal } from './reducer';
import { auth, db } from './firebase';
import firebase from 'firebase';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import './Checkout.css';

function SubTotal() {
    const [{ user, basket }, dispatch] = useStateValue(); 
    console.log(basket);
    // console.log(db.collection('orders').doc(user?.uid));
    //Proceed to checkout
    const proceedCheckout = (e) => {
        e.preventDefault();
        // const useruid = await db.collection('orders').doc(user?.uid);
        // let doc = await useruid.get();
        if(auth){
            db.collection(user?.uid).add({
                userEmail: user?.email,
                basket: basket,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
              })

            db.collection("orders").add({
            userEmail: user?.email,
            basket: basket,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
            
            dispatch({
                type: 'SUCCESS_CHECKOUT',
                basket: []
            })
            alert("Thanks to shopping with us")
        }else{
            alert("Login Please");

        }
        
    }
    return (
        <Card className="subtotal">
            <h2>Sub Total</h2>      
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <p>Subtotal ({basket.length} items) : <strong>{`Total: ${value}`}</strong> </p>
                        <small className="subtotal__gift">
                            <input type="checkbox"/> Cash on delivery

                       </small>
                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"BDT "}
            />
            <Button variant="contained" color="primary" onClick={ proceedCheckout }>Proceed To Check Out</Button>  
        </Card>
    )
}

export default SubTotal
