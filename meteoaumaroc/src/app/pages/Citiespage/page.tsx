import React from "react";
import styles from "./cities.module.css";
import Link from "next/link"; // Import Next.js Link component

const CitiesPage = () => {
  // List of popular cities in Morocco
  const cities = [
    { name: "Agadir", url: "/cities/agadir" },
    { name: "Casablanca", url: "/cities/casablanca" },
    { name: "Marrakech", url: "/cities/marrakech" },
    { name: "Fès", url: "/cities/fes" },
    { name: "Rabat", url: "/cities/rabat" },
    { name: "Tanger", url: "/cities/tanger" },
    { name: "Oujda", url: "/cities/Oujda" },
    { name: "Kénitra", url: "/cities/Kénitra" },
    { name: "Fés", url: "/cities/Fés" },
    { name: "Dakhla", url: "/cities/Dakhla" },
    { name: "Inezgane", url: "/cities/Inezgane" },
    { name: "Sefrou", url: "/cities/Sefrou" },
  ];

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Villes au Maroc</h1>
        <p className={styles.subtitle}>
          Découvrez la météo des principales villes du Maroc
        </p>

        <ul className={styles.cityList}>
          {cities.map((city) => (
            <li key={city.name} className={styles.cityItem}>
              {/* Use Link without the additional <a> tag */}
              <Link href={city.url} className={styles.cityLink}>
                {city.name}
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.moreLocations}>
          {/* Correct usage of Link */}
          <Link href="/cities" className={styles.moreLink}>
            Voir plus d'endroits
          </Link>
        </div>
        <br />
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default CitiesPage;
