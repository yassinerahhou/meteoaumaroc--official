import React from "react";
import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import styles from "./Terms.module.css";
// import Header_1 from "@/app/components/Header-1";

const TermsPage: React.FC = () => {
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

          <h1 className={styles.title}>
            Conditions d'utilisation de MeteoAuMaroc
          </h1>

          <p className={styles.date}>
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <div className={styles.termsContent}>
            <p className={styles.intro}>
              Bienvenue sur MeteoAuMaroc. En accédant ou en utilisant notre site
              web, vous acceptez d'être lié par ces conditions d'utilisation.
              Veuillez les lire attentivement.
            </p>

            <Section title="1. Utilisation du Service">
              <p>
                MeteoAuMaroc fournit des prévisions météorologiques à titre
                informatif. Les données sont basées sur des informations
                recueillies auprès de diverses sources. Nous nous efforçons
                d'assurer l'exactitude de nos prévisions, mais la nature
                imprévisible du temps signifie que nous ne pouvons garantir une
                précision à 100%.
              </p>
            </Section>

            <Section title="2. Responsabilités de l'Utilisateur">
              <p>En utilisant MeteoAuMaroc, vous acceptez de :</p>
              <ul className={styles.list}>
                <li>
                  Ne pas utiliser le service d'une manière qui pourrait
                  endommager, désactiver, surcharger ou altérer le site.
                </li>
                <li>
                  Ne pas tenter d'accéder à des zones non autorisées du site.
                </li>
                <li>
                  Ne pas utiliser le service pour des activités illégales ou non
                  autorisées.
                </li>
              </ul>
            </Section>

            <Section title="3. Propriété Intellectuelle">
              <p>
                Tous les contenus présents sur le site, y compris les textes,
                images, graphiques, logos, icônes, et logiciels, sont la
                propriété de MeteoAuMaroc ou de ses partenaires et sont protégés
                par les lois en vigueur sur la propriété intellectuelle.
              </p>
            </Section>

            <Section title="4. Limitation de Responsabilité">
              <p>
                MeteoAuMaroc ne pourra être tenu responsable des dommages
                directs ou indirects résultant de l'utilisation ou de
                l'incapacité à utiliser les informations fournies sur le site.
              </p>
            </Section>

            <Section title="5. Modifications des Conditions">
              <p>
                Nous nous réservons le droit de modifier ces conditions
                d'utilisation à tout moment. Toute modification sera communiquée
                sur cette page, et votre utilisation continue du site après ces
                changements constituera une acceptation de ces nouvelles
                conditions.
              </p>
            </Section>

            <Section title="6. Liens Vers des Sites Tiers">
              <p>
                MeteoAuMaroc peut contenir des liens vers des sites externes.
                Nous ne sommes pas responsables du contenu ou des pratiques de
                ces sites tiers. Nous vous encourageons à lire leurs politiques
                de confidentialité et conditions d'utilisation.
              </p>
            </Section>

            <Section title="7. Données Personnelles">
              <p>
                En utilisant MeteoAuMaroc, vous acceptez notre politique de
                confidentialité concernant la collecte et l'utilisation de vos
                données personnelles. Nous ne partageons pas vos informations
                personnelles sans votre consentement, sauf si la loi l'exige.
              </p>
            </Section>

            <Section title="8. Droit Applicable">
              <p>
                Ces conditions d'utilisation sont régies par les lois en vigueur
                au Maroc. Tout litige relatif à l'utilisation du site sera
                soumis à la juridiction exclusive des tribunaux compétents de
                Rabat.
              </p>
            </Section>

            <Section title="9. Résiliation">
              <p>
                Nous nous réservons le droit de suspendre ou de résilier votre
                accès au site sans préavis si nous estimons que vous avez violé
                ces conditions d'utilisation.
              </p>
            </Section>

            <Section title="10. Abonnement à la Newsletter">
              <p>
                En vous inscrivant à notre newsletter, vous acceptez de recevoir
                des emails promotionnels de notre part. Vous pouvez vous
                désinscrire à tout moment en suivant les instructions incluses
                dans nos emails.
              </p>
            </Section>

            <Section title="11. Contact">
              <p>
                Pour toute question concernant ces conditions d'utilisation,
                veuillez nous contacter à{" "}
                <a
                  href="mailto:contact@meteoaumaroc.com"
                  className={styles.link}
                >
                  contact@meteoaumaroc.com
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className={styles.section}>
    <h2 className={styles.sectionTitle}>{title}</h2>
    {children}
  </div>
);

export default TermsPage;
