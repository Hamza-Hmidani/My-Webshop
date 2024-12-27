import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function ClientList() {
  const [clients, setClients] = useState([]);
const navigation = useNavigate();
  // Charger la liste des clients depuis l'API
  useEffect(() => {
    axios
      .get("http://localhost:3030/Client")
      .then((response) => setClients(response.data))
      .catch((error) => {
        console.error(error);
        toast.error("Erreur lors de la récupération des clients.");
      });
  }, []);

  const annuler = () => {
      navigation("/LArt");
    };

  return (
    <div className="container mt-5">
      <h2 className="text-center bg-dark text-white py-2 rounded">Liste des Clients</h2>
      {clients.length > 0 ? (
        <table className="table table-striped table-bordered mt-4">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.Nom}</td>
                <td>{client.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center mt-4">Aucun client trouvé.</p>
      )}
      <button
          className="btn-annuler"
          onClick={annuler}
        >
          Retourner
        </button>
    </div>
  );
}
