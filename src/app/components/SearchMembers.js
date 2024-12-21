import { useState } from "react";
import GlassSearchButton from "../components/GlassSearchButton";

export default function SearchMembers({ profiles, setFilteredProfiles }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchMembers = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchMembersButton = () => {
    filterProfiles(searchQuery);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      filterProfiles(searchQuery);
    }
  }

  const filterProfiles = (query) => {
    const filtered = profiles.filter(
      (profile) =>
        profile.username.toLowerCase().includes(query.toLowerCase()) ||
        profile.location.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProfiles(filtered);
    console.log("profillllle", filtered);
  };

  return (
    <div>
      <div className="flex flex-row bg-white rounded-full md:w-1/4 h-16 border-fragole border mx-auto shadow-lg md:text-xs lg:text-lg animate-fade animate-delay-100">
        <input
          type="text"
          className="rounded-full w-3/4 pl-6 outline-none"
          placeholder="Chercher un membre, une localisation"
          value={searchQuery}
          onChange={handleSearchMembers}
          onKeyUp={handleKeyPress}
        />
        <div className="ml-[12%]">
          <GlassSearchButton onClick={handleSearchMembersButton} className="" />
        </div>
      </div>
    </div>
  );
}
