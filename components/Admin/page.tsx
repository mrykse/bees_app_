import React from 'react';
import style from "./style_home.module.css";
const ExempleTexte: React.FC = () => {
    return (
        <div>
            <img className={style.image_haut} src="/abeille_haut.svg" alt="image"/>
            <h1 className={style.titre}>Cartographions la Nature, Partageons ses Trésors!</h1>
            <img className= {style.line} src="/line.svg" alt = "image esthétique"/>
            <p className={style.paragraphe}>Découvrez et partagez les emplacements d'essaims, de ruches et les joyaux naturels de votre jardin. Rejoignez une communauté passionnée de biodiversité ! 🌿🐝</p>
            <img className= {style.image} src="/image_page_home.svg" alt="image"/>
        </div>
    );
}

export default ExempleTexte;
