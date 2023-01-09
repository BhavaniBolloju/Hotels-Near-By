import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import { UseFetch } from "../hooks/use-fetch";
import HotelItem from "./HotelItem";

function HotelList({ onFetch, onCoords }) {
  const { data, fetchData, error } = UseFetch();
  const { coords } = useContext(AuthContext);

  const popupHandler = function (values) {
    const { latitude: lat, longitude: lon } = values;
    onCoords([lat, lon]);
  };

  useEffect(() => {
    if (coords) {
      const [lat, lon] = coords;
      fetchData(
        `/v1/reference-data/locations/hotels/by-geocode?latitude=${lat}&longitude=${lon}`
      );
    }
  }, [fetchData, coords]);

  useEffect(() => {
    onFetch(data?.data);
  }, [onFetch, data]);

  let list;

  if (error) {
    list = error;
  }
  list =
    data &&
    data?.data.map((item) => (
      <HotelItem
        onPopup={popupHandler}
        item={item}
        key={item.hotelId}
      ></HotelItem>
    ));

  return <ul className="list-none flex text-lg gap-10 mb-10 pt-10">{list}</ul>;
}

export default HotelList;
