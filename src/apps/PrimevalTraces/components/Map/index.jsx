import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import PrimevalMarker from "./components/PrimevalMarker";
import { retrieveFossilsForBoundingBox } from "../../services/Fossils";
import "leaflet/dist/leaflet.css";
import "./style.scss";
import Gazetteer from "./components/Gazetteer/Gazetteer";

// Component responsible for listening to map events
const UpdateMap = ({ onMoveEnd, isOpenTooltip }) => {
  const map = useMapEvents({
    moveend: () => {
      if (!isOpenTooltip) {
        onMoveEnd(map.getBounds());
      }
    },
  });
  useEffect(() => {
    onMoveEnd(map.getBounds());
  }, []);

  return null;
};

const PrimevalMap = () => {
  const mapRef = useRef();
  const [fossils, setFossils] = useState([]);
  const [shownFossils, setShownFossils] = useState([]);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);

  // Function to update the map, called on moveend event and tooltip close
  const updateMap = (bounds) => {
    // Define the bounding box for the API request
    const boundingBox = {
      lngmin: bounds._southWest.lng,
      lngmax: bounds._northEast.lng,
      latmin: bounds._southWest.lat,
      latmax: bounds._northEast.lat,
    };

    // Call the API to retrieve fossils for the bounding box
    retrieveFossilsForBoundingBox(boundingBox).then((response) => {
      // Clear the current fossil data
      setFossils([]);
      setShownFossils([]);

      // Update the state with the new data if the response was successful
      if (response.status === 200) {
        setFossils(response.data);

        // We need to loop through the fossils, and if there is a fossil with the exact same lat,lng we don't add it to the shownFossils array
        let tempFossils = [];
        for (let i = 0; i < response.data.length; i++) {
          let found = false;
          for (let j = 0; j < tempFossils.length; j++) {
            if (
              response.data[i].lat === tempFossils[j].lat &&
              response.data[i].lng === tempFossils[j].lng
            ) {
              found = true;
              if (!tempFossils[j].more) {
                tempFossils[j].more = 1;
              } else {
                tempFossils[j].more += 1;
              }
            }
          }
          if (!found) {
            tempFossils.push({ ...response.data[i], more: 0 });
          }
        }
        setShownFossils(tempFossils);
      }
    });
  };

  // Effect to listen for the tooltip closing
  useEffect(() => {
    // Only update the map if a tooltip has just closed and the map ref is defined
    if (!isOpenTooltip && mapRef.current) {
      updateMap(mapRef.current.getBounds());
    }
  }, [isOpenTooltip]);

  return (
    <div className="primeval-map">
      <MapContainer center={[51.5, 0]} zoom={11} ref={mapRef}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Gazetteer
          setMapCenter={(center) => mapRef.current.setView(center)}
          setMapZoom={(zoom) => mapRef.current.setZoom(zoom)}
        />
        {shownFossils.map((fossil, index) => (
          <PrimevalMarker
            key={index}
            position={[fossil.lat, fossil.lng]} // Assuming that fossil object has lat and lng properties
            fossil={fossil} // Using idn property as content of the marker
            isOpenTooltip={isOpenTooltip}
            setIsOpenTooltip={setIsOpenTooltip}
          />
        ))}
        <UpdateMap onMoveEnd={updateMap} isOpenTooltip={isOpenTooltip} />
      </MapContainer>
    </div>
  );
};

export default PrimevalMap;
