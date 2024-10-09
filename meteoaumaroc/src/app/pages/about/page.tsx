import React from "react";
import styles from "./policy.module.css";
import { Cloud, Droplets, Sun, Wind } from "lucide-react";
// import Header_1 from "@/app/components/Header-1";

const AboutPage = () => {
  return (
    <>
      {/* <Header_1 /> */}
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <Sun className={styles.icon} size={32} />
            <Cloud className={styles.icon} size={32} />
            <Droplets className={styles.icon} size={32} />
            <Wind className={styles.icon} size={32} />
          </div>

          <h1 className={styles.title}>À propos de Nous</h1>

          <p className={styles.date}>Mis à jour le 1 octobre 2024</p>

          <div className={styles.termsContent}>
            <p className={styles.intro}>
              Bienvenue sur <strong>MeteoAuMaroc.com</strong>, votre source de
              confiance pour obtenir des prévisions météo précises et mises à
              jour en temps réel pour le Maroc et au-delà. Nous sommes dédiés à
              fournir des informations météorologiques fiables, faciles à
              comprendre et accessibles à tous. Que vous soyez un voyageur, un
              professionnel ou tout simplement curieux de connaître la météo,
              notre site vous aide à planifier vos activités en toute sérénité.
            </p>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Notre Mission</h2>
              <p>
                Chez <strong>MeteoAuMaroc.com</strong>, notre mission est de
                vous offrir une vision claire et précise des conditions
                météorologiques actuelles et futures, non seulement pour le
                Maroc, mais aussi pour les grandes villes à travers le monde.
                Nous croyons que l'information météorologique doit être simple,
                utile et à jour, pour améliorer votre quotidien, quel que soit
                l'endroit où vous vous trouvez.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Ce Que Nous Offrons</h2>
              <ul className={styles.list}>
                <li>
                  Des prévisions météo précises pour le Maroc et le monde entier
                </li>
                <li>
                  Des alertes météorologiques en temps réel pour des conditions
                  extrêmes
                </li>
                <li>
                  Des graphiques interactifs pour suivre les tendances
                  climatiques
                </li>
                <li>
                  Un blog régulièrement mis à jour avec des articles sur la
                  météo et l'environnement
                </li>
                <li>
                  Une interface intuitive et facile à utiliser pour tous les
                  utilisateurs
                </li>
              </ul>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Notre Équipe</h2>
              <p>
                <strong>MeteoAuMaroc.com</strong> est animé par une équipe
                passionnée de météorologues, de développeurs web et de
                professionnels de la communication. Nous mettons à profit nos
                compétences pour vous fournir des données météorologiques
                exactes et pertinentes, tout en veillant à l'accessibilité et à
                la fluidité de notre plateforme. Chaque membre de notre équipe
                contribue avec passion à vous offrir une expérience utilisateur
                optimale.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Pourquoi Nous Choisir ?</h2>
              <p>
                Nous savons qu'il existe de nombreuses sources d'information
                météo. Ce qui nous distingue, c'est notre engagement envers la
                précision, la simplicité et la personnalisation. Nos prévisions
                sont basées sur les dernières technologies de modélisation
                climatique, et notre équipe travaille sans relâche pour
                s'assurer que vous obteniez les informations les plus récentes.
                De plus, nous adaptons notre contenu en fonction de vos
                préférences pour vous offrir une expérience sur mesure.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Contactez-Nous</h2>
              <p>
                Vous avez des questions, des suggestions ou souhaitez en savoir
                plus sur nos services ? N'hésitez pas à{" "}
                <a href="/pages/contact" className={styles.link}>
                  nous contacter
                </a>
                . Nous sommes toujours ouverts à vos retours et nous engageons à
                répondre à toutes vos demandes dans les meilleurs délais.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
