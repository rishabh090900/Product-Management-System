import React,{useState} from "react";
const AddProduct=()=>{
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [error, setError]=useState(false)
    const addProduct =async()=>{
        if (!name || !price || !company || !category){
            setError(true)
            return false
        }
     console.warn(name,price,category,company)
     const userid=JSON.parse(localStorage.getItem('user'))._id;
     console.warn(userid)
     let result=await fetch("http://localhost:5000/add-product",{
        method:'post',
        body:JSON.stringify({name,price,category,company,userid}),
        headers:{
            "Content-type":"application/json"
        }

     });
      result=await result.json();
     console.warn(result);
    }


return(
<div className="product">


<h1> Add Product</h1>
<input type="text" className="inputBox" placeholder="Enter Product Name" 
 value={name} onChange={(e)=>setName(e.target.value)}/>
{error && !name && <span className="invalid-input">Enter Valid Name</span>}
<input type="number" className="inputBox" placeholder="Enter Product Price"
 value={price} onChange={(e)=>setPrice(e.target.value)}/>
 {error && !price && <span className="invalid-input">Enter Valid Price</span>}
<input type="text" className="inputBox" placeholder="Enter Product Category"
 value={category} onChange={(e)=>setCategory(e.target.value)}/>
 {error && !category && <span className="invalid-input">Enter Valid Category</span>}
<input type="text" className="inputBox" placeholder="Enter Product Company"
 value={company} onChange={(e)=>setCompany(e.target.value)}/>
{error && !company && <span className="invalid-input">Enter Valid Company</span>}


<button onClick={addProduct} className="appButton">Add Product</button> 


</div>


)


}

export default AddProduct;