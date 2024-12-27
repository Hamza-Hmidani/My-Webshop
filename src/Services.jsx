import React from "react";
import "./style.css"

const Services = () => {
  const services = [
    {
      icon: "🚗",
      title: "Livraison gratuite",
      description: "Le client est très content.",
      bgColor: "#ffece6", // Couleur de fond personnalisée
    },
    {
      icon: "💳",
      title: "Paiement sécurisé",
      description: "Le client est très content.",
      bgColor: "#dff3f3",
    },
    {
      icon: "🛡️",
      title: "Paiement sécurisé",
      description: "Le client est très content.",
      bgColor: "#edf9d9",
    },
    {
      icon: "🎧",
      title: "Garantie de remboursement",
      description: "Le client est très content.",
      bgColor: "#e7f0fe",
    },
  ];

  return (
    <div className="services-container">
      {services.map((service, index) => (
        <div
          key={index}
          className="service-card"
          style={{ backgroundColor: service.bgColor }}
        >
          <div className="service-icon">{service.icon}</div>
          <h3 className="service-title">{service.title}</h3>
          <p className="service-description">{service.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
