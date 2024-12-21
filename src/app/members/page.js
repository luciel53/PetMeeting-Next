"use client";

import SearchMembers from "../components/SearchMembers";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

export default function Members() {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    try {
      const reponse = await axios.get('http://127.0.0.1:8000/users/profile/');
      setProfiles(reponse.data);
      setFilteredProfiles(reponse.data);
      console.log(reponse.data);
    } catch (e) {
      console.error('Error fetching profiles', e);
    }
  };

  return (
    <div>
      <div className="mt-32">
        <SearchMembers profiles={profiles} setFilteredProfiles={setFilteredProfiles} />
      </div>
      <div className="grid grid-cols-2 place-content-center md:max-w-max md:mx-auto md:grid-cols-3 lg:grid-cols-4 mt-12 mb-20 animate-fade-down">
        {filteredProfiles && filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile, index) => (
            <Link key={index} href={`/Profile/${profile.user}`}>
              <div
                key={index}
                className="vignette flex flex-col justify-center items-center text-center bg-white z-0 md:h-96 w-72 mx-auto mr-3 mt-3 pb-2 rounded-3xl shadow-xl hover:opacity-85 hover:scale-105 transition duration-500 cursor-pointer"
              >
                <p className="text-center text-lg font-semibold mt-3">{profile.username}</p>
                <img
                  src={profile.avatar}
                  className="z-20 h-40 md:h-3/4 w-56 my-3 object-cover mx-auto shadow-sm rounded-3xl"
                  alt={profile.username}
                />
                <p className="text-center text-lg font-semibold mt-3">{profile.location}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="mx-auto text-center">Désolé, aucun résultat.</p>
        )}
      </div>
    </div>
  );
}
