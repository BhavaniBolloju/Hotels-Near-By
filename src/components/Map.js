import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import iconPerson from "./icon";

import getDistance from "geolib/es/getDistance";

const distance = function (coords1, coords2) {
  return getDistance(
    { latitude: coords1[0], longitude: coords1[1] },
    { latitude: coords2[0], longitude: coords2[1] }
  );
};

function Map(props) {
  const { coords } = useContext(AuthContext);
  // console.log(coords);
  const keyMap = Math.random();
  const position = coords;

  let hotels = props.hotelsNearBy;

  if (props.hotelList?.length > 0) {
    hotels = [...hotels, ...props.hotelsNearBy];
  }

  const SetViewOnClick = () => {
    const map = useMap();
    map.setView(props.coords || position, map.getZoom(), {
      animate: true,
      pan: {
        duration: 2,
      },
    });

    return null;
  };

  return (
    <MapContainer
      key={keyMap}
      className="w-full h-full"
      center={position}
      zoom={16}
      zoomControl={false}
      easeLinearity={0.55}
      animate={true}
      scrollWheelsZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotels.map((hotel, i) => {
        const { latitude: lat, longitude: lon } = hotel.geoCode;
        return (
          <Marker key={i} position={[lat, lon]} icon={iconPerson}>
            <Popup className="popupStyles text-sm">
              <p>{hotel.name}</p>
              <p>Appr Distance :{distance(coords, [lat, lon]) / 1000} km</p>
            </Popup>
            <SetViewOnClick />
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
