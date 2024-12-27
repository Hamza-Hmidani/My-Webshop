import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ajouter.css";

export default function AjouUsers() {
  const navigation = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setpassword] = useState("");
  const [nom, setNom] = useState("");
  const [Prenom, setPrenom] = useState("");
  const [id,setId]= useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ListeAr,setListeAr]=useState([]);


  useEffect(() => {
    axios
      .get("http://localhost:3030/Users")
      .then((res) => {
        setListeAr(res.data);
      })
    }, []);

  const ajout = () => {
    // Validation basique des champs
    if (!login || !password || !nom || !Prenom || !id) {
      toast.error("Tous les champs doivent être remplis !");
      return;
    }

    setIsLoading(true); // Désactiver les champs pendant le traitement

    axios
      .post("http://localhost:3030/Users", {
        Login: login,
        pass: password,
        Nom: nom,
        Prénom: Prenom,
        id: id

      })
      .then((res) => {
        toast.success("Article ajouté avec succès !");
        setLogin("");
        setpassword("");
        setNom("");
        setPrenom("");
        setId("");
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
      <h1 className="ajouter-title">Ajouter une User</h1>
      <div className="form-group">
        <label className="form-label">Logine de user :</label>
        <input
          className="form-input"
          type="email"
          value={login}
          onChange={(ev) => setLogin(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Mote de passe :</label>
        <input
          className="form-input"
          type="text"
          value={password}
          onChange={(ev) => setpassword(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nom de user :</label>
        <input
          className="form-input"
          type="text"
          value={nom}
          onChange={(ev) => setNom(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Prénom de user :</label>
        <input
          className="form-input"
          type="text"
          value={Prenom}
          onChange={(ev) => setPrenom(ev.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label className="form-label">id de user :</label>
        <input
          className="form-input"
          type="text"
          value={id}
          onChange={(ev) => setId(ev.target.value)}
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
