import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Footer from "./Footer";

const SearchArticles = () => {
  const [articles, setArticles] = useState([]); // Tous les articles
  const [searchTerm, setSearchTerm] = useState(""); // Terme de recherche
  const [filteredArticles, setFilteredArticles] = useState([]); // Articles filtrés
  const [categories, setCategories] = useState([]); // Liste des catégories
  const [selectedCategory, setSelectedCategory] = useState("Toutes"); // Catégorie sélectionnée

  // Récupération des articles et des catégories depuis l'API locale
  useEffect(() => {
    axios
      .get("http://localhost:3030/Articles")
      .then((res) => {
        setArticles(res.data);
        setFilteredArticles(res.data); // Initialiser avec tous les articles
        // Extraire les catégories uniques
        const uniqueCategories = [
          "Toutes",
          ...new Set(res.data.map((article) => article.categorie || "Non classé")),
        ];
        setCategories(uniqueCategories);
      })
      .catch((err) => {
        console.error("Erreur lors de la récupération des articles :", err);
      });
  }, []);

  // Mise à jour des articles filtrés en fonction du terme de recherche et de la catégorie
  useEffect(() => {
    const results = articles.filter((article) => {
      const matchesSearch = article.nomA
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Toutes" ||
        article.categorie === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    setFilteredArticles(results);
  }, [searchTerm, selectedCategory, articles]);

  // Gestion de la saisie dans la barre de recherche
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Gestion de la sélection de catégorie
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="search-page">
      <div
        style={{
          backgroundImage: `url("photo/table.jpg")`,
          width: "100%",
          height: "200px",
          backgroundSize: "cover",
          marginBottom: "30px",
          marginTop: "0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h1>Articles</h1>
      </div>
      {/* Barre de recherche */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            id="S1"
          />
          <label htmlFor="S1" style={{ padding: "8px" }}>
            <img src="photo/search.png" alt="Icone recherche" width="30px" />
          </label>
        </div>
          {/* Menu déroulant de sélection */}
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="form-select w-25"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
      </div>

      {/* Liste des articles filtrés */}
      <div className="ListeArticle">
        {filteredArticles.map((are) => (
          <div key={are.id} className="card-article">
            <div className="image-container">
              <img src={are.image} alt={are.nomA} className="product-image" />
              <span className="discount-badge">Cashback {are.cashback} %</span>
            </div>
            <h3 className="product-title">{are.nomA}</h3>
            <p className="product-price">{are.prix} MAD</p>
            <button className="show-button">Show</button>
          </div>
        ))}
        {filteredArticles.length === 0 && (
          <p className="no-results">Aucun article trouvé.</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchArticles;
