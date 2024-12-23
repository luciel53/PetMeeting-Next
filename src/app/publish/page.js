"use client";

import Link from "next/link";
import axios from "axios";
import Button from "../components/Button";
import { useState, useEffect } from "react";
// import { jwtDecode } from "jwt-decode";

export default function Publier() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loof, setLoof] = useState("");
  const [vaccins, setVaccins] = useState("");

  const initialFormData = {
    name: "",
    race: "",
    sex: "",
    price: "",
    location: "",
    blood: "",
    diseases_tests: "",
    id_num: "",
    eye_color: "",
    fur_color: "",
    age: "",
    qualities: "",
    flaws: "",
    free_descriptive_text: "",
    picture: "",
    picture2: "",
    picture3: "",
    user_id: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  const [blood, setBlood] = useState([]);
  const [races, setRaces] = useState([]);
  const [sex, setSex] = useState([]);
  const [locations, setLocations] = useState([]);
  const [eyeColor, setEyeColor] = useState([]);
  const showPrice = true;

  useEffect(() => {
    fetchSelectData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // GET the data from the backend
  const fetchSelectData = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/offers/offers/get_form_data/"
      );
      setRaces(response.data.races);
      setSex(response.data.sexe);
      setLocations(response.data.locations);
      setBlood(response.data.bloodtype);
      setEyeColor(response.data.eye_color);
    } catch (e) {
      console.error("Erreur lors de la récupération des données");
    }
  };

  // manage the images
  function handleFileChange(e) {
    const file = e.target.files[0];
    const name = e.target.name;
    if (file) {
      setFormData({ ...formData, [name]: file });
    }
  }

  // manage the error message if loof or vaccines are "No"
  useEffect(() => {
    // if loof and vaccines are true, delete the error message
    if (loof === "Non" || vaccins === "Non") {
      setShowErrorMessage(true);
    } else {
      setShowErrorMessage(false);
    }
  }, [loof, vaccins]);

  // manage the loof change event
  function handleLoofChange(e) {
    setLoof(e.target.value);
  }

  // manage the Vaccines change event
  function handleVaccinsChange(e) {
    setVaccins(e.target.value);
  }

  // POST an offer
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // Récupérer l'user_id du token JWT
    const userId = jwtDecode(localStorage.getItem("access_token")).user_id;
    setFormData((prevFormData) => ({
      ...prevFormData,
      user_id: userId,
    }));

    try {
      if (loof === "Oui" && vaccins === "Oui") {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access_token")}`;
        const response = await axios.post(
          "http://127.0.0.1:8000/offers/offers/",
          formData,
          // { refresh_token: localStorage.getItem("refresh_token") },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log(response.data);
        setFormData(initialFormData);
        setSuccessMessage("Votre annonce a bien été postée!");
      } else {
        setShowErrorMessage(true);
        setErrorMessage(
          "Ce champs est obligatoire. Nous n'acceptons que les chats LOOF et vaccinés"
        );
      }
    } catch (error) {
      console.error("Votre annonce n'a pas pu être publiée", error);
      if (error.response && error.response.status === 401) {
        setErrorMessage("Vous n'êtes pas autorisé à publier cette annonce");
      } else {
        setErrorMessage(
          "Une erreur s'est produite lors de la publication de l'annonce. Veuillez réessayer plus tard."
        );
      }
      setShowErrorMessage(true);
    }
  };

  useEffect(() => {
    // if != femelle, shows the price
    if (formData.sex === "Femelle") {
      setFormData((prevFormData) => ({ ...prevFormData, price: "0" }));
    }
  }, [formData.sex]);

  return (
    <>
      <Link href="/">
        <div className="ml-5 md:ml-20 mt-16 md:mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </Link>
      <div className="container flex flex-col min-h-screen mx-auto animate-fade ">
        <div className="container flex flex-row mx-auto mb-6">
          <img
            src="images/icons/add.png"
            className="mt-4 md:mt-0.5 z-2 w-6 h-6 ml-auto"
            alt="ajouter une annonce"
          />
          <h2 className="pl-3 mt-4 md:mt-0 mr-auto text-purple text-xl md:text-2xl">
            Ajoutez une annonce:
          </h2>
        </div>
        {/* Successful message */}
        {successMessage && (
          <div className="border border-green bg-lightgreen mx-96 rounded-lg mt-0 animate-bounce">
            <p className="text-green-600 text-center text-green mt-3 mb-4">
              {successMessage}
            </p>
          </div>
        )}
        {/* form */}
        <div className="flex flex-col md:flex-row items-center place-items-center my-auto mx-auto">
          {/* Description */}

          <form onSubmit={handleSubmit} className="mx-4 pb-4 ">
            <fieldset className="flex flex-wrap md:flew-row justify-around md:w-[90%] mx-auto">
              <div className="flex flex-col w-80 md:w-[80%] md:h-[600px] px-10 pb-4 mb-4 bg-white rounded-3xl shadow-2xl">
                {/* description title */}
                <h3 className="text-xl md:text-2xl text-center mt-3 mb-6">
                  Description 😽:{" "}
                </h3>
                {/* LOOF */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <span>LOOF*:</span>
                  <div className=" flex flex-row w-16 md:ml-20 ">
                    <input
                      type="radio"
                      id="LOOF_yes"
                      name="loof"
                      value="Oui"
                      required
                      onChange={handleLoofChange}
                    />
                    <label htmlFor="LOOF_yes" className="pl-2 ">
                      Oui
                    </label>
                  </div>
                  <div className=" flex flex-row w-16 ">
                    <input
                      type="radio"
                      id="LOOF_no"
                      name="loof"
                      value="Non"
                      onChange={handleLoofChange}
                    />
                    <label htmlFor="LOOF_no" className="pl-2 pr-9">
                      Non
                    </label>
                  </div>
                </div>

                {/* Vaccins */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <span>Vaccins à jour*:</span>
                  <div className="flex flex-row ml-3">
                    <input
                      type="radio"
                      id="vaccins_yes"
                      name="vaccins"
                      value="Oui"
                      required
                      onChange={handleVaccinsChange}
                    />
                    <label htmlFor="vaccins_yes" className="pl-2 pr-12">
                      Oui
                    </label>
                  </div>
                  <div className="flex flex-row">
                    <input
                      type="radio"
                      id="vaccins_no"
                      name="vaccins"
                      value="Non"
                      onChange={handleVaccinsChange}
                    />
                    <label htmlFor="vaccins_no" className="pl-2 pr-9">
                      Non
                    </label>
                  </div>
                </div>
                {/* Error message if loof or vaccins are not yes */}
                {formSubmitted && showErrorMessage && (
                  <div>
                    <div className="text-fragole border border-fragole bg-lightyellow rounded-lg p-2 text-center absolute mt-0 w-96 ml-4 shadow-xl">
                      Ces champs sont obligatoires. Nous n'acceptons que les
                      chats LOOF et à jour de vaccination.
                      <br />
                      (voir la réglementation)
                    </div>
                  </div>
                )}
                {/* Sex */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <span className="">Sexe*:</span>
                  <select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {sex.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* name */}
                <div className=" flex flex-row items-center justify-between mb-3 text-sm md:text-lg">
                  <label>Nom*:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                    placeholder="ex: Gollum des bois"
                    className="w-52 text-sm bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Race */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <span>Race*:</span>
                  <select
                    name="race"
                    value={formData.race}
                    required
                    onChange={handleChange}
                    className="rounded-lg  bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {races.map((option) => (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Identification number */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>N° d'identification*:</label>
                  <input
                    type="text"
                    name="id_num"
                    value={formData.id_num}
                    required
                    placeholder="ex: 250260000000000"
                    onChange={handleChange}
                    className="bg-gray w-52 text-sm border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Groupe sanguin */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <span>Groupe sanguin:</span>
                  <select
                    name="blood"
                    value={formData.blood}
                    onChange={handleChange}
                    className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {blood.map((option) => (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Disease tests */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>Tests maladies*:</label>
                  <input
                    type="text"
                    name="diseases_tests"
                    required
                    value={formData.diseases_tests}
                    onChange={handleChange}
                    placeholder="TOUS les tests effectués ici"
                    className="w-52 text-sm bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Age */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>Âge* (ans):</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    required
                    onChange={handleChange}
                    placeholder="ex: 2"
                    className="w-52 text-sm bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>

                {/* Robe */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <label>Robe:</label>
                  <input
                    type="text"
                    name="fur_color"
                    placeholder="ex: Brown à rosettes"
                    value={formData.fur_color}
                    onChange={handleChange}
                    className="w-52 text-sm bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                  />
                </div>
                {/* Location */}
                <div className="flex flex-row items-center justify-between mb-3 text-sm md:text-lg ">
                  <span>Localisation*:</span>
                  <select
                    name="location"
                    value={formData.location}
                    required
                    onChange={handleChange}
                    className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                  >
                    <option value="">Choisissez</option>
                    {locations.map((option) => (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Price */}
                {showPrice && (
                  <div className="flex flex-row items-center justify-between text-sm md:text-lg ">
                    <label>Prix*:</label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      required
                      onChange={handleChange}
                      placeholder="€"
                      disabled={formData.sex === "Femelle"}
                      className="w-52 bg-gray border border-darkgray rounded-lg h-8 ml-2 pl-2 px-1"
                    />
                  </div>
                )}
              </div>
              <div className=" flex flex-col justify-between items-center w-80 md:w-[80%] md:h-[600px] px-10 pb-4 mb-4 bg-white rounded-3xl shadow-2xl">
                {/* Pictures */}
                <div className="w-80 md:w-96 xl:w-[80%]">
                  <div className="flex flex-col justify-center mx-10 mb-3 text-sm md:text-lg">
                    <h3 className="text-2xl text-center mt-3">
                      Infos complémentaires 🔍:
                    </h3>
                    {/* Eye color */}
                    <div className="flex flex-row items-center justify-between mt-6 mb-3 text-sm md:text-lg ">
                      <span>Couleur des yeux:</span>
                      <select
                        name="eye_color"
                        value={formData.eye_color}
                        onChange={handleChange}
                        className="rounded-lg bg-gray w-52 border border-darkgray ml-2"
                      >
                        <option value="">Choisissez</option>
                        {eyeColor.map((option) => (
                          <option key={option.id} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-row justify-between mb-3">
                      <label>Qualités:</label>
                      <textarea
                        type="text"
                        name="qualities"
                        value={formData.qualities}
                        onChange={handleChange}
                        className="w-72 h-20 bg-gray border border-darkgray rounded-lg ml-2 pl-2 px-1"
                      />
                    </div>
                    <div className="flex flex-row justify-between mb-3">
                      <label>Défauts:</label>
                      <textarea
                        type="text"
                        name="flaws"
                        value={formData.flaws}
                        onChange={handleChange}
                        className="w-72 h-20 bg-gray border border-darkgray rounded-lg ml-2 pl-2 px-1"
                      />
                    </div>
                    <div className="flex flex-row justify-between mb-3">
                      <label>Autres:</label>
                      <textarea
                        type="text"
                        name="free_descriptive_text"
                        value={formData.free_descriptive_text}
                        onChange={handleChange}
                        className="w-72 h-20 bg-gray border border-darkgray rounded-lg ml-2 pl-2 px-1"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col justify-center mx-16 mb-3 text-sm md:text-lg">
                    <h3 className="text-2xl text-center mt-3 mb-2">
                      Photos 📸:{" "}
                    </h3>
                    <input
                      type="file"
                      name="picture"
                      onChange={handleFileChange}
                    />
                    <input
                      type="file"
                      name="picture2"
                      onChange={handleFileChange}
                    />
                    <input
                      type="file"
                      name="picture3"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
              </div>
            </fieldset>
            {/* Button */}
            <div className=" mb-16">
              <Button text="Publier" className="w-auto" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
