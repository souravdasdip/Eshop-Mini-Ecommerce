import React from 'react';
import './Products.css';
import { useStateValue } from './StateProvider';
import { motion } from 'framer-motion';
import './Products.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import './Checkout.css';

function CheckoutProduct({ id,title,price,rating,image,count }) {
    const [ ,dispatch ] = useStateValue();
    const removeFromBasket = () => {
        dispatch({
            type: "REMOVE_TO_BASKET",
            id: id
        })
    }
    
    // const [quantity, setQuantity] = useState(count);
    // const changeQuantity = (e) => {
    //     e.preventDefault();
    //     e => setQuantity(e.target.value)
    // }

    return (
        <motion.div initial={{ opacity: 0, x: -10}} animate={{ opacity: 1, x: 0}} transition={{ delay: .5}} className="single__product chackout__product">
            <Card className="single__product before__checkout">
            <img src={image} alt=""/>
            <div className="checkoutProduct__info">
                <p>{title}</p>
                {/* <input type="number" value={count} onChange={ changeQuantity } name="" id=""/> */}
                <h4>BDT: { price}</h4>
                {/* <div className="product__rating">
                    {
                    Array(rating)
                    .fill()
                    .map(() => (
                        <span>⭐</span>
                    ))}
                </div> */}
                <Button style={{ marginTop: "5px"}} variant="contained" color="secondary" onClick={removeFromBasket}>Remove from Basket</Button>
            </div>
            </Card>
        </motion.div>
    )
}



export default CheckoutProduct
