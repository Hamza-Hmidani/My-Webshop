import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";

export default function Article({ sessionvalide }) {
  const [tarticles, setTarticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [reload, setReload] = useState(false);
  const navigation = useNavigate();

  // Vérification de la session
  useEffect(() => {
    if (!sessionvalide) {
      navigation("/login");
    }
  }, [sessionvalide, navigation]);

  // Récupération des articles et catégories
  useEffect(() => {
    axios
      .get("http://localhost:3030/Articles")
      .then((res) => {
        setTarticles(res.data);

        // Extraction des catégories uniques
        const uniqueCategories = [
          ...new Set(res.data.map((art) => art.categorie || "Non classé")),
        ];
        setCategories(["Tous", ...uniqueCategories]);
      })
      .catch((err) => console.error(err));
  }, [reload]);

  // Supprimer un article
  const supprimer = (idsup) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
      axios
        .delete(`http://localhost:3030/Articles/${idsup}`)
        .then(() => {
          alert("Article supprimé avec succès !");
          setReload(!reload);
        })
        .catch((err) => alert(err));
    }
  };

  // Filtrer les articles par catégorie
  const articlesFiltres =
    selectedCategory === "Tous"
      ? tarticles
      : tarticles.filter((art) => art.categorie === selectedCategory);

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
            <Link to="/ajouter" className="btn btn-primary me-3">
              Ajouter un article
            </Link>
            <Link to="/ajouterUser" className="btn btn-primary me-3">
              Ajouter une User
            </Link>
            <Link to="/clients" className="btn btn-primary">
              Liste les clients
            </Link>
        </div>
        

        {/* Sélection de catégorie */}
        <select
          className="form-select w-25"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Tableau des articles */}
      <div
        className="table-container"
        style={{
          backgroundColor: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <table className="table table-hover">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nom article</th>
              <th>Prix Article</th>
              <th>Photo Article</th>
              <th>Cashback</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articlesFiltres.map((art) => (
              <tr key={art.id}>
                <td>{art.id}</td>
                <td>{art.nomA}</td>
                <td>{art.prix} MAD</td>
                <td>
                  <img
                    src={art.image}
                    alt={art.nomA}
                    height="110px"
                    className="rounded shadow-sm"
                  />
                </td>
                <td>
                  <span className="badge bg-success">{art.cashback} %</span>
                </td>
                <td>{art.categorie || "Non classé"}</td>
                <td>
                  <Link
                    to={`/update/${art.id}`}
                    className="btn btn-success"
                    style={{ marginRight: "5px" }}
                  >
                    Modifier
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => supprimer(art.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
