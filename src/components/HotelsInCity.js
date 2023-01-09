import React, { useEffect } from "react";
import { UseFetch } from "../hooks/use-fetch";
import HotelItem from "./HotelItem";

function HotelsInCity({ city = "HYD", onFetch, onCoords }) {
  const { data, fetchData, error } = UseFetch();

  const popupHandler = function (values) {
    const { latitude: lat, longitude: lon } = values;
    onCoords([lat, lon]);
  };

  useEffect(() => {
    fetchData(`/v1/reference-data/locations/hotels/by-city?cityCode=${city}`);
  }, [fetchData, city]);

  useEffect(() => {
    onFetch(data?.data);
  }, [data, onFetch]);

  let list;

  if (error) {
    list = error;
  }

  list =
    data &&
    data.data.map((hotel) => (
      <HotelItem onPopup={popupHandler} item={hotel} key={hotel.hotelId} />
    ));

  return (
    <ul className="list-none flex w-full flex-wrap text-lg gap-10">{list}</ul>
  );
}

export default HotelsInCity;
