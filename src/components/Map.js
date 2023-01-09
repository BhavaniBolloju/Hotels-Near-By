import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import iconPerson from "./icon";

function getDistanceBetweenTwoPoints(cord1, cord2) {
  // console.log(cord1, cord2);

  // if (cord1.lat === cord2.lat && cord1.lon === cord2.lon) {
  //   return 0;
  // }

  const radlat1 = (Math.PI * cord1[0]) / 180;
  const radlat2 = (Math.PI * cord2[0]) / 180;

  const theta = cord1[1] - cord2[1];
  const radtheta = (Math.PI * theta) / 180;

  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  return dist;
}

function Map(props) {
  const { coords } = useContext(AuthContext);

  console.log(coords);
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
            <Popup className="text-sm">
              <p>{hotel.name}</p>
              <p>
                Appr Distance :
                {getDistanceBetweenTwoPoints(coords, [lat, lon]).toFixed(3)} km
              </p>
            </Popup>
            <SetViewOnClick />
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default Map;
