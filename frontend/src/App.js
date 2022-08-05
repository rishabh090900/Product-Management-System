import './App.css';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Private from './components/private';
import Login from './components/Login';
import AddProduct from './components/Addproduct';
import Product from './components/Product';
import UpdateProduct from './components/updatecomponent';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
         <Nav/>
         <Routes>
          <Route element={<Private/>}>
          <Route path="/" element={<Product/>}/>
          <Route path="/add" element={<AddProduct/>}/>
          <Route path="/update/:id" element={<UpdateProduct />}/>
          <Route path="/logout" element={<h1>Logout Component</h1>}/>
          <Route path="/profile" element={<h1>Profile Component</h1>}/>
         </Route>
         <Route path="/signup" element={<Signup/>}/>        
         <Route path="/Login" element={<Login/>}/>
         </Routes>
 
      </BrowserRouter>
      <Footer/>
     </div>
  );
}

export default App;
