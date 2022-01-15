import React,{ useState,useEffect } from 'react'
import Products from "./Products";
import SearchIcon from "@material-ui/icons/Search";
import "./Home.css";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
import { db } from './firebase';
import { motion } from 'framer-motion';

function OurProducts() {
    const [products, setproducts] = useState([]);
    useEffect(() => {
        db.collection('products').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setproducts(snapshot.docs.map(doc => 
              ({
                id: doc.id,
                item: doc.data()
              })  
            ))
          })    
    }, [])

    const [queryProducts, setqueryProducts] = useState([]);    
    // Form onTextChange
    const onChange = e => {
        e.preventDefault();    
        // setText(e.target.value);
        if(e.target.value === ''){
            setqueryProducts([])
        }else{
        // products: products.filter(item => (item.title.toString().toLowerCase()).includes(text.toString().toLowerCase()))  
            setqueryProducts(products.filter(i => (i.item.title.toString().toLowerCase()).includes((e.target.value).toString().toLowerCase())));        
            // setText('');
        }
    }

    const clearState = (e) => {
        e.preventDefault();
        setqueryProducts([]);
        
    }

    return (
        <motion.div
        exit={{ opacity: 0}}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ delay: .3}}
        >
            {/* Search Box */}
            <div className="searchForm" >
                <TextField 
                label="Search Your Desire Item"
                type="text" 
                className="header__searchInput" 
                onChange={ onChange }
                />
                <SearchIcon className="header__searchIcon" />      
            </div>
            {/* {(queryProducts.length > 0) ? <h2 style={{marginLeft:"2rem"}}>Search Results..</h2> : <h2 style={{display:"grid", placeItems:"center", padding:"1rem"}}>Our Products</h2>} */}
            <div className="alll__products">
            {
                (queryProducts.length > 0) && 
                    queryProducts.map(i => (
                        <Products
                            key={i.id}
                            id={i.id}
                            title={i.item.title}
                            price={i.item.price}
                            image={i.item.imgURL}
                            details={i.item.details}
                        />
                        
                    ))
            }
            </div>
            { (queryProducts.length > 0)  && 
                    <div style={{display:"grid", placeItems:"center", width:"100%", margin:"1rem 0"}}>
                    <Button 
                    variant="contained" 
                    color="secondary" 
                    type="submit" 
                    onClick={ clearState }>
                    Clear Search Results      
                    </Button>
                    </div>
                }
            
            <div className="alll__products">
                {
                    products.map(i => (
                        <Products 
                            key={i.id}
                            id={i.id}
                            title={i.item.title}
                            price={i.item.price}
                            image={i.item.imgURL}
                            details={i.item.details}
                        />
                    ))
                }
                
                
                
            </div>  
        </motion.div>
    )
}

export default OurProducts
