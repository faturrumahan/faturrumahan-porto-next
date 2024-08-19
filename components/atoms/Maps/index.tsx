import React from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";

const Maps = () => {
  const position: LatLngExpression = [-7.7829, 110.3671];
  const customIcon = new L.Icon({
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Map_pin_icon.svg/564px-Map_pin_icon.svg.png", // Replace with your image URL
    iconSize: [32, 40], // Size of the icon
    iconAnchor: [16, 32], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -32], // Point from which the popup should open relative to the iconAnchor
  });

  return (
    <div className="w-full h-96 lg:h-[500px] z-0">
      <MapContainer center={position} zoom={13} className="w-full h-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={customIcon}>
          <Popup>
            <p className="text-center">
              I'm Around Here
              <br />
              <b>Yogyakarta, Indonesia</b>
            </p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Maps;
