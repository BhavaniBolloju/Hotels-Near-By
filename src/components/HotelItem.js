import React from "react";

function HotelItem({ item, onPopup }) {
  return (
    <li
      onClick={() => onPopup(item.geoCode)}
      className="bg-purple-200 p-4 rounded-md hover:cursor-pointer"
    >
      <div className="font-[600] text-purple-9  00 max-w-[150px] mb-2">
        {item.name}
      </div>
      <div>code: {item.hotelId}</div>
    </li>
  );
}

export default HotelItem;
