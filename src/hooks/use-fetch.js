import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/auth-context";

const BASE_URL = "https://test.api.amadeus.com";

//use fetch hook
export const UseFetch = function () {
  const { token, hotelListHandler } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(
    async function (url) {
      try {
        const req = await fetch(`${BASE_URL}${url}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });
        const res = await req.json();
        if (!req.ok) {
          throw new Error(`No data found for requested city`);
        }

        setData(res);
        hotelListHandler(res.data);
      } catch (error) {
        setError(error.message);
      }
    },
    [token, hotelListHandler]
  );

  return {
    data,
    fetchData,
    error,
  };
};
