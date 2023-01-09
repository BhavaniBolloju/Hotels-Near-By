import React, { useContext, useState } from "react";
import { AuthContextProvider } from "./context/auth-context";
import HotelList from "./components/HotelList";

import Map from "./components/Map";
import HotelsInCity from "./components/HotelsInCity";

function App() {
  const [hotelList, setHotelList] = useState([]);
  const [hotelsNearBy, setHotelNearBy] = useState([]);
  const [coords, setCoords] = useState(null);

  const hotelListHandler = function (data) {
    setHotelList(data);
  };
  const hotelsNearByHandler = function (data) {
    setHotelNearBy(data);
  };

  const getCoords = function (values) {
    setCoords(values);
  };

  return (
    <AuthContextProvider>
      <div className="flex flex-row-reverse w-full h-[100vh]">
        <div className="bg-green-300 w-[55%]">
          {hotelsNearBy && (
            <Map
              coords={coords}
              hotelList={hotelList}
              hotelsNearBy={hotelsNearBy}
            ></Map>
          )}
        </div>

        <div className="bg-purple-100  w-[45%] p-10 overflow-y-scroll text-purple-900 scrollbar">
          <h1 className="text-center text-3xl uppercase border-b-2 border-purple-200 pb-3">
            Hotels Near You
          </h1>
          <HotelList onCoords={getCoords} onFetch={hotelListHandler} />
          <HotelsInCity onCoords={getCoords} onFetch={hotelsNearByHandler} />
        </div>
      </div>
    </AuthContextProvider>
  );
}

export default App;
