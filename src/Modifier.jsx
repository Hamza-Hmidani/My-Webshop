import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './modifier.css';
import { toast } from "react-toastify";

export default function Modifier() {
  const { id } = useParams();
  const [nomA, setnomA] = useState("");
  const [prix, setprix] = useState("");
  const [image, setimage] = useState("");
  const [cashback, setcashback] = useState("");
  const [categorie,setcategorie]= useState("");
  const navigation = useNavigate();

  // Charger les données de l'article au montage
  useEffect(() => {
    axios
      .get("http://localhost:3030/Articles/" + id)
      .then((res) => {
        setnomA(res.data.nomA);
        setprix(res.data.prix);
        setimage(res.data.image);
        setcashback(res.data.cashback);
        setcategorie(res.data.categorie)
      })
      .catch((err) => toast.error("Erreur lors du chargement des données : " + err));
  }, [id]);

  // Fonction pour modifier l'article
  const modifier = () => {
    axios
      .put("http://localhost:3030/Articles/" + id, {
        nomA: nomA,
        prix: prix,
        image: URL.createObjectURL(image),
        cashback: cashback,
        categorie:categorie
      })
      .then(() => {
        alert("Article modifié avec succès !");
        navigation("/LArt");
        toast.success("modiffication avec succès");
      })
      .catch((err) => alert("Erreur lors de la modification : " + err));
  };

  
  const annuler = () => {
    navigation("/LArt");
    toast.warning("vous avez annulé la modification");
  };

  return (
    <div className="modifier-container">
      <h1 className="modifier-title">Modifier un Article</h1>
      <div className="form-group">
        <label className="form-label">Nom de l'article :</label>
        <input
          className="form-input"
          type="text"
          value={nomA}
          onChange={(ev) => setnomA(ev.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Prix :</label>
        <input
          className="form-input"
          type="text"
          value={prix}
          onChange={(ev) => setprix(ev.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image :</label>
        <input
          className="form-input"
          type="file"
          onChange={(ev) => setimage(ev.target.files[0])}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Cashback :</label>
        <input
          className="form-input"
          type="text"
          value={cashback}
          onChange={(ev) => setcashback(ev.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Categorie :</label>
        <input
          className="form-input"
          type="text"
          value={categorie}
          onChange={(ev) => setcategorie(ev.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="btn-modifier" onClick={modifier}>Modifier</button>
        <button
          className="btn-annuler"
          onClick={annuler}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
