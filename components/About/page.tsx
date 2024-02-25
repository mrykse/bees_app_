import React from 'react';
import style from "./style_about.module.css";

const ExempleTexte: React.FC = () => {
    return (
        <>
            <img className={style.image_haut} src="/abeille_haut.svg" alt="image"/>
            <img className={style.image1} src="/apiculture_image.svg" alt="image apiculture 1"/>

            <div className={style.textContainer1}>
                <h1 className={style.titre}>A propos de nous</h1>
                <p className={style.paragraphe}>L’ACFT au service de l’apiculture</p>
                <p className={style.texte}>Ils parlent de nous !</p>
            </div>

            <img className={style.article} src="/LeParisien.png" alt="article journal"/>

            <div className={style.textContainer_source}>
                <a className={style.source}
                   href="https://www.leparisien.fr/val-de-marne-94/nayez-pas-peur-un-cueilleur-dessaims-vole-a-la-rescousse-des-abeilles-du-val-de-marne-21-05-2023-ILS4GECCPJCJ7EROGLPPQCI2PQ.php">
                    Source: https://www.leparisien.fr/val-de-marne-94/nayez-pas-peur-un-cueilleur-dessaims-vole-a-la-rescousse-des-abeilles-du-val-de-marne-21-05-2023-ILS4GECCPJCJ7EROGLPPQCI2PQ.php
                </a>
            </div>

            <img className={style.image2} src="/apiculture_image_2.svg" alt="image apiculture 2"/>

            <div className={style.textContainer2}>
                <p className={style.titre}>Notre objectif</p>
                <p className={style.paragraphe}>Élever les Abeilles, Cultiver l&apos;Harmonie</p>
                <p className={style.texte}>Nous oeuvrons pour la protection et la préservation des abeilles en ville.</p>


            </div>
        </>
    );
}

export default ExempleTexte;
