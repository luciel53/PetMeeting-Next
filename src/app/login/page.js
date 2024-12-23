"use client";

import React, { useState } from "react";
import Button from "../components/Button";
import Link from "next/link";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  // Create the submit method
  const submit = async (e) => {
    e.preventDefault();
    const user = {
      username: username,
      password: password,
    };

    try {
      //create post request
      const { data } = await axios.post("http://localhost:8000/token/", user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // initialize access and refresh token in localstorage
      localStorage.clear();
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`;
      window.location.href = "/";
    } catch (error) {
      console.log(
        "Une erreur est survenue lors de la connexion. Veuillez vérifier vos identifiants.",
        error
      );
      setErrorMessage(true);
    }
  };

  return (
    <div className="container flex flex-col justify-center mx-auto md:mx-auto w-[88%] md:w-[55%] xl:w-[30%] p-5 md:p-12 md:mt-40 bg-white rounded-3xl shadow-2xl text-sm md:text-lg animate-fade">
      <form onSubmit={submit}>
        <h2 className="text-lg md:text-2xl text-darkdarkgray text-center pb-7">
          Connectez-vous:
        </h2>
        <div className="flex flex-row items-center justify-around lg:w-[90%]">
          <img
            src="images/icons/user-mini.png"
            className=" mb-4"
            alt="lock"
          ></img>
          <input
            type="text"
            name="username"
            value={username}
            required
            placeholder="Nom d'utilisateur*"
            onChange={(e) => setUsername(e.target.value)}
            className="h-12 w-[90%] ml-4 mb-4 pt-1 pl-4 border-b border-darkgray focus:outline-none"
          />
        </div>
        <div className="flex flex-row items-center justify-around lg:w-[90%]">
          <img
            src="images/icons/lock.png"
            className=" mb-4"
            alt="lock"
          ></img>
          <input
            type="password"
            name="password"
            value={password}
            required
            placeholder="Mot de passe*"
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 w-[90%] ml-4 mb-4 pt-1 pl-4 border-b border-darkgray focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          {errorMessage && (
            <div className="text-fragole border border-fragole bg-lightyellow rounded-lg p-2 text-center mt-0 w-auto ml-0 shadow-xl">
              Veuillez vérifier vos identifiants.
            </div>
          )}
        </div>
        <Button text="Connexion" />
        <hr className="h-px my-8 bg-gray-200 border-0 bg-darkgray"></hr>
        <p className=" flex flex-row mx-auto">
          Pas de compte?{" "}
          <Link
            href="/register"
            className="flex"
            aria-label="Créer un nouveau compte"
          >
            <em className="text-fragole pl-2">Enregistrez-vous</em>
          </Link>
        </p>
      </form>
    </div>
  );
}
