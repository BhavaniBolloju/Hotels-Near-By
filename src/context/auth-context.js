import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext({
  token: "",
});

const calcTokenExpireTime = function (expireTime) {
  const currentTime = Date.now();
  const futureTime = expireTime;

  const remainingTime = currentTime - futureTime;
  // console.log(remainingTime);

  if (remainingTime < 0) {
    return true;
  } else {
    return false;
  }
};

export const AuthContextProvider = function (props) {
  const getStoredToken = localStorage.getItem("token");

  const [token, setToken] = useState(getStoredToken);

  const getToken = useCallback(async () => {
    const auth = await fetch(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: "pORdLWG9sr39suHwYsQy6fudhUmnATK1",
          client_secret: "nwtHx4wqgvkAN3AV",
        }),
      }
    );

    const response = await auth.json();
    const { access_token, expires_in } = response;

    if (!getStoredToken) {
      setToken(access_token);
    }

    localStorage.setItem("token", access_token);

    const futureTime = Date.now() + expires_in * 1000;

    localStorage.setItem("expireTime", futureTime);
  }, [getStoredToken]);

  useEffect(() => {
    const getStoredExpireTime = localStorage.getItem("expireTime");
    const expireTimeLeft = calcTokenExpireTime(getStoredExpireTime);

    if (expireTimeLeft) {
      return;
    }
    localStorage.removeItem("expireTime");
    localStorage.removeItem("token");

    getToken();
  }, [getToken]);

  console.log(token);

  const contextValue = {
    token: token,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
