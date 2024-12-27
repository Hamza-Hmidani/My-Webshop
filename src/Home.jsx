import { useState, useEffect } from "react";
import axios from "axios";
import {Link } from "react-router-dom";
import Services from "./Services";
import Slider from "./Slider";
import Footer from "./Footer";

export default function Home() {
  const [Larticle, setLarticle] = useState([]);
  // Récupération des articles
  useEffect(() => {
    axios
      .get("http://localhost:3030/Articles")
      .then((res) => {
        setLarticle(res.data);
      })
      .catch((err) => {
        console.error("Error fetching articles:", err);
      });
  }, []);
  

  // Gestion du changement automatique d'images
  
  return (
    <>
      <Slider />
      <Services />

      {/* Liste des articles */}
      <div className="ListeArticle">
        {Larticle.map((are) => (
          <div key={are.id} className="card-article">
            <div className="image-container">
              <img src={are.image} alt={are.nomA} className="product-image" />
              <span className="discount-badge">Cashback {are.cashback} %</span>
            </div>
            <h3 className="product-title">{are.nomA}</h3>
            <p className="product-price">{are.prix} MAD</p>
            <Link to="/login" className="show-button" style={{"textDecoration": "none"}}>achat</Link>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}
