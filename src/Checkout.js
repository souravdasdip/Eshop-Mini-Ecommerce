import React from 'react';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from './CheckoutProduct';
import SubTotal from './SubTotal';
import './Checkout.css';

function Checkout() {
    const [{ user, basket }] = useStateValue();

    return (
        <div className="checkout__page">
            {
            !user ?
            <h2>Login To Checkout</h2>
            :
            basket?.length === 0 ? (
                <div>
                    <h2>Empty Busket</h2>
                </div>
            )
            :
            (
                <div>
                    <h2 style={{ margin:"0 auto"}}>Your Shopping Busket</h2>
                    {
                        basket.map((item) => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                count={item.count}
                            />
                        ))
                    }
                </div>
            )
            
            }

            {/* SubTotal */}
            {
                basket.length > 0 && 
                (
                    <div className="checkout__subtotal">
                        <SubTotal />
                    </div>
                ) 
            }

        </div>
    )
}



export default Checkout
