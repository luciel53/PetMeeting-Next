import race from "./Races";
import sexe from "./Sex";
import eyeColor from "./EyeColor";
import blood from "./Blood";
import département from "./Regions";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [sex, setSex] = useState("");
  const [Race, setRace] = useState("");
  const [eye_color, setEye_color] = useState("");
  const [groupeSanguin, setGroupeSanguin] = useState("");
  const [localisation, setLocalisation] = useState("");

  function handleRemoveSexCross() {
    setSex("");
  }

  function handleRemoveRaceCross() {
    setRace("");
  }

  function handleRemoveGroupeSanguinCross() {
    setGroupeSanguin("");
  }

  function handleRemoveLocalisationCross() {
    setLocalisation("");
  }

  function handleRemoveColorEyeCross() {
    setEye_color("");
  }

  // manage the searchbar button
  function handleSearchBarButton(e) {
    e.preventDefault();
    // object that contains the criteria for research
    const criteria = {
      selectedSex: sex,
      selectedRace: Race,
      selectedBlood: groupeSanguin,
      selectedEyeColor: eye_color,
      selectedLocation: localisation,
    };

    if (onSearch) {
      onSearch(criteria);
    }
  }

  console.log("couleur::::", eye_color);

  return (
    <div className="flex flex-row bg-pink justify-center items-center">
      <div className="flex flex-row justify-center items-center">
        <div className=" flex flex-row justify-between items-center bg-white rounded-full md:w-[650px] lg:w-[100%] h-16 px-3 border-fragole border mx-auto shadow-lg md:text-xs lg:text-lg animate-fade animate-delay-100">
          {/* Sex */}
          <select
            className="bg-white rounded-full outline-none  hover:opacity-50 cursor-pointer"
            onChange={(e) => setSex(e.target.value)}
            value=""
          >
            <option value="" className="text-center">
              Sexe
            </option>
            {sexe.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Race */}
          <select
            className="bg-white w-20 pr-2 pl-3 rounded-full outline-none hover:opacity-50 cursor-pointer"
            onChange={(e) => setRace(e.target.value)}
            value=""
          >
            <option value="" className="text-center">
              Race
            </option>
            {race.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Eye color */}
          <select
            className="bg-white pl-3 pr-2 w-48 rounded-full outline-none hover:opacity-50 cursor-pointer"
            onChange={(e) => setEye_color(e.target.value)}
            value=""
          >
            <option value="" className="text-center">
              Couleur des yeux
            </option>
            {eyeColor.map((option) => (
              <option value={option.value}>{option.value}</option>
            ))}
          </select>
          {/* Blood */}
          <select
            className="bg-white ml-3 pr-2 rounded-full outline-none hover:opacity-50 cursor-pointer"
            onChange={(e) => setGroupeSanguin(e.target.value)}
            value=""
          >
            <option value="" className="text-center">
              Groupe sanguin
            </option>
            {blood.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {/* Location */}
          <select
            className="bg-white rounded-full w-24 pl-2 outline-none hover:opacity-50 cursor-pointer"
            onChange={(e) => setLocalisation(e.target.value)}
            value=""
          >
            <option value="" className="text-center">
              Région
            </option>
            {département.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* selected elements */}
        <div>
          <ul className="flex flex-row w-auto mt-4 justify-center">
            {sex && (
              <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
                <p className="flex flex-row">
                  {sex}
                  <button onClick={handleRemoveSexCross}>
                    <img
                      src="/images/icons/cross.png"
                      className="w-3.5 h-3.5 ml-3"
                      alt="delete"
                    />
                  </button>
                </p>
              </li>
            )}
            {Race && (
              <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
                <p className="flex flex-row">
                  {Race}
                  <button onClick={handleRemoveRaceCross}>
                    <img
                      src={cross}
                      className="w-3.5 h-3.5 ml-3"
                      alt="delete"
                    />
                  </button>
                </p>
              </li>
            )}
            {eye_color && (
              <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
                <p className="flex flex-row">
                  {eye_color}
                  <button onClick={handleRemoveColorEyeCross}>
                    <img
                      src={cross}
                      className="w-3.5 h-3.5 ml-3"
                      alt="delete"
                    />
                  </button>
                </p>
              </li>
            )}
            {groupeSanguin && (
              <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
                <p className="flex flex-row">
                  {groupeSanguin}
                  <button onClick={handleRemoveGroupeSanguinCross}>
                    <img
                      src={cross}
                      className="w-3.5 h-3.5 ml-3"
                      alt="delete"
                    />
                  </button>
                </p>
              </li>
            )}
            {localisation && (
              <li className="container flex flex-row bg-white border-fragole border h-10 w-auto text-center p-2 mr-3 rounded-lg">
                <p className="flex flex-row">
                  {localisation}
                  <button onClick={handleRemoveLocalisationCross}>
                    <img
                      src={cross}
                      className="w-3.5 h-3.5 ml-3"
                      alt="delete"
                    />
                  </button>
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* SearchBar Button */}
      <div>
        <button
          type="button"
          onClick={handleSearchBarButton}
          className="bg-fragole text-white lg:text-xl  p-3 rounded-full lg:ml-6 drop-shadow-lg hover:opacity-85"
        >
          <img
            src="/images/icons/search.png"
            className="hover:animate-spin w-10"
            alt="search"
          />
        </button>
      </div>
    </div>
  );
}
