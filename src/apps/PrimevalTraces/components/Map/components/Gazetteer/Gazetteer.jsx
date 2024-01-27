import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useMap } from "react-leaflet";
import CloseIcon from "@mui/icons-material/Close";
import "./Gazetteer.scss";

const Gazetteer = ({ setMapCenter, setMapZoom }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const map = useMap();

  const debouncedFetchSuggestions = useDebouncedCallback(async (query) => {
    if (query.length > 2) {
      let queryWithUK = `${query}, United Kingdom`;
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryWithUK)}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  }, 500);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSuggestions([]);
    debouncedFetchSuggestions(value);
  };

  const handleSelect = (lat, lon) => {
    setMapCenter([lat, lon]);
    setMapZoom(12);
    setSuggestions([]);
    map.dragging.enable(); // Re-enable dragging after selection
  };

  const handleMouseEvent = (e) => {
    e.stopPropagation();

    if (e.type === "mousedown" || e.type === "mousemove") {
      console.log("disable dragging");
      map.dragging.disable();
    } else if (e.type === "mouseup" || e.type === "touchend") {
      console.log("enable dragging");
      map.dragging.enable();
    }
  };

  return (
    <div
      className="gazetteer interactable"
      onMouseDown={handleMouseEvent}
      onMouseUp={handleMouseEvent}
    >
      <div className="gazetteer-search">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputChange}
          className="search-input"
          placeholder="Search for a place..."
        />
        {searchQuery.length > 0 && (
          <div
            className="search-close"
            onClick={() => {
              setSearchQuery("");
              setSuggestions([]);
              map.dragging.enable(); // Re-enable dragging when closing search
            }}
          >
            <CloseIcon />
          </div>
        )}
      </div>
      <ul className="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={() => handleSelect(suggestion.lat, suggestion.lon)}
          >
            {suggestion.display_name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gazetteer;
