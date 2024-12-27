import { useState,useEffect } from "react";
import "./index.css";
import { Link} from "react-router-dom";

export default function Slider(){

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = ["photo/1.png", "photo/2.png", "photo/3.png","photo/4.png"];
    const slides = [
        {
            id: 1,
            title: "50% de réduction pour votre premier achat",
            desc: "Le client est très important, le client sera suivi par le client. Qui est le résultat du football, comment même qui aime la vallée.",
        },
        {
            id: 2,
            title: "50% de réduction pour votre premier achat",
            desc: "Le client est très important, le client sera suivi par le client. Qui est le résultat du football, comment même qui aime la vallée.",
        },
        {
            id: 3,
            title: "50% de réduction pour votre premier achat",
            desc: "Le client est très important, le client sera suivi par le client. Qui est le résultat du football, comment même qui aime la vallée.",       
        },
        {
            id: 4,
            title: "50% de réduction pour votre premier achat",
            desc: "Le client est très important, le client sera suivi par le client. Qui est le résultat du football, comment même qui aime la vallée.",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
        }, 3000); // Change l'image toutes les 3 secondes
    
        return () => clearInterval(interval); // Nettoyage de l'intervalle
    }, [images.length]);
    

    return(
        <>
            <div className="slider-with-banner">
                <div className="container">
                <div className="row">
                    {/* Carrousel */}
                    <div className="col-lg-12 col-md-8">
                    <div className="Patiner" style={{ position: "relative" }}>
                        <div className="div3">
                        <div>
                            <h1>{slides[currentImageIndex].title}</h1>
                            <p>{slides[currentImageIndex].desc}</p>
                            <Link to="/boutique" className="btn btn-secondary">
                                Achetez maintenant
                            </Link>
                        </div>
                        <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
                        </div>

                    </div>
                    </div>
                </div>
                </div>
            </div>

        </>
    )
}