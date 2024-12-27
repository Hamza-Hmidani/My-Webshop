import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./Loginstyle.css";

export default function Login({ setSessionvalide }) {
  const navigate = useNavigate();
  const [tlogin, setTlogin] = useState(""); // Email de l'utilisateur
  const [tpass, setTpass] = useState("");
  const [nom, setNom] = useState("");
  const [tusers, setTUsers] = useState([]); // Liste des utilisateurs
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const inscrire = async () => {
    if (!nom || !tlogin || !tpass) {
      toast.error("Veuillez remplir tous les champs.");
      return;
    }

    const newClient = {
      Nom: nom,
      Email: tlogin,
      pass: tpass,
    };
    try {
      const response = await axios.post("http://localhost:3030/Client", newClient);
      if (response.status === 201) {
        toast.success("Compte créé avec succès.");
        setIsRightPanelActive(false); // Basculer vers la connexion
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création du compte.");
    }
  };
  // Charger les utilisateurs depuis l'API au chargement du composant
  useEffect(() => {
    axios
      .get("http://localhost:3030/Users")
      .then((res) => setTUsers(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Erreur lors de la récupération des utilisateurs.");
      });
  }, []);

  // Valider les identifiants
  const valider = () => {
    const utilisateurTrouvé = tusers.find(
      (user) => user.Login === tlogin && user.pass === tpass
    );

    if (utilisateurTrouvé) {
      setSessionvalide(true);
      toast.success("Email et mot de passe corrects.");
      navigate("/LArt");
    } else {
      setSessionvalide(false);
      toast.error("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div className="Login">
      <div
        className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
        id="container"
      >
        {/* Section Inscription */}
        <div className="form-container sign-up-container">
          <form>
            <h1>Créer un compte</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"><img src="photo/facebook.png" alt="" width="28px"/></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"><img src="photo/google-plus.png" alt="" width="28px"/></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"><img src="photo/github.png" alt="" width="28px"/></i>
              </a>
            </div>
            <span>ou utilisez votre email pour vous inscrire</span>
            <input
              type="text"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={tlogin}
              onChange={(e) => setTlogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={tpass}
              onChange={(e) => setTpass(e.target.value)}
            />
            <button type="button" onClick={inscrire}>
              S'inscrire
            </button>
          </form>
        </div>

        {/* Section Connexion */}
        <div className="form-container sign-in-container">
          <form>
            <h1>Se connecter</h1>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"><img src="photo/facebook.png" alt="" width="28px"/></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"><img src="photo/google-plus.png" alt="" width="28px"/></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"><img src="photo/github.png" alt="" width="28px"/></i>
              </a>
            </div>
            <span>ou utilisez votre compte</span>
            <input
              type="email"
              placeholder="Email"
              value={tlogin}
              onChange={(e) => setTlogin(e.target.value)}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={tpass}
              onChange={(e) => setTpass(e.target.value)}
            />
            <a href="#">Mot de passe oublié ?</a>
            <button type="button" onClick={valider}>
              Se connecter
            </button>
          </form>
        </div>

        {/* Conteneur de superposition */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Content de vous revoir !</h1>
              <p>
                Pour rester connecté avec nous, veuillez vous connecter avec vos
                informations personnelles
              </p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(false)}
              >
                Se connecter
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bonjour, Ami !</h1>
              <p>
                Entrez vos informations personnelles et commencez votre aventure
                avec nous
              </p>
              <button
                className="ghost"
                onClick={() => setIsRightPanelActive(true)}
              >
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
