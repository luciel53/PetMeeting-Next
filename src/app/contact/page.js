"use client";

import React, { useState } from "react";
// import { useLocation } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function Contact() {
  const pathname = usePathname();
  // const location = useLocation();
  const searchParams = new URLSearchParams(pathname.search);
  const [successMessage, setSuccessMessage] = useState("");

  const initialFormData = {
    name: "" || searchParams.get("name"),
    email: "" || searchParams.get("email"),
    topic: "" || searchParams.get("topic"),
    message: "" || searchParams.get("message"),
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("formData");
    console.log(formData);
    axios
      .post("http://localhost:8000/contact/contact/", formData, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log(response.data);
        setSuccessMessage("Votre message a bien été envoyé!");
        setFormData(initialFormData);
        console.log(successMessage);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <div className="flex flex-col justify-center mx-auto md:mx-auto w-[88%] md:w-[55%] xl:w-[30%] p-5 md:p-12 mt-20 md:mt-44 lg:mt-36 lg:mb-16 bg-white rounded-3xl shadow-2xl text-sm md:text-lg animate-fade place-items-center">
        <form onSubmit={handleSubmit}>
          <h2 className="text-lg md:text-2xl text-darkdarkgray text-center pb-7">
            Contactez-nous:
          </h2>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              name="name"
              required
              placeholder="Nom*"
              value={formData.name}
              onChange={handleChange}
              className="h-12 w-60 lg:w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
            />
          </div>
          <div className="flex flex-row items-center justify-center">
            <input
              type="email"
              name="email"
              required
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              className="h-12 w-60 lg:w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
            />
          </div>
          <div className="flex flex-row items-center justify-center">
            <input
              type="text"
              name="topic"
              required
              placeholder="Sujet*"
              value={formData.topic}
              onChange={handleChange}
              className="h-12 w-60 lg:w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
            />
          </div>
          <div className="flex flex-row items-center justify-center">
            <textarea
              type="text"
              name="message"
              required
              placeholder="Message*"
              value={formData.message}
              onChange={handleChange}
              className="h-28 w-60 lg:w-96 mb-4 pt-1 pl-2 border-b border-darkgray focus:outline-none focus:border-fragole"
            />
          </div>
          <Button text="Envoyer" />
          {/* Successful message */}
          {successMessage && (
            <div className="border border-green bg-lightgreen mx-9 rounded-lg mt-10 animate-bounce">
              <p className="text-green-600 text-center text-green mt-3 mb-4">
                {successMessage}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
