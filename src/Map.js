import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Legend from "./Legend";
import Highlight from "./Highlight";

const Leaflet = () => {
  const position = [-0.306638, 116.713504];
  const esri = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}" 
  return (
    <MapContainer center={position} zoom={5} style={{ height: "100vh" }}>
      <TileLayer
        url = {esri}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Highlight />
      <Legend />
    </MapContainer>
  );
};

export default Leaflet;
