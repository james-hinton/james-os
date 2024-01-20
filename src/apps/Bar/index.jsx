// React
import { useEffect, useState } from "react";

// Styles
import "./style.scss";

// Icons
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

// Data
import allCocktails from "./data/cocktails.json";

const Bar = () => {
  // State
  const [drinks, setDrinks] = useState(allCocktails);
  const [selectedCocktail, setSelectedCocktail] = useState(null);
  const [minimiseCocktails, setMinimiseCocktails] = useState(true);

  // When user first enters the page, a random cocktail will be selected
  useEffect(() => {
    setSelectedCocktail(drinks[Math.floor(Math.random() * drinks.length)]);
  }, []);


  return (
    <div className="bar interactable" style={{ backgroundImage: `url("assets/bar/texture.png")` }}>
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
    </div>
  );
};

export default Bar;
