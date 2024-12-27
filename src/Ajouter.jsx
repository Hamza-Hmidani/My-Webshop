import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ajouter.css";

export default function Ajouter() {
  const navigation = useNavigate();
  const [nomA, setnomA] = useState("");
  const [prix, setprix] = useState("");
  const [image, setimage] = useState(null);
  const [cashback, setcashback] = useState("");
  const [categorie,setcategorie]= useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ListeAr,setListeAr]=useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3030/Articles")
      .then((res) => {
        setListeAr(res.data);
      })
    }, []);

  const ajout = () => {
    // Validation basique des champs
    if (!nomA || !prix || !image || !cashback || !categorie) {
      toast.error("Tous les champs doivent être remplis !");
      return;
    }

    setIsLoading(true); // Désactiver les champs pendant le traitement

    axios
      .post("http://localhost:3030/Articles", {
        id : ListeAr.length+1,
        nomA: nomA,
        prix: prix,
        image: URL.createObjectURL(image),
        cashback: cashback,
        categorie: categorie,
      })
      .then((res) => {
        toast.success("Article ajouté avec succès !");
        setnomA("");
        setprix("");
        setimage(null);
        setcashback("");
        setcategorie("");
        navigation("/LArt");
      })
      .catch((err) => toast.error("Erreur lors de l'ajout de l'article : " + err))
      .finally(() => setIsLoading(false)); // Réactiver les champs
  };

  const annuler = () => {
    navigation("/LArt");
    toast.warning("Ajout annulé !");
  };

  return (
    <div className="ajouter-container">
      <ToastContainer />
      <h1 className="ajouter-title">Ajouter un Article</h1>
      <div className="form-group">
        <label className="form-label">Nom de l'article :</label>
        <input
          className="form-input"
          type="text"
          value={nomA}
          onChange={(ev) => setnomA(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Prix :</label>
        <input
          className="form-input"
          type="text"
          value={prix}
          onChange={(ev) => setprix(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Image :</label>
        <input
          className="form-input"
          type="file"
          onChange={(ev) => setimage(ev.target.files[0])}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Cashback :</label>
        <input
          className="form-input"
          type="text"
          value={cashback}
          onChange={(ev) => setcashback(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Categorie :</label>
        <input
          className="form-input"
          type="text"
          value={categorie}
          onChange={(ev) => setcategorie(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-actions">
        <button className="btn-ajouter" onClick={ajout} disabled={isLoading}>
          {isLoading ? "Ajout en cours..." : "Ajouter"}
        </button>
        <button
          className="btn-annuler"
          onClick={annuler}
          disabled={isLoading}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
