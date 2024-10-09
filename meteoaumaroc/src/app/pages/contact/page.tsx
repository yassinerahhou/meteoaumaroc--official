"use client";
import { useEffect, useState, ChangeEvent, FormEvent, useRef } from "react";
import emailjs from "emailjs-com";
import "./style.css";
// import Header_1 from "@/app/components/Header-1";
import Image from "next/image";

export default function Contact() {
  useEffect(() => {
    scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [statusMessage, setStatusMessage] = useState("");
  const form = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_cj7bnkn", // Replace with your actual EmailJS service ID
        "template_277u68a", // Replace with your EmailJS template ID
        form.current!,
        "Eit3Bgxn7uRPpVnHh" // Replace with your actual EmailJS user ID
      )
      .then(
        () => {
          setStatusMessage("SUCCÈS !");
          console.log("SUCCÈS !");

          setTimeout(() => {
            setStatusMessage("");
          }, 5000);
        },
        (error) => {
          setStatusMessage(`ÉCHEC... ${error.text}`);
          console.log("ÉCHEC...", error.text);

          setTimeout(() => {
            setStatusMessage("");
          }, 5000);
        }
      );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
    sendEmail(e);
  };

  return (
    <>
      {/* <Header_1 /> */}
      <div className="contact-container">
        {statusMessage && <div className="statusMessage">{statusMessage}</div>}
        <div className="contact-header">
          <h1>Contactez-nous</h1>
          <p>
            Nous aimerions avoir de vos nouvelles. Envoyez-nous un message !
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-form">
            <br />
            <br />
            <br />
            <br />
            <form onSubmit={handleSubmit} ref={form}>
              <div className="form-group">
                <label htmlFor="name">Nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn">
                Envoyer le message
              </button>
            </form>
          </div>
          <div className="contact-info">
            <h2>Contactez-nous</h2>
            <p>
              N'hésitez pas à nous contacter en utilisant les informations
              suivantes :
            </p>
            <ul>
              <li>
                <strong>Email :</strong> contact@meteoaumaroc.com
              </li>
              <li>
                <strong>Téléphone :</strong> +212 688 967610
              </li>
              <li>
                <strong>Adresse :</strong> 1123 Rue de Casablanca, Casablanca,
                Maroc
              </li>
            </ul>
            <Image
              src="/assets/img/contact.jpeg"
              alt="Meteo au maroc Logo"
              width={500}
              height={200}
              priority
            />
          </div>
        </div>
      </div>
    </>
  );
}
