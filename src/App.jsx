import { Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Home from "./Home"; 
import './index.css';
import { useState } from 'react';
import Article from "./Article";
import Modifier from "./Modifier";
import Contact from "./Contact";
import SearchArticles from "./SearchArticles";
import Ajouter from "./Ajouter";
import AjouUsers from "./AjouUsers";
import ClientList from "./ClientList";





export default function App() {
  const [sessionvalide,setSessionvalide ]=useState(false) ;
  return (
    <div style={{"marginTop":"120px"}}>
      
      <div className="container1" >
        <div className="div1">
          <h2 style={{ color: "aliceblue" }}> <img src="photo/shopping-bag.png" alt="" style={{"paddingBottom":"12px"}}/> My Webshop</h2>
        </div>
        <div className="div2">
          <Link to="/">Home</Link>
          <Link to="/Contact">Contact</Link>
          <Link to="/login"><img src="photo/user.png" alt="" width="25px"/></Link>
          <Link to="/boutique">
            <img src="photo/grocery-store.png" alt="" />
          </Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setSessionvalide={setSessionvalide}/>} />
        <Route path="/LArt" element={<Article sessionvalide={sessionvalide} setSessionvalide={setSessionvalide}/>} />
        <Route path="/boutique" element={<SearchArticles />} />
        <Route path='update/:id' element={<Modifier />}></Route>
        <Route path="/Contact" element={<Contact />} />
        <Route path="/ajouter" element={<Ajouter />}></Route>
        <Route path="/ajouterUser" element={<AjouUsers />}></Route>
        <Route path="/clients" element={<ClientList />} />
      </Routes>
     
    </div>
  );
}
