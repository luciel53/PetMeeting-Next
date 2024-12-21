"use client";
// import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [offers, setOffers] = useState([]);

  // useEffect(() => {
  //   const fetchOffers = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://127.0.0.1:8000/offers/offers/get_all_offers/"
  //       );
  //       setOffers(response.data.offers);
  //       console.log("OFFERS:", offers);
  //     } catch (error) {
  //       console.error("Erreur lors de la récupération des offres :", error);
  //     }
  //   };

  //   fetchOffers();
  // }, []);

  return (
    <section className="container flex flex-col min-h-screen lg:w-full mx-auto mb-0">
      <div className="container flex flex-col mt-20 lg:w-[96rem] mx-auto">
        {/* Welcome Accueil */}
        <article className="flex flex-wrap md:flex-row justify-between lg: items-center lg:mx-8">
          {/* Lima picture */}
          <div className="md:w-[20%]  animate-fade-right animate-duration-[800ms] animate-ease-linear">
            <img
              src="/images/chat-bengal.png"
              className="w-28 md:w-[100%] lg:w-[100%]"
              alt="chat de race bengal"
            />
          </div>
          {/* Welcome bubble */}
          <div className="w-64 md:w-[50%] mx-auto md:mr-8 lg:mr-0 h-[60%] mt-0 md:mt-4 lg:mt-16 p-4 md:p-4 lg:p-4 bg-white shadow-lg rounded-3xl md:rounded-lg lg:rounded-xl xl:rounded-full text-center animate-fade-down animate-duration-[800ms] animate-delay-500 animate-ease-linear">
            {/* <div className="relative hidden lg:block lg:left-7 lg:top-52 lg:w-6 lg:h-5 bg-white shadow-sm"></div> */}
            <h1 className="mt-0 mb-4 text-md md:text-md lg:text-3xl text-purple">
              Bienvenue sur PetMeeting!
            </h1>
            <p className="text-sm md:text-xs lg:text-lg italic px-0 md:px-2 lg:px-6">
              "Cet outil est à disposition des éleveurs de chats pour les aider
              dans leur travail de sélection, en facilitant la mise en relation
              entre les éleveurs sérieux et passionnés. PetMeeting permet de
              trouver facilement une saillie extérieure de qualité proche de
              chez soi. Pour reproducteurs LOOF, sélectionnés, testés, vaccinés,
              etc..."
            </p>
          </div>
          {/* BG de la semaine */}
          <div className="container flex flex-col bg-cover w-60 md:w-[25%] h-auto lg:h-[320px] mt-4 md:mt-4 lg:mt-8 lg:mr-0 border-2 shadow-2xl rounded-3xl mx-auto animate-fade-left animate-duration-[800ms] animate-ease-linear">
            <div className="bg-yellow z-10 relative p-2 text-center font-semibold transform rounded-g-3xl rounded-t-3xl">
              Le BG de la semaine
            </div>
            <img
              src="images/bg.png"
              className="z-0 max-h-[196px] lg:max-h-[276px] max-w-[196px] lg:max-width-[316px] justify-center mx-auto"
              alt="Le beau chat de la semaine"
            />
          </div>
        </article>
        {/* Carousel */}
        {/* <section className='mt-10 mb-10 lg:mt-0'>
    <div><Carousel offers={offers} /></div>
  </section> */}
      </div>
    </section>
  );
}
