// pages/dashboard.js

// import { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";

import app from "@/utils/firebase";
// import db from "@/utils/firebase";

import { getFirestore } from "firebase/firestore";

import { getDoc, collection, QuerySnapshot } from "firebase/firestore";

const db = getFirestore(app);

const Sensor = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const collectionRef = collection(db, "devices");
        const querySnapshot = await getDocs(collectionRef);

        if (!querySnapshot.empty) {
          const docsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setData(docsData);
          // console.log(docsData);
        } else {
          console.log("No documents found");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocs();
  }, []);

  return (
    <div>
      {/* <ul>
        {data.map((item) => (
          <li key={item.id}>{item.yourFieldName}</li>
        ))}
      </ul> */}
      {/* <div>
        <h2>Temperature Data</h2>
        <ul>
          {temperatureData.map((reading) => (
            <li key={reading.id}>{JSON.stringify(reading)}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Humidity Data</h2>
        <ul>
          {humidityData.map((reading) => (
            <li key={reading.id}>{JSON.stringify(reading)}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>CO2 Data</h2>
        <ul>
          {co2Data.map((reading) => (
            <li key={reading.id}>{JSON.stringify(reading)}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2>Lux Data</h2>
        <ul>
          {luxData.map((reading) => (
            <li key={reading.id}>{JSON.stringify(reading)}</li>
          ))}
        </ul>
      </div> */}

      {/* <h2 className="text-xl font-medium m-4 ">Welcome back, UserName 🙂</h2> */}
      <h2 className="text-xl font-medium m-4 ">📊 Dashboard</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
            Temperature
          </h2>

          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Numbers
          </p>
        </div>

        <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
            Humidity
          </h2>

          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Numbers
          </p>
        </div>
        <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
            C02
          </h2>

          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Numbers
          </p>
        </div>
        <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
            Lux
          </h2>

          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
            Numbers
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sensor;
