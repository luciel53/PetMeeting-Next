"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import axios from "axios";
// import userIcon from "/images/icons/user.svg";
// import messagesIcon from "/images/icons/messages.svg";
// import logoutIcon from "/images/icons/logout.svg";
// import registerIcon from "/images/icons/register.png";
// import connectionIcon from "/images/icons/connection.png";
// import paw from "/images/icons/paw.png";
// import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [unconnectedIcons, setUnconnectedIcons] = useState(false);
  const [userId, setUserId] = useState("1");
  //   const [username, setUsername] = useState("");
  const pathname = usePathname();

  /* To manage the authentication */
  const [isAuth, setIsAuth] = useState(false);

  //   useEffect(() => {
  //     if (localStorage.getItem("access_token") !== null) {
  //       setIsAuth(true);
  //       const token = localStorage.getItem("access_token");
  //       try {
  //         const decodedToken = jwtDecode(token);
  //         setUserId(decodedToken.user_id);
  //         fetchUsernameByUserId(decodedToken.user_id);
  //       } catch (error) {
  //         console.error("Error decoding token", error);
  //       }
  //     }
  //   }, []);

  // set the auth to false if disconnected
  //   const updateIsAuthLogout = () => {
  //     setIsAuth(false);
  //   };

  //   useEffect(() => {
  //     if (!isAuth) {
  //       setUsername("");
  //     }
  //   }, [isAuth]);

  //   const fetchUsernameByUserId = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8000/users/${userId}/`);
  //       setUsername(response.data.username);
  //     } catch (error) {
  //       console.log("Error fetching username", error);
  //     }
  //   };

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);

    if (!isMenuOpen) {
      setUnconnectedIcons(false);
    }
  }

  //   const handleLogout = async () => {
  //     try {
  //       localStorage.clear();
  //       axios.defaults.headers.common["Authorization"] = null;
  //       updateIsAuthLogout();
  //       window.href = "/login";
  //       console.log("You're disconnected");
  //     } catch (error) {
  //       console.log("Logout doesn't work", error);
  //     }
  //   };

  return (
    <header className=" flex flex-row justify-between items-center bg-purple z-50 fixed top-0 w-full shadow-xl">
      <nav id="header-nav" className="bg-purple mx-auto p-0 flex flex-row justify-between w-full items-center ">
        {/* Logo */}
        <div>
          <Link
            href="/"
            className="flex"
            aria-label="Page d'accueil de PetMeeting"
          >
            <img
              src="images/logo.png"
              className="w-52 md:w-60 lg:w-80 md:mr-4"
              alt="Logo de PetMeeting"
            />
          </Link>
        </div>
        {/* Menu */}
        <ul
          id="toggled-menu"
          className={`w-full absolute flex top-full text-white bg-purple left-0 -z-10 border-b border-gray-200 md:flex flex-col items-center md:static md:z-10 md:w-min md:transform-none md:border-none md:flex-row md:mr-6 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
            <Link
              href="/Annonces"
              className={`text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20 ${
                pathname === "/Annonces" ? "active" : ""
              }`}
            >
              annonces
            </Link>

            {pathname === "/Annonces" && (
              <img
                src="images/icons/paw.png"
                alt="paw"
                className="z-0 absolute -top-2 left-1"
              />
            )}
          </li>
          {isAuth && (
            <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
              <Link
                href="/Publier"
                className={`text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20 ${
                  pathname === "/Publier" ? "active" : ""
                }`}
              >
                Publier
              </Link>

              {pathname === "/Publier" && (
                <img
                  src="images/icons/paw.png"
                  alt="paw"
                  className="z-0 absolute -top-2 left-1"
                />
              )}
            </li>
          )}
          <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
            <Link
              href="/members"
              className={`text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20 ${
                pathname === "/members" ? "active" : ""
              }`}
            >
              Membres
            </Link>

            {pathname === "/members" && (
              <img
                src="images/icons/paw.png"
                alt="paw"
                className="z-0 absolute -top-2 left-1"
              />
            )}
          </li>
          <li className="pt-8 py-4 md:py-0 md:mr-6 hover:animate-wiggle relative">
            <Link
              href="/contact"
              className={`text-sm lg:text-xl uppercase font-semibold rounded-lg px-2 ml-1 w-full relative z-20 ${
                pathname === "/contact" ? "active" : ""
              }`}
            >
              Contact
            </Link>

            {pathname === "/contact" && (
              <img
                src="images/icons/paw.png"
                alt="paw"
                className="z-0 absolute -top-2 left-1"
              />
            )}
          </li>
        </ul>
        {/* Parallelogram */}
        <div className="flex flex-col bg-gray w-28 md:w-36 lg:w-60 h-12 md:h-14 lg:h-20 skew-x-45 mr-8 md:mr-10 lg:mr-20 px-4 md:px-6 lg:px-12 justify-between items-center">
          <div className="flex flex-row my-auto">
            {isAuth ? (
              <Link
                href={`/Profile/${userId.toString()}`}
                className="flex"
                aria-label="Page d'accueil de PetMeeting"
              >
                <img
                  src="images/icons/user.svg"
                  className="-skew-x-45 w-5 md:w-6 lg:w-8 hover:opacity-70 mr-4"
                  alt="Icône de profil utilisateur"
                />
              </Link>
            ) : (
              <Link href="/login" className="flex" aria-label="Login">
                <img
                  src="images/icons/connection.png"
                  className="-skew-x-45 w-9 lg:w-14 mr-2 hover:opacity-70"
                  alt="Connexion"
                />
              </Link>
            )}
            {isAuth ? (
              <Link to="messagerie" className="flex" aria-label="messagerie">
                <img
                  src="images/icons/messages.svg"
                  className="-skew-x-45 w-5 md:w-6 lg:w-8 hover:opacity-70"
                  alt="Icône de profil utilisateur"
                />
              </Link>
            ) : (
              <Link href="/register" className="flex" aria-label="Register">
                <img
                  src="images/icons/register.png"
                  className="-skew-x-45 w-10 lg:w-14 hover:opacity-70"
                  alt="Enregistrement"
                />
              </Link>
            )}
            {isAuth && (
              <Link href="/" className="flex" aria-label="logout">
                <img
                  src="images/logout.svg"
                  className="-skew-x-45 w-5 md:w-6 lg:w-8 hover:opacity-70 ml-4"
                  alt="Icône de profil utilisateur"
                  onClick={handleLogout}
                />
              </Link>
            )}
          </div>
          {/* {isAuth && (
            <div className="-skew-x-45">
              <p>Hello {username}</p>
            </div>
          )} */}
        </div>
        {/* Burger button */}
        <button
          aria-label="toggle button"
          aria-expanded={isMenuOpen}
          id="menu-btn"
          className="cursor-pointer mr-2 w-7 md:hidden"
          onClick={toggleMenu}
        >
          <img src="images/icons/burger.png" alt="Menu hamburger" />
        </button>
      </nav>
    </header>
  );
}
