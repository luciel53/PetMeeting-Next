"use client";

import Link from "next/link";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Offers() {
  const [catsOffers, setCatsOffers] = useState([]);

  useEffect(() => {
    fetchCatsOffers();
  }, []);

  const fetchCatsOffers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/offers/offers/get_all_offers/"
      );
      setCatsOffers(response.data.offers);
    } catch (e) {
      console.error("Error fetching cats offers", e);
    }
  };

  const [sex, setSex] = useState("");
  const [race, setRace] = useState("");
  const [eye_color, setEye_color] = useState("");
  const [blood, setBlood] = useState("");
  const [location, setLocation] = useState("");
  const [filteredOffers, setFilteredOffers] = useState("");

  useEffect(() => {
    // Filter offers according to selected criteria
    const filtered = catsOffers.filter((offer) => {
      // Checks if each criteria matches the selected criteria
      return (
        (!sex || offer.sex === sex) &&
        (!race || offer.race === race) &&
        (!eye_color || offer.eye_color === eye_color) &&
        (!blood || offer.blood === blood) &&
        (!location || offer.location === location)
      );
    });
    setFilteredOffers(filtered);
  }, [catsOffers, sex, race, eye_color, blood, location]);

  function handleSearch(criteria) {
    setSex(criteria.selectedSex);
    setRace(criteria.selectedRace);
    setEye_color(criteria.selectedEyeColor);
    setBlood(criteria.selectedBlood);
    setLocation(criteria.selectedLocation);
  }

  return (
    <>
      <Link href="/">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </Link>
      <div className="container flex flex-col mx-auto text-center mt-8">
        {/* SearchBar */}
        <SearchBar onSearch={handleSearch} />
        {/* Selection */}
        <div className="grid grid-cols-2 place-content-center md:max-w-max md:mx-auto md:grid-cols-3 lg:grid-cols-4 mt-12 mb-20 animate-fade-down">
          {/* Grid */}
          {filteredOffers.length > 0 ? (
            filteredOffers.map((catOffer, index) => (
              // {catsOffers.offers && catsOffers.offers.length > 0 && (
              //   catsOffers.offers.map((catOffer, index) => (
              <Link key={catOffer.id} href={`/Annonces/${catOffer.id}`}>
                <div
                  key={index}
                  className="vignette flex flex-col justify-center items-center text-center bg-white z-0 md:h-96 w-72 mx-auto mr-4 mt-3 pb-2 rounded-3xl shadow-xl hover:opacity-85 hover:scale-105 transition duration-500 cursor-pointer"
                >
                  <p className="text-center text-lg font-semibold mt-3">
                    {catOffer.name}
                  </p>
                  <img
                    src={"http://127.0.0.1:8000" + catOffer.picture}
                    className="z-20 h-40 md:h-3/4 w-56 my-3 object-cover mx-auto shadow-sm rounded-3xl "
                    alt={catOffer.name}
                  />
                  <p className="flex flex-row">
                    {catOffer.race}
                    {catOffer.sex === "Mâle" ? (
                      <img src="/images/icons/male.png" alt="mâle" className="pl-4" />
                    ) : (
                      <img src="/images/icons/female.png" alt="femelle" className="pl-4" />
                    )}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="mx-auto">Patience, nous cherchons votre perle rare...</p>
          )}
        </div>
      </div>
    </>
  );
}
