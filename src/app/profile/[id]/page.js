"use client";

import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import Image from "next/image";
// import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function Profile() {
  const { id } = useParams();
  // const { id } = router.query;
  const [profile, setProfile] = useState(null);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [isEditLocation, setIsEditLocation] = useState(false);
  const [isEditBirthdate, setIsEditBirthdate] = useState(false);
  const [isEditBio, setIsEditBio] = useState(false);
  const [isEditWebsite, setIsEditWebsite] = useState(false);
  const [isEditFacebook, setIsEditFacebook] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userBirthdate, setUserBirthdate] = useState("");
  const [userWebsite, setUserWebsite] = useState("");
  const [userFacebook, setUserFacebook] = useState("");
  const [changedMail, setChangedMail] = useState("");
  const [changedLocation, setChangedLocation] = useState("");
  const [changedBirthdate, setChangedBirthdate] = useState("");
  const [changedBio, setChangedBio] = useState("");
  const [changedWebsite, setChangedWebsite] = useState("");
  const [changedFacebook, setChangedFacebook] = useState("");
  const [changedAvatar, setChangedAvatar] = useState(null);
  const [userNotFound, setUserNotFound] = useState(false);
  const [catsOffers, setCatsOffers] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [connectedUser, setconnectedUser] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
      const token = localStorage.getItem("access_token");
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
        // fetchUsernameByUserId(decodedToken.user_id);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  // const fetchUsernameByUserId = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:8000/users/profile/${userId}/`
  //     );
  //     console.log("USER:::::", response.data);
  //     setUsername(response.data.username);
  //   } catch (error) {
  //     console.log("Error fetching username", error);
  //   }
  // };

  // to show the garbage icon if user is logged and owner
  useEffect(() => {
    if (profile && userId && profile.user === parseInt(userId)) {
      setconnectedUser(true);
      setIsOwner(true);
    } else {
      setconnectedUser(false);
      setIsOwner(false);
    }
  }, [profile, userId]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // define the token access in header of each axios request
        // const accessToken = localStorage.getItem('access_token');
        // const headers = { Authorization: `Bearer ${accessToken}` };
        // get all the profiles
        const response = await axios.get(
          `http://localhost:8000/users/profile/`
        );
        // get the user by id
        const responseUser = await axios.get(
          `http://localhost:8000/users/${id}/`
        );
        // get the offers by id user
        // const responseOffersByUser = await axios.get(
        //   `http://localhost:8000/offers/offers_by_user/${id}/`
        // );

        // //authorize access with token
        // axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("access_token")}`;

        // store the profiles data in a variable
        const profiles = response.data;
        // store the offers data of the user in a variable
        // const OffersByUser = responseOffersByUser.data;
        // console.log(responseUser.data);
        // console.log(OffersByUser);
        // set the email address of the user
        setUserEmail(responseUser.data.email);

        // set the offers by user
        // setCatsOffers(OffersByUser);
        console.log(profiles);
        console.log(userEmail);
        // filter the users by id
        const selectedProfile = profiles.filter(
          (profile) => profile.user === parseInt(id)
        );

        if (selectedProfile.length > 0) {
          setProfile(selectedProfile[0]);
        } else {
          setUserNotFound(true);
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
        setUserNotFound(true);
      }
    };
    fetchProfile();
  }, [id, userEmail]);

  if (userNotFound) {
    return <div>L'utilisateur n'a pas été trouvé.</div>;
  }

  if (!profile) {
    return null;
  }

  console.log("owner's id: ", profile);
  console.log("userId ::::::", userId);

  // Refresh token function
  const refreshToken = async () => {
    try {
      const VARrefreshToken = localStorage.getItem("refresh_token");
      console.log("refreshtokkennn:", VARrefreshToken);
      if (!VARrefreshToken) {
        console.log(
          "Aucun refresh token trouvé, l'utilisateur doit se reconnecter."
        );
        // Rediriger vers la page de connexion
        window.location.href = "/login";
        return;
      }
      const response = await axios.post(
        "http://localhost:8000/auth/token/refresh/",
        { refresh: VARrefreshToken }
      );
      console.log("responseeee:", response);
      const newAccessToken = response.data.access;
      console.log("nouveau access token: ", newAccessToken);
      // Stocker le nouveau jeton d'accès dans le stockage local
      localStorage.setItem("access_token", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Error refreshing token: ", error);
      throw error; // Propager l'erreur pour la gestion ultérieure
    }
  };

  // const handleDelete = async (offerId) => {
  //   let newAccessToken;
  //   try {
  //     const token = localStorage.getItem("access_token");
  //     const response = await axios.delete(
  //       `http://localhost:8000/offers/offers/${offerId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Inclure le jeton JWT dans l'en-tête Authorization
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: true,
  //       }
  //     );
  //     // update offers list after delete
  //     setCatsOffers(catsOffers.filter((offer) => offer.id !== offerId));
  //   } catch (error) {
  //     // check if error is because of an invalid or expired token
  //     if (error.response && error.response.status === 401) {
  //       // refresh token
  //       try {
  //         newAccessToken = await refreshToken();
  //         // retry request with new access token
  //         const response = await axios.delete(
  //           `http://localhost:8000/offers/offers/${offerId}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${newAccessToken}`, // Inclure le jeton JWT dans l'en-tête Authorization
  //               "Content-Type": "application/json",
  //             },
  //             withCredentials: true,
  //           }
  //         );
  //         // update offers list after delete
  //         setCatsOffers(catsOffers.filter((offer) => offer.id !== offerId));
  //       } catch (refreshError) {
  //         console.error("Error deleting offers: ", refreshError);
  //       }
  //     } else {
  //       console.error("Error deleting offer: ", error);
  //     }
  //   }
  // };

  // const handleSaveEmail = async () => {
  //   try {
  //     const accessToken = localStorage.getItem("access_token");
  //     const response = await axios.put(
  //       "http://localhost:8000/users/profile/update/",
  //       {
  //         email: changedMail,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     console.log("Email update response: ", response.data);
  //     if (response.status === 200) {
  //       setIsEditEmail(false);
  //       setUserEmail(changedMail);
  //     }
  //   } catch (error) {
  //     console.error("Error saving email", error);
  //   }
  // };

  const handleSaveBirthdate = async () => {
    try {
      console.log("quelle date?????", changedBirthdate);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          birthdate: changedBirthdate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditBirthdate(false);
        setUserBirthdate(changedBirthdate);
        setProfile((prevProfile) => ({
          ...prevProfile,
          birthdate: changedBirthdate,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Le token est expiré, on tente de rafraîchir le token
        console.log("Token expired, refreshing...");

        const pouet = refreshToken();
        console.log("Refreshing token:", pouet);

        if (!refreshToken) {
          console.log("No refresh token available.");
          return;
        }
      }
      // console.error("Error saving location", error);
    }
  };

  const handleSaveLocation = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log("TOKEN:::", accessToken);
      let response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          location: changedLocation,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditLocation(false);
        setUserLocation(changedLocation);
        setProfile((prevProfile) => ({
          ...prevProfile,
          location: changedLocation,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Le token est expiré, on tente de rafraîchir le token
        console.log("Token expired, refreshing...");

        const pouet = refreshToken();
        console.log("Refreshing token:", pouet);

        if (!refreshToken) {
          console.log("No refresh token available.");
          return;
        }
      }
      // console.error("Error saving location", error);
    }
  };

  const handleSaveBio = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      console.log("TOKEN:::", accessToken);
      let response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          bio: changedBio,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditBio(false);
        setUserBio(changedBio);
        setProfile((prevProfile) => ({
          ...prevProfile,
          bio: changedBio,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Le token est expiré, on tente de rafraîchir le token
        console.log("Token expired, refreshing...");

        const pouet = refreshToken();
        console.log("Refreshing token:", pouet);

        if (!refreshToken) {
          console.log("No refresh token available.");
          return;
        }
      }
      // console.error("Error saving location", error);
    }
  };

  const handleSaveWebsite = async () => {
    try {
      console.log("quel site?????", changedWebsite);
      const accessToken = localStorage.getItem("access_token");
      console.log(accessToken);
      let response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          external_link: changedWebsite,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditWebsite(false);
        setUserWebsite(changedWebsite);
        setProfile((prevProfile) => ({
          ...prevProfile,
          external_link: changedWebsite,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Le token est expiré, on tente de rafraîchir le token
        console.log("Token expired, refreshing...");

        const pouet = refreshToken();
        console.log("Refreshing token:", pouet);

        if (!refreshToken) {
          console.log("No refresh token available.");
          return;
        }
      }
      // console.error("Error saving location", error);
    }
  };

  const handleSaveFacebook = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          facebook_link: changedFacebook,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setIsEditFacebook(false);
        setUserFacebook(changedFacebook);
        setProfile((prevProfile) => ({
          ...prevProfile,
          facebook_link: changedFacebook,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Le token est expiré, on tente de rafraîchir le token
        console.log("Token expired, refreshing...");

        const pouet = refreshToken();
        console.log("Refreshing token:", pouet);

        if (!refreshToken) {
          console.log("No refresh token available.");
          return;
        }
      }
      // console.error("Error saving location", error);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      console.log(changedAvatar);
      const accessToken = localStorage.getItem("access_token");
      const response = await axios.put(
        "http://localhost:8000/users/profile/update/",
        {
          avatar: changedAvatar,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Avatar update response: ", response.data);
      if (response.status === 200) {
        setIsEditAvatar(false);
        setProfile((prevProfile) => ({
          ...prevProfile,
          avatar: changedAvatar,
        }));
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Le token est expiré, on tente de rafraîchir le token
        console.log("Token expired, refreshing...");

        const pouet = refreshToken();
        console.log("Refreshing token:", pouet);

        if (!refreshToken) {
          console.log("No refresh token available.");
          return;
        }
      }
      // console.error("Error saving location", error);
    }
  };

  // console.log("offers:::", catsOffers);

  return (
    <>
      <Link href="/">
        <div className="ml-20 mt-28 mb-4 flex flex-row text-verydarkgray hover:opacity-80">
          &larr; Retour à l'accueil
        </div>
      </Link>
      <div className="container flex flex-col h-auto mt-auto mx-auto ml-72 animate-fade">
        <div className="container flex flex-row mb-6">
          {/* Informations */}
          <div className="container w-[988px] h-auto flex flex-col bg-white rounded-3xl shadow-lg mr-5">
            {/* informations title */}
            <h3 className="mx-auto my-4 text-2xl">
              {connectedUser ? "Mes informations" : "Informations"}
            </h3>
            <div className="flex flex-row w-[988px] mx-24">
              <div className="flex flex-col w-96">
                {/* email */}
                <div className="flex flex-row justify-between mx-10 w-[90%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <Image
                      src="/images/icons/arobase.png"
                      className="mr-6"
                      width={28}
                      height={28}
                      alt="adresse mail"
                    />
                    {profile ? (
                      <>
                        {isEditEmail ? (
                          <input
                            type="email"
                            value={changedMail}
                            onChange={(e) => setChangedMail(e.target.value)}
                            placeholder="Entrez votre adresse mail"
                            className="w-60 hover:cursor-pointer"
                          />
                        ) : (
                          <span>{userEmail}</span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditEmail ? (
                    <Image
                      src="/images/icons/change.png"
                      alt="modifier"
                      width={28}
                      height={28}
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditEmail(!isEditEmail)}
                    />
                  ) : (
                    isOwner && (
                      <Image
                        src="/images/icons/save.png"
                        alt="sauvegarder"
                        width={28}
                        height={28}
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveEmail}
                      />
                    )
                  )}
                </div>
                {/* location */}
                <div className="flex flex-row justify-between mx-10 w-[90%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <Image
                      src="/images/icons/location.png"
                      className="mr-6"
                      width={28}
                      height={28}
                      alt="adresse mail"
                    />
                    {profile ? (
                      <>
                        {isEditLocation ? (
                          <input
                            type="text"
                            value={changedLocation}
                            onChange={(e) => setChangedLocation(e.target.value)}
                            placeholder="Entrez votre Localisation"
                            className="w-60"
                          />
                        ) : (
                          <span>{profile.location}</span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditLocation ? (
                    <Image
                      src="/images/icons/change.png"
                      alt="modifier"
                      width={28}
                      height={28}
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditLocation(!isEditLocation)}
                    />
                  ) : (
                    isOwner && (
                      <Image
                        src="/images/icons/save.png"
                        alt="sauvegarder"
                        width={28}
                        height={28}
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveLocation}
                      />
                    )
                  )}
                </div>
                {/* Birthdate */}
                <div className="flex flex-row justify-between mx-10 w-[90%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <Image
                      src="/images/icons/birthday.png"
                      className="mr-6"
                      width={28}
                      height={28}
                      alt="Date de naissance"
                    ></Image>
                    {profile ? (
                      <>
                        {isEditBirthdate ? (
                          <input
                            type="date"
                            value={changedBirthdate}
                            onChange={(e) =>
                              setChangedBirthdate(e.target.value)
                            }
                            placeholder="Votre date de naissance au format YYYY-MM-DD"
                            className="w-60"
                          />
                        ) : (
                          <span>
                            {moment(profile.birthdate).format("DD/MM/YYYY")}
                          </span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditBirthdate ? (
                    <Image
                      src="/images/icons/change.png"
                      alt="modifier"
                      width={28}
                      height={28}
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditBirthdate(!isEditBirthdate)}
                    />
                  ) : (
                    isOwner && (
                      <Image
                        src="/images/icons/save.png"
                        alt="sauvegarder"
                        width={28}
                        height={28}
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveBirthdate}
                      ></Image>
                    )
                  )}
                </div>
              </div>
              <div className="flex flex-col w-96">
                {/* Bio */}
                <div className="flex flex-row justify-between mx-10 w-[100%]">
                  <p className="flex flex-row text-lg mt-4 mb-4 ">
                    <Image
                      src="/images/icons/hello.png"
                      className="mr-6"
                      width={28}
                      height={28}
                      alt="adresse mail"
                    />
                    {profile ? (
                      <>
                        {isEditBio ? (
                          <input
                            type="text"
                            value={changedBio}
                            onChange={(e) => setChangedBio(e.target.value)}
                            placeholder="Entrez votre Présentation"
                            className="w-60"
                          />
                        ) : (
                          <span>{profile.bio}</span>
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditBio ? (
                    <Image
                      src="/images/icons/change.png"
                      alt="modifier"
                      width={28}
                      height={28}
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditBio(!isEditBio)}
                    />
                  ) : (
                    isOwner && (
                      <Image
                        src="/images/icons/save.png"
                        alt="sauvegarder"
                        width={28}
                        height={28}
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveBio}
                      />
                    )
                  )}
                </div>
                {/* website */}
                <div className="flex flex-row justify-between mx-10 w-[100%]">
                  <p className="flex flex-row text-lg mt-4 mb-4">
                    <Image
                      src="/images/icons/www.png"
                      className="mr-6"
                      width={28}
                      height={28}
                      alt="Site web"
                    ></Image>
                    {profile ? (
                      <>
                        {isEditWebsite ? (
                          <input
                            type="url"
                            value={changedWebsite}
                            onChange={(e) => setChangedWebsite(e.target.value)}
                            placeholder="Entrez l'adresse de votre site web"
                            className="w-60"
                          />
                        ) : (
                          profile.external_link && (
                            <a href={profile.external_link}>Voir le site</a>
                          )
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditWebsite ? (
                    <Image
                      src="/images/icons/change.png"
                      alt="modifier"
                      width={28}
                      height={28}
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditWebsite(!isEditWebsite)}
                    />
                  ) : (
                    isOwner && (
                      <Image
                        src="/images/icons/save.png"
                        alt="sauvegarder"
                        width={28}
                        height={28}
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveWebsite}
                      ></Image>
                    )
                  )}
                </div>
                {/* facebook */}
                <div className="flex flex-row justify-between mx-10 w-[100%]">
                  <p className="flex flex-row text-lg mt-4 mb-8">
                    <Image
                      src="/images/icons/facebook.png"
                      className="mr-6"
                      width={28}
                      height={28}
                      alt="Facebook"
                    />
                    {profile ? (
                      <>
                        {isEditFacebook ? (
                          <input
                            type="url"
                            value={changedFacebook}
                            onChange={(e) => setChangedFacebook(e.target.value)}
                            placeholder="Entrez l'adresse de votre profil Facebook"
                            className="w-60"
                          />
                        ) : (
                          profile.facebook_link && (
                            <a href={profile.facebook_link}>Voir le facebook</a>
                          )
                        )}
                      </>
                    ) : (
                      <p>Chargement...</p>
                    )}
                  </p>
                  {isOwner && !isEditFacebook ? (
                    <Image
                      src="/images/icons/change.png"
                      alt="modifier"
                      width={28}
                      height={28}
                      className=" w-8 h-8 ml-28 mt-3 mr-5 hover:cursor-pointer"
                      onClick={() => setIsEditFacebook(!isEditFacebook)}
                    />
                  ) : (
                    isOwner && (
                      <Image
                        src="/images/icons/save.png"
                        alt="sauvegarder"
                        width={28}
                        height={28}
                        className="w-6 h-6 ml-16 mt-3.5 hover:cursor-pointer"
                        onClick={handleSaveFacebook}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Avatar */}
          <div className="flex flex-row">
            <>
              <div className="flex flex-row text-lg ml-2 mt-0 mb-4">
                {profile ? (
                  <>
                    {isOwner && isEditAvatar ? (
                      <div className="container flex flex-col w-[350px] h-[303px] bg-white rounded-3xl shadow-lg pb-5">
                        <p className="mx-auto mt-3 mb-2 font-semibold text-lg">
                          {profile.username}
                        </p>
                        <div className="w-44 h-44 mx-auto">
                          <Image
                            src={profile.avatar || "/default-avatar.jpg"}
                            width={400}
                            height={400}
                            className="w-full h-full object-cover rounded-full"
                            alt={profile.username}
                          />
                        </div>
                        <div className="flex flex-row">
                          <input
                            type="file"
                            onChange={(e) =>
                              setChangedAvatar(e.target.files[0])
                            }
                            className="w-60 ml-5 mt-5"
                          />
                          <Image
                            src="/images/icons/save.png"
                            alt="sauvegarder"
                            width={28}
                            height={28}
                            className="w-6 h-6 ml-10 mt-6"
                            onClick={handleSaveAvatar}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="container flex flex-col w-[250px] h-[263px] bg-white rounded-3xl shadow-lg pb-5">
                        <p className="mx-auto mt-3 mb-2 font-semibold text-lg">
                          {profile.username}
                        </p>
                        <div className="w-44 h-44 mx-auto">
                          <Image
                            src={profile.avatar || "/default-avatar.jpg"}
                            className="w-full h-full object-cover rounded-full"
                            alt={profile.username}
                            width={400}
                            height={400}
                          />
                        </div>
                        <div className="mb-0 relative">
                          {isOwner && !isEditAvatar ? (
                            <Image
                              src="/images/icons/change.png"
                              className=" w-8 ml-48 -mt-3"
                              alt="modifier l'avatar"
                              width={28}
                              height={28}
                              onClick={() => setIsEditAvatar(!isEditAvatar)}
                            />
                          ) : (
                            isOwner &&
                            !isEditAvatar(
                              <Image
                                src="/images/icons/save.png"
                                alt="sauvegarder"
                                width={28}
                                height={28}
                                className="w-6 h-6 ml-24 mt-3.5"
                                onClick={handleSaveAvatar}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <p>Chargement...</p>
                )}
              </div>
            </>
          </div>
        </div>
        {/* Offers list */}
        {/* <div className="container w-[988px] h-96 flex flex-col bg-white rounded-3xl shadow-lg pb-4 mr-5 ">
          <h3 className="mx-auto mt-4 mb-8 text-2xl">
            {connectedUser ? "Mes annonces" : "Annonces"}
          </h3>
          <div className="flex flex-col overflow-y-auto">
            <table className="text-center">
              <thead>
                <tr className="">
                  <th>Nom</th>
                  <th>Race</th>
                  <th>Sexe</th>
                  <th>Date</th>
                  <th>Photo</th>
                  {connectedUser && <th>Supprimer</th>}
                </tr>
              </thead>
              <tr>
                <td colSpan="6" className="h-0.5 border-0 bg-darkgray"></td>
              </tr>

              {catsOffers.offers.map((catOffer) => (
                <React.Fragment key={catOffer.id}>
                  <tr className="h-16">
                    <td>
                      <Link href={`/Annonces/${catOffer.id}`}>
                        <p className="mt-3">
                          <strong>{catOffer.name}</strong>
                        </p>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/Annonces/${catOffer.id}`}>
                        <p className="mt-3">{catOffer.race}</p>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/Annonces/${catOffer.id}`}>
                        <p className="mt-3">{catOffer.sex}</p>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/Annonces/${catOffer.id}`}>
                        <p className="mt-3">
                          {moment(catOffer.date_posted).format("DD/MM/YYYY")}
                        </p>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/Annonces/${catOffer.id}`}>
                        <Image
                          src={`http://localhost:8000${catOffer.picture}`}
                          className="w-9 mt-3 mx-auto"
                          alt={catOffer.name}
                          width={28}
                          height={28}
                        />
                      </Link>
                    </td>
                    {connectedUser && (
                      <td>
                        <Image
                          src="/images/icons/garbage.png"
                          className="w-9 mx-auto hover:cursor-pointer"
                          width={28}
                          height={28}
                          onClick={() => handleDelete(catOffer.id)}
                          alt="supprimer l'annonce"
                        />
                      </td>
                    )}
                  </tr>
                </React.Fragment>
              ))}
            </table>
          </div>
        </div> */}
      </div>
    </>
  );
}
