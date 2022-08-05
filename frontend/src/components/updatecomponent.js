import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    useEffect(() => {
        getProductDetails();
    },[])

    const getProductDetails = async () => {

        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setCategory(result.category)
        setPrice(result.price)
        setCompany(result.company)
    }
    const updateProduct = async () => {
        console.warn(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "Put",
            body: JSON.stringify({ name, price, category, company }),
            header: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        console.warn(result)
    }

    return (
        <div className="product">


            <h1> Update Product</h1>
            <input type="text" className="inputBox" placeholder="Enter Product Name"
                value={name} onChange={(e) => setName(e.target.value)} />
            <input type="number" className="inputBox" placeholder="Enter Product Price"
                value={price} onChange={(e) => setPrice(e.target.value)} />

            <input type="text" className="inputBox" placeholder="Enter Product Category"
                value={category} onChange={(e) => setCategory(e.target.value)} />

            <input type="text" className="inputBox" placeholder="Enter Product Company"
                value={company} onChange={(e) => setCompany(e.target.value)} />

            <button onClick={updateProduct} className="appButton">Update Product</button>


        </div>


    )


}

export default UpdateProduct;