import React from "react";
import "../globals.css";
import Image from "next/image";
import image1 from "../../assets/img/Agadir.jpg";
import image2 from "../../assets/img/Rabat.jpg";
import image3 from "../../assets/img/Casablanca.jpg";

export default function HOME_DESCREPTION() {
  return (
    <>
      <section className="descreption-parent">
        <div className="parte1">
          <div className="descreption-paragraphes">
            <h2>
              MeteoAuMaroc.com – Votre Source pour des Prévisions Météo Précises
              au Maroc
            </h2>
            <p>
              Sur <strong>MeteoAuMaroc.com</strong>, nous vous offrons des{" "}
              <strong>mises à jour météo en temps réel</strong> pour toutes les
              villes du Maroc. Que vous vérifiiez la météo du jour ou que vous
              planifiiez pour les prochains jours, nos données précises vous
              permettent de rester informé. Notre{" "}
              <strong>service de prévisions météorologiques</strong> repose sur
              des technologies avancées, avec des mises à jour toutes les
              quelques minutes pour vous fournir les informations les plus
              exactes.
            </p>
          </div>

          <div className="descreption-paragraphes">
            <h3>Prévisions Météo au Maroc</h3>
            <p>
              En utilisant <strong>MeteoAuMaroc.com</strong>, vous pouvez
              consulter la <strong>météo actuelle</strong> et obtenir des{" "}
              <strong>prévisions météo détaillées sur 14 jours</strong> pour
              n’importe quelle ville ou région du Maroc, y compris des
              destinations populaires comme{" "}
              <strong>Marrakech, Casablanca, Rabat et Fès</strong>. Notre
              plateforme permet un accès facile aux températures moyennes, aux
              précipitations et aux conditions météorologiques pour chaque
              ville.
            </p>
          </div>

          <div className="descreption-paragraphes">
            <h3>Planifiez Vos Voyages en Toute Confiance</h3>
            <p>
              Si vous envisagez de voyager au Maroc,{" "}
              <strong>MeteoAuMaroc.com</strong> vous fournit toutes les
              informations météorologiques nécessaires pour vous préparer. Nous
              proposons des rapports météo détaillés pour les{" "}
              <strong>destinations touristiques</strong>, y compris les villes
              côtières comme <strong>Agadir</strong> et les magnifiques
              montagnes de l'Atlas. Connaître les prévisions vous aide à faire
              vos valises intelligemment et à rester en sécurité.
            </p>
          </div>

          <div className="descreption-paragraphes">
            <h3>Restez Informé sur le Climat du Maroc</h3>
            <p>
              Pour ceux qui s'intéressent aux données climatiques à long terme,{" "}
              <strong>MeteoAuMaroc.com</strong> offre également des informations
              sur les températures moyennes et les conditions météorologiques
              mois par mois. Vous pouvez utiliser ces informations pour
              découvrir les meilleures périodes de l'année pour visiter les
              différentes régions du Maroc, que vous recherchiez des journées
              ensoleillées à la plage ou des escapades fraîches en montagne.
            </p>
          </div>

          <div className="descreption-paragraphes">
            <h3>Votre Source Fiable pour la Météo au Maroc</h3>
            <p>
              Nous espérons que vous apprécierez l'utilisation de{" "}
              <strong>MeteoAuMaroc.com</strong> pour tous vos besoins
              météorologiques. N'oubliez pas de revenir consulter les dernières{" "}
              <strong>prévisions météo au Maroc</strong> et nos recommandations
              de voyage. Bon voyage !
            </p>
          </div>
        </div>

        <div className="parte_2">
          <div className="descreption-pictures">
            <Image
              src={image1}
              alt="Météo à Agadir, Maroc"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="descreption-pictures">
            <Image
              src={image2}
              alt="Météo à Rabat, Maroc"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="descreption-pictures">
            <Image
              src={image3}
              alt="Météo à Casablanca, Maroc"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
