"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Offer() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // useParams extracts the params of the url
  const { id } = useParams();
  console.log(id);

//   const handleImageClick = (imageUrl) => {
//     setSelectedImage(imageUrl);
//   };

//   useEffect(() => {
//     const fetchCatOffer = async () => {
//       try {
//         const response = await axios.get(
//           "http://127.0.0.1:8000/offers/offers/get_all_offers/"
//         );
//         const offers = response.data.offers;
//         const selected = offers.find((offer) => offer.id === parseInt(id));
//         setSelectedOffer(selected);
//         console.log("selected", selected);
//         setSelectedImage(selected.picture);
//         handleImageClick(`http://127.0.0.1:8000${selected.picture}`);

//         const ownerResponse = await axios.get(
//           `http://127.0.0.1:8000/users/${selected.user_id}`
//         );
//         console.log("responce", ownerResponse);

//         const ProfileResponse = await axios.get(
//           `http://localhost:8000/users/profile/`
//         );

//         const profiles = ProfileResponse.data;
//         // filter the users by id
//         const selectedProfile = profiles.filter(
//           (profile) => profile.user === parseInt(selected.user_id)
//         );
//         console.log("Réponce", selectedProfile);
//         setAvatar(selectedProfile[0].avatar);
//       } catch (e) {
//         console.error("Error fetching cats offers", e);
//       }
//     };
//     fetchCatOffer();
//   }, [id, avatar]);

//   if (!selectedOffer) {
//     return null;
//   }

  return (
    <>
      <Link href="/offers">
        <div className="ml-20 mt-28 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour aux annonces
        </div>
      </Link>
      <section className="mx-auto">
        <div className="container flex flex-row col-end-4 mt-6 mb-32">
          {/* Owner */}
          <div className="container flex flex-col w-[250px] h-[263px] mr-6 bg-white rounded-3xl shadow-lg animate-fade-right">
            {/* <Link href={`/profile/${selectedOffer.user_id}`}>
              <p className="mx-auto mt-3 font-semibold text-lg text-center">
                {selectedOffer.user}
              </p>
            </Link> */}
            <div className="container w-[175px] h-[183px] bg-gray rounded-full mx-auto my-auto mt-2 shadow-sm z-0 overflow-hidden">
              <img
                src={avatar}
                className="max-w-[175px] m-h-[183] rounded-full"
                alt="Propriétaire"
              />
            </div>
            <div className="flex flex-row">
              {/* <div className="ml-6">
                <Link href={`/profile/${selectedOffer.user_id}`}>
                  <img src="/images/icons/profileCard.png" className="h-8" alt="profil" />
                </Link>
              </div> */}
              <div className="ml-36 z-20 pb-5">
                <img
                  src="/images/icons/profileMsg.png"
                  className="mt-1 h-6.5"
                  alt="envoyer un message"
                />
              </div>
            </div>
          </div>
          {/* Offer Details */}
          <div className="flex flex-col animate-fade-down">
            {/* Title (name), date and price */}
            <div className="container flex flex-row flex-wrap bg-white w-[500px] pl-6 pt-4 h-auto mr-6 mx-auto rounded-3xl shadow-lg">
              {/* Cat icon + title */}
              <div className="flex flex-row w-1/2 mb-5">
                <img
                  src="/images/icons/minicat.png"
                  className="w-8 h-8 pb-1"
                  alt="icone de chat"
                />
                <h3 className="text-2xl pl-2 font-semibold">
                  {/* {selectedOffer.name} */}
                </h3>
              </div>
              <div className="flex flex-col w-1/2 pl-12 pt-1">
                <div className="flex flex-row items-center">
                  <small className="">
                    {/* {moment(selectedOffer.date_posted).format(
                      "DD/MM/YYYY HH:mm"
                    )} */}
                  </small>
                  {/* <Link
                    to={`/contact?&email=&topic=Signalement d'une annonce&message=Bonjour, je souhaite signaler l'annonce n°${selectedOffer.id} - ${selectedOffer.name}, car `}
                  >
                    <img
                      src="/images/icons/warning.png"
                      className="mr-4"
                      alt="signaler l'annonce"
                    />
                  </Link> */}
                </div>
                {/* Price */}

                {/* <strong className="text-2xl">
                  {selectedOffer.sex === "Mâle"
                    ? selectedOffer.price + " €"
                    : null}
                </strong> */}
              </div>

              {/* Details */}
              <div className="flex flex-row pb-5">
                <div className="flex flex-col">
                  <div>
                    <table className="text-lg ml-5 leading-8">
						<tbody>
                      {/* Sex */}
                      <tr>
                        <td className="text-purple">Sexe:</td>
                        <td className="pl-7">
                          {/* {selectedOffer.sex === "Mâle" ? (
                            <img src="/images/icons/male.png" alt="mâle" />
                          ) : (
                            <img src="/images/icons/female.png" alt="femelle" />
                          )} */}
                        </td>
                      </tr>
                      {/* Race */}
                      <tr>
                        <td className="text-purple">Race:</td>
                        {/* <td className="pl-8">{selectedOffer.race}</td> */}
                      </tr>
                      {/* LOOF */}
                      <tr>
                        <td className="text-purple">LOOF:</td>
                        <td className="pl-8">Oui</td>
                      </tr>
                      {/* location */}
                      <tr>
                        <td className="text-purple">Localisation:</td>
                        {/* <td className="pl-8">{selectedOffer.location}</td> */}
                      </tr>
                      {/* bloodtype */}
                      <tr>
                        <td className="text-purple">Groupe sanguin:</td>
                        {/* <td className="pl-8">{selectedOffer.blood}</td> */}
                      </tr>
                      {/* Diseases tests */}
                      <tr>
                        <td className="text-purple">Tests maladies:</td>
                        {/* <td className="pl-8">{selectedOffer.diseases_tests}</td> */}
                      </tr>
                      {/* Vaccines */}
                      <tr>
                        <td className="text-purple">Vaccins à jour:</td>
                        <td className="pl-8">Oui</td>
                      </tr>
                      {/* identication number */}
                      <tr>
                        <td className="text-purple">N° d’identification:</td>
                        {/* <td className="pl-8">{selectedOffer.id_num}</td> */}
                      </tr>
                      {/* eye color */}
                      <tr>
                        <td className="text-purple">Couleur des yeux:</td>
                        {/* <td className="pl-8">{selectedOffer.eye_color}</td> */}
                      </tr>
                      {/* fur color */}
                      <tr>
                        <td className="text-purple">Robe:</td>
                        {/* <td className="pl-8">{selectedOffer.fur_color}</td> */}
                      </tr>
                      {/* age */}
                      <tr>
                        <td className="text-purple">Age:</td>
                        {/* <td className="pl-8">{selectedOffer.age} an(s)</td> */}
                      </tr>
                      {/* qualities */}
                      <tr>
                        <td className="text-purple">Qualités:</td>
                        <td
                          className="pl-8 pr-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          {/* {selectedOffer.qualities} */}
                        </td>
                      </tr>
                      {/* defaults */}
                      <tr>
                        <td className="text-purple">Défauts:</td>
                        <td
                          className="pl-8 pr-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          {/* {selectedOffer.flaws} */}
                        </td>
                      </tr>
                      {/* other */}
                      <tr>
                        <td className="text-purple">Autres:</td>
                        <td
                          className="pl-8 pr-5"
                          style={{ wordBreak: "break-word" }}
                        >
                          {/* {selectedOffer.free_descriptive_text} */}
                        </td>
                      </tr>
					  </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Pictures */}
          <div className="container bg-white w-[500px]  mx-auto rounded-3xl shadow-lg animate-fade-left">
            {/* Big Picture */}
            <div className="h-auto">
              {/* <img
                src={selectedImage}
                className="mt-16 mb-5 mx-auto max-w-96 max-h-[430px] shadow-lg rounded-lg"
                alt="selected"
              /> */}
            </div>
            {/* Mini pictures */}
            <div className="h-auto mt-12 mb-10">
              <div className="flex flex-row justify-center">
                {/* <img
                  src={`http://127.0.0.1:8000${selectedOffer.picture}`}
                  onClick={() =>
                    handleImageClick(
                      `http://127.0.0.1:8000${selectedOffer.picture}`
                    )
                  }
                  className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg cursor-pointer"
                  alt="image1"
                /> */}
                {/* {selectedOffer.picture2 ? (
                  <img
                    src={`http://127.0.0.1:8000${selectedOffer.picture2}`}
                    onClick={() =>
                      handleImageClick(
                        `http://127.0.0.1:8000${selectedOffer.picture2}`
                      )
                    }
                    className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg cursor-pointer"
                    alt="image1"
                  />
                ) : (
                  <img
                    src="/images/nopicture.png"
                    alt="Vide"
                    className="max-w-24 max-h-24 mr-4 rounded-lg shadow-lg"
                  />
                )} */}
                {/* {selectedOffer.picture3 ? (
                  <img
                    src={`http://127.0.0.1:8000${selectedOffer.picture3}`}
                    onClick={() =>
                      handleImageClick(
                        `http://127.0.0.1:8000${selectedOffer.picture3}`
                      )
                    }
                    className="max-w-24 max-h-24 rounded-lg shadow-lg cursor-pointer"
                    alt="image1"
                  />
                ) : (
                  <img
                    src="/images/nopicture.png"
                    alt="Vide"
                    className="max-w-24 max-h-24 rounded-lg shadow-lg"
                  />
                )} */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
