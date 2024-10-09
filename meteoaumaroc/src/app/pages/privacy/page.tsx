import React from "react";
import { Cloud, Droplets, Sun, Wind } from "lucide-react";
import styles from "./privacy.module.css";
// import Header_1 from "@/app/components/Header-1";

const PrivacyPolicyPage: React.FC = () => {
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

          <h1 className={styles.title}>Politique de Confidentialité</h1>

          <p className={styles.date}>
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR")}
          </p>

          <div className={styles.termsContent}>
            <p className={styles.intro}>
              Chez MeteoAuMaroc, accessible à partir de{" "}
              <a href="https://www.meteoaumaroc.com" className={styles.link}>
                https://www.meteoaumaroc.com
              </a>
              , la confidentialité de nos visiteurs est une priorité. Ce
              document explique les types d'informations que nous recueillons et
              comment nous les utilisons.
            </p>

            <Section title="1. Consentement">
              <p>
                En utilisant notre site web, vous acceptez notre politique de
                confidentialité et acceptez ses termes.
              </p>
            </Section>

            <Section title="2. Informations collectées">
              <p>
                Les informations personnelles que nous vous demandons de fournir
                vous seront clairement expliquées au moment où nous vous les
                demandons.
              </p>
              <p>
                Si vous nous contactez directement, nous pouvons recevoir des
                informations supplémentaires telles que votre nom, adresse
                e-mail, numéro de téléphone, contenu du message et/ou pièces
                jointes que vous nous envoyez.
              </p>
              <p>
                Lors de l'inscription à un compte, il se peut que nous vous
                demandions des informations de contact, telles que votre nom,
                adresse, e-mail, et numéro de téléphone.
              </p>
            </Section>

            <Section title="3. Utilisation des informations">
              <p>Nous utilisons les informations que nous collectons pour :</p>
              <ul className={styles.list}>
                <li>Maintenir et exploiter notre site web</li>
                <li>Améliorer et personnaliser notre site web</li>
                <li>Comprendre comment vous utilisez notre site</li>
                <li>Développer de nouveaux services et fonctionnalités</li>
                <li>
                  Communiquer avec vous pour fournir des mises à jour, offres
                  promotionnelles, ou des services clients
                </li>
                <li>Prévenir la fraude</li>
              </ul>
            </Section>

            <Section title="4. Fichiers journaux">
              <p>
                MeteoAuMaroc suit une procédure standard d'utilisation de
                fichiers journaux. Ces fichiers enregistrent les visiteurs lors
                de leur visite. Les informations recueillies comprennent les
                adresses IP, le type de navigateur, le fournisseur d'accès
                Internet (FAI), les pages de référence/de sortie et le nombre de
                clics. Ces données ne sont pas liées à des informations
                personnelles identifiables.
              </p>
            </Section>

            <Section title="5. Cookies">
              <p>
                Comme tout autre site web, MeteoAuMaroc utilise des cookies pour
                stocker des informations concernant les préférences des
                visiteurs et les pages consultées. Ces informations sont
                utilisées pour améliorer l'expérience utilisateur.
              </p>
            </Section>

            <Section title="6. Partenaires Publicitaires">
              <p>
                Google est l'un des partenaires tiers sur notre site, qui peut
                utiliser des cookies, appelés cookies DART, pour diffuser des
                annonces basées sur vos visites sur notre site et d'autres
                sites.
              </p>
              <p>
                Vous pouvez désactiver les cookies DART en visitant la{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  className={styles.link}
                >
                  politique de confidentialité du réseau de contenu et
                  d'annonces Google
                </a>
                .
              </p>
            </Section>

            <Section title="7. Droits de Protection des Données (GDPR)">
              <p>
                Vous avez certains droits en matière de protection des données,
                y compris :
              </p>
              <ul className={styles.list}>
                <li>Le droit d'accès aux données personnelles</li>
                <li>Le droit de rectification des données incorrectes</li>
                <li>Le droit à l'effacement des données</li>
                <li>Le droit de limiter le traitement des données</li>
                <li>Le droit à la portabilité des données</li>
              </ul>
              <p>
                Pour exercer l'un de ces droits, veuillez nous contacter à{" "}
                <a
                  href="mailto:contact@meteoaumaroc.com"
                  className={styles.link}
                >
                  contact@meteoaumaroc.com
                </a>
                .
              </p>
            </Section>

            <Section title="8. Protection des Enfants">
              <p>
                Nous ne recueillons pas sciemment des informations personnelles
                identifiables auprès d'enfants de moins de 13 ans. Si vous
                pensez que votre enfant nous a fourni de telles informations,
                veuillez nous contacter immédiatement pour que nous puissions
                les retirer.
              </p>
            </Section>

            <Section title="9. Modifications">
              <p>
                Cette politique de confidentialité peut être modifiée à tout
                moment. Veuillez consulter cette page régulièrement pour rester
                informé des changements.
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

export default PrivacyPolicyPage;
