// React
import { useEffect, useState } from "react";

// Styles
import "./style.scss";

// Icons
import HouseIcon from "@mui/icons-material/House";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

// Data
import allCocktails from "./data/cocktails.json";

// Songs
import stranger from "./music/stranger.mp3";

const Bar = () => {
  // State
  const [drinks, setDrinks] = useState(allCocktails);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [minimiseCocktails, setMinimiseCocktails] = useState(true);

  // When user first enters the page, a random cocktail will be selected
  useEffect(() => {
    setSelectedCocktail(drinks[Math.floor(Math.random() * drinks.length)]);
  }, []);

  // Music
  const [volume, setVolume] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  useEffect(() => {
    // If its already playing, find how far in
    const audio = new Audio(stranger);
    audio.volume = volume;
    // Skip to the right place
    audio.currentTime = audioDuration;
    audio.play();

    // Make sure to loop
    audio.addEventListener("ended", () => {
      audio.currentTime = 0;
      audio.play();
    });

    return () => {
      // Set the audio duration to where the song is paused
      setAudioDuration(audio.currentTime);
      audio.pause();
    };
  }, [volume]);

  return (
    <div className="bar interactable">
      <div className="bar-content">
        <div className="bar-content-logo">
          <img src="/assets/bar/logo.png" alt="logo" />
        </div>
        {/* Drinks */}
        <div className="bar-content-drinks">
          <div className="bar-content-drinks-header">
            {/* Search Box */}
            <div className="bar-content-drinks-search">
              <input
                type="text"
                placeholder="Search for a drink"
                onChange={(e) => {
                  setDrinks(
                    allCocktails.filter((drink) =>
                      drink.name
                        .toLowerCase()
                        .includes(e.target.value.toLowerCase())
                    )
                  );
                  setMinimiseCocktails(false);
                }}
              />
            </div>

            {/* Minimise */}
            <div className="bar-content-drinks-icon">
              {!minimiseCocktails ? (
                <CloseFullscreenIcon
                  onClick={() => {
                    setMinimiseCocktails(true);
                  }}
                />
              ) : (
                <FullscreenIcon
                  onClick={() => {
                    setMinimiseCocktails(false);
                  }}
                />
              )}
            </div>
          </div>

          {/* Table */}
          {!minimiseCocktails && (
            <div className="bar-content-drinks-table">
              {/* Drinks */}
              {drinks.map((drink, index) => (
                <div
                  className="bar-content-drinks-table-row"
                  key={index}
                  onClick={() => {
                    setSelectedCocktail(drink);
                    // Fill input with drink name
                    document.querySelector(
                      ".bar-content-drinks-search input"
                    ).value = drink.name;

                    // Minimise
                    setMinimiseCocktails(true);
                  }}
                  
                >
                  {/* Name */}
                  <div className="bar-content-drinks-table-row-name">
                    {drink.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Holder */}
        {minimiseCocktails && (
          <div className="bar-content-holder">
            {/* cocktail selected */}
            <div className="bar-content-holder-cocktail">
              {/* cocktail name */}
              <div className="bar-content-holder-subheading">Name</div>
              <div className="bar-content-holder-cocktail-value">
                <b>{selectedCocktail?.name}</b>
              </div>
              {/* cocktail ingredients */}
              <div className="bar-content-holder-subheading">Ingredients</div>
              <div className="bar-content-holder-cocktail-ingredients">
                {selectedCocktail?.ingredients.map((ingredient, index) => (
                  <div
                    className="bar-content-holder-cocktail-ingredients-item"
                    key={index}
                  >
                    {ingredient}
                  </div>
                ))}
              </div>
              {/* cocktail instructions */}
              <div className="bar-content-holder-subheading">Mix Method</div>
              <div className="bar-content-holder-cocktail-value">
                {selectedCocktail?.mix_method}
              </div>

              {/* Notes */}
              <div className="bar-content-holder-subheading">Notes</div>
              <div className="bar-content-holder-cocktail-value">
                {/* Loop through notes */}
                {selectedCocktail?.note.map((note, index) => (
                  <div
                    className="bar-content-holder-cocktail-ingredients-item"
                    key={index}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Music */}
      {/* Music button */}
      <div className="bar-music">
        {volume === 0 ? (
          <VolumeOffIcon
            onClick={() => {
              setVolume(0.5);
            }}
          />
        ) : (
          <VolumeUpIcon
            onClick={() => {
              setVolume(0);
            }}
          />
        )}

        {/* Music volume */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            setVolume(e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Bar;
