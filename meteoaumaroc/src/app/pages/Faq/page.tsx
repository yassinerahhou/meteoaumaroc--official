import React from "react";
import styles from "./faq.module.css"; // Assuming you have a CSS module for styling
import { HelpCircle, Cloud, Droplets, Sun, Wind } from "lucide-react"; // Import an alternative icon
import Header_1 from "@/app/components/Header-1";

const FAQPage = () => {
  return (
    <>
      <Header_1 />
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.iconContainer}>
            <HelpCircle className={styles.icon} size={32} />{" "}
            {/* Use HelpCircle instead */}
            <Sun className={styles.icon} size={32} />
            <Cloud className={styles.icon} size={32} />
            <Droplets className={styles.icon} size={32} />
            <Wind className={styles.icon} size={32} />
          </div>

          <h1 className={styles.title}>Foire aux Questions (FAQ)</h1>

          <div className={styles.faqContent}>
            {/* FAQ Section */}
            <div className={styles.section}>
              <h2 className={styles.question}>
                Qu'est-ce que MeteoAuMaroc.com?
              </h2>
              <p>
                <strong>MeteoAuMaroc.com</strong> est une plateforme dédiée à
                fournir des prévisions météorologiques précises et en temps réel
                pour le Maroc et d'autres régions du monde.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Comment puis-je utiliser votre site?
              </h2>
              <p>
                Vous pouvez consulter les prévisions météo, recevoir des alertes
                et explorer notre blog pour des informations et des conseils
                météorologiques.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Les prévisions sont-elles fiables?
              </h2>
              <p>
                Oui, nous utilisons les dernières technologies de modélisation
                climatique pour vous fournir des prévisions précises et à jour.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Comment puis-je vous contacter?
              </h2>
              <p>
                Vous pouvez nous contacter via notre page de contact pour toute
                question ou suggestion.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Quels types de données météorologiques offrez-vous?
              </h2>
              <p>
                Nous offrons des prévisions de température, des prévisions de
                précipitations, des alertes météorologiques, des tendances
                climatiques, et plus encore.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Puis-je recevoir des alertes météo par email?
              </h2>
              <p>
                Oui, vous pouvez vous inscrire à notre newsletter pour recevoir
                des alertes météo directement dans votre boîte de réception.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Votre site propose-t-il des informations sur le climat?
              </h2>
              <p>
                Oui, notre blog contient des articles et des ressources sur le
                climat, les tendances météorologiques et d'autres sujets liés à
                l'environnement.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Comment les prévisions sont-elles mises à jour?
              </h2>
              <p>
                Nos prévisions sont mises à jour régulièrement en fonction des
                nouvelles données météorologiques et des modèles climatiques.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Puis-je accéder aux prévisions météo pour d'autres pays?
              </h2>
              <p>
                Oui, notre site fournit également des prévisions météorologiques
                pour les grandes villes à travers le monde.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Pourquoi devrais-je choisir MeteoAuMaroc.com pour mes prévisions
                météo?
              </h2>
              <p>
                Nous nous engageons à vous fournir des informations précises,
                des alertes en temps réel et une interface facile à utiliser
                pour améliorer votre expérience météorologique.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Y a-t-il une application mobile pour MeteoAuMaroc.com?
              </h2>
              <p>
                Actuellement, notre site est optimisé pour les appareils
                mobiles, mais nous n'avons pas encore d'application dédiée.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Où puis-je trouver des conseils sur les activités
                météorologiques?
              </h2>
              <p>
                Consultez notre blog pour des articles sur les meilleures
                activités à faire selon les conditions météorologiques.
              </p>
            </div>

            <div className={styles.section}>
              <h2 className={styles.question}>
                Proposez-vous des informations historiques sur la météo?
              </h2>
              <p>
                Oui, nous avons des archives météorologiques et des données
                historiques que vous pouvez consulter pour des recherches ou des
                références.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
