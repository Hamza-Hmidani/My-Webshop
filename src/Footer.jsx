import React from "react";
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1 */}
        <div className="footer-section">
          <h2 className="footer-logo">
          <img src="photo/shopping-bag.png" alt="" width="20px" style={{"paddingBottom":"5px"}}/> My Webshop
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
            libero id et, in gravida. Sit diam duis mauris nulla cursus. Erat et
            lectus vel ut sollicitudin elit at amet.
          </p>
        </div>

        {/* Section 2 */}
        <div className="footer-section">
          <h3>À propos de nous</h3>
          <ul>
            <li>Carrières</li>
            <li>Nos magasins</li>
            <li>Nos soins</li>
            <li>Conditions générales</li>
            <li>Politique de confidentialité</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="footer-section">
          <h3>Service Client</h3>
          <ul>
            <li>Centre d'aide</li>
            <li>Comment acheter</li>
            <li>Suivre votre commande</li>
            <li>Achat en gros & entreprises</li>
            <li>Retours & remboursements</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="footer-section">
          <h3>Contactez-nous</h3>
          <p>70 Washington Square South, New York, NY 10012, États-Unis</p>
          <p>Email : uilib.help@gmail.com</p>
          <p>Téléphone : +1 1123 456 780</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
