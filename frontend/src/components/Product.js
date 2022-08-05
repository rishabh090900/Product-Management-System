import React, { useEffect, useState } from "react";

import {Link} from 'react-router-dom'

const Product = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, [])
   const deleteProduct = async(user)=>
   {
    let result= await fetch(`http://localhost:5000/product/${user}`,{
        method:"Delete"
    });
    result=await result.json();
    if(result)
    {
        alert("product deleted")
        window.location.reload(false);
    }
    console.warn(user)
   }
    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/product");
        result = await result.json();
        setProducts(result);
    }
    console.warn(products);
    const searchHandle=async(event)=>{
     let key= event.target.value;
     if(key){
        let result=await fetch(`http://localhost:5000/search/${key}`);
     result=await result.json();
     if(result)
    {
        setProducts(result);
    }
}
    }
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="" className="search-product" placeholder="Search Product"
            onChange={searchHandle}/>
            <ul className="list-ul">
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                <li>Operation</li>

            </ul>
            
                {
                products.length>0 ? products.map((item,index)=>
            
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>{item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li><button className="delete" onClick={()=>deleteProduct(item._id)}>Delete</button>
                <button className="delete" ><Link className="update" to={"/update/"+item._id}>Update</Link></button></li>
            </ul>)
        :<h1>No Result Found</h1>    
        }
        </div>
    )

}

export default Product;