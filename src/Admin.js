import React,{ useEffect,useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useStateValue } from './StateProvider';
import { db,storage } from './firebase';
import firebase from 'firebase';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {Link, RichText, Date} from 'prismic-reactjs';

function Admin({ userid }) {
    const [{ user }, dispatch] = useStateValue();
    const [admin, setAdmin] = useState(null);
    const [products, setProducts] = useState([]);
    const [categoriesFromDB, setcategoriesFromDB] = useState([]);
    const [orders, setorders] = useState([]);

    useEffect(() => {
        //Fetch orders from db
        if(user?.uid === "38ZO8CgrbWeWsg02IUNiBEN41hx2"){
            setAdmin(user);
        }

        db.collection('category').onSnapshot(snapshot => {
            setcategoriesFromDB(snapshot.docs.map(doc => 
              (
                 doc.data()
              )  
            ))
          })

          db.collection("orders").orderBy('timestamp','desc').onSnapshot( snapShot => {
            setorders(snapShot.docs.map(doc => 
              ({
                basket: doc.data().basket,
                orderTime: doc.data().timestamp.toString()
              })
            ))
        })

        db.collection('products').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setProducts(snapshot.docs.map(doc => 
              ({
                id: doc.id,
                items: doc.data()
              })  
            ))
          })

    }, [user,userid])
    const [productTitle, setProductTitle] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [productPrice, setProductPrice] = useState();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [addcategory, setaddcategory] = useState('');
    const [category, setCategory] = useState('');

    const handleChange = (e) => {
        e.preventDefault();
        if(e.target.files[0]){
            setImage(e.target.files[0])
        }
    }

    const createCategory = (e) => {
        e.preventDefault();
        db.collection("category").add({
            category: addcategory
        })
        setaddcategory('')
        alert("Category Added")
    }

    const handleUpload = (e) => {
        e.preventDefault();
        // Check If Empty
        if(image == null && productTitle === '' && productDetails === '' && productPrice === 0){
            alert("Enter Product Information Correctly");
        }else{        
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                //Image Upload Progress Function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
                )
                setProgress(progress);
            },

            (error) => {
                //Image Upload Error function
                console.log(error);
                alert(error.message);
            },

            () => {
                //Image Upload Complete Function & Get Image Link That Just Uploaded
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url => {
                    //Post Image Inside DB
                    db.collection("products").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        title: productTitle,
                        details: productDetails,
                        category: category,
                        price: parseInt(productPrice),
                        imgURL: url
                    })

                    setProgress(0);
                    setProductTitle('');
                    setProductDetails('');
                    setProductPrice(0);
                    setImage(null);
                });
                
            }
        )
    }
    }

    return (
        <div style={{ padding: '1.5rem'}}>
            {/* <h1 style={{marginBottom:"1rem"}}>Admin Site</h1> */}
            {admin && 
                <> 
                <div style={{display:"flex"}}>
                <div style={{width: "64%"}}>
                <div style={{display:"flex",marginBottom:"1rem", alignItems:"center"}}>
                <TextField 
                label="Add Category..." type="text" 
                value={addcategory} 
                onChange={ e => setaddcategory(e.target.value) }/>
                <Button
                variant="contained"
                color="primary"
                onClick={createCategory}>Add</Button>           
                </div>
                <h3>Add Product</h3>
                <progress style={{width:"100%"}} value={progress} max="100"/>        
                <Card className="adminpost__section" style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between", alignItems:"center",padding:"2rem"}}>
                <TextField style={{marginBottom:"1rem"}}
                label="Enter Product title..." type="text" 
                value={productTitle} 
                onChange={ e => setProductTitle(e.target.value) }/>
                
                <TextField style={{marginBottom:"1rem"}}  
                label="Enter Product details..." type="text" 
                value={productDetails} 
                onChange={ e => setProductDetails(e.target.value) }/>
    
                <TextField style={{marginBottom:"1rem"}} id="standard-basic" 
                label="Enter Product Price" type="number"
                value={productPrice}
                onChange={e => setProductPrice(e.target.value)}
                />

                <InputLabel id="category-select">Category</InputLabel>
                <Select
                labelId="category-select"
                id="cselect"
                value={category}
                onChange={e => setCategory(e.target.value)}
                >
                    {
                        categoriesFromDB.map(i => (
                            <MenuItem value={i.category}>{i.category}</MenuItem>
                            ))
                    }
                </Select>
                {/* File Picker */}
                <input title = "" onChange={ handleChange } type="file"/>
                {/* Post Button */}
                <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}>Add Product</Button>           
            </Card> 

            <div style={{marginTop:".5rem", padding:".5rem"}}>
                <h2>Products</h2>
                <ul style={{height:"40vh",overflowY:"scroll"}}>
                    {
                    products.map(({id,items}) =>
                    <Card key={id} style={{margin:".2rem", padding:".5rem", display:"flex", alignItems:"flex-start",justifyContent:"space-evenly"}}><strong>Product:</strong>{items.title} &nbsp;&nbsp;&nbsp;<strong>Price:</strong>{items.price}tk &nbsp;&nbsp;&nbsp;<strong>Desc:</strong><span style={{width:"300px", height: "100px", overflowY:"scroll"}}>{items.details}</span> &nbsp;&nbsp;&nbsp;<strong>Image:</strong><img alt="product" style={{width: "60px"}} src={items.imgURL}/>&nbsp;&nbsp;&nbsp;</Card>
                    )}
                    
                </ul>
            </div>
            </div>
            
            <div style={{width: "40%"}}>
            <h3>Orders And Pendings</h3>
                <div style={{marginTop:".2rem", padding:"1rem",height:"65vh",overflowY:"scroll"}}>
                    <ul >
                
                        {
                            orders.map(singleOrdr => (
                                singleOrdr.basket.map(item => (
                                <Card id={singleOrdr.id} style={{padding:"1rem",marginBottom:".5rem"}}>
                                <div style={{marginBottom:".2rem"}}>Product:&nbsp;&nbsp;{item.title}</div><div style={{marginBottom:".2rem"}}>Price:&nbsp;&nbsp;{item.price}tk</div><div style={{marginBottom:".2rem"}}>User:&nbsp;&nbsp;{item.userEmail}</div></Card>
                                ))
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
            </div>
            </>
            }
            {!admin && <h1 style={{display:"grid",placeItems:"center"}}>404 NOT FOUND</h1>}
        </div>
    )
}

export default Admin
