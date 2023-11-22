// pages/dashboard.js

// import { useEffect, useState } from "react";
import React, { useState, useEffect } from "react";

import { db } from "@/utils/firebase";
// import db from "@/utils/firebase";
import { getDocs, collection } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sensor = () => {
  const [sensorData, setSensorData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "devices");
        const querySnapshot = await getDocs(collectionRef);

        if (!querySnapshot.empty) {
          const docsData = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // setData(docsData);
          setSensorData(docsData);

          // console.log(docsData);
        } else {
          console.log("No documents found");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-medium m-4 ">
        {" "}
        Welcome back, {user ? user.displayName || user.email : "UserName"} 🙂
      </h2>
      <h2 className="text-xl font-medium m-4 ">📊 Dashboard</h2>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
        <SensorBox
          title="Temperature"
          unit="°C"
          data={sensorData.map((reading) => reading.Temperature)}
        />
        <SensorBox
          title="Humidity"
          unit="%"
          data={sensorData.map((reading) => reading.Humidity)}
        />
        <SensorBox
          title="CO2"
          unit="PPM"
          data={sensorData.map((reading) => reading.CO2)}
        />
        <SensorBox
          title="Lux"
          unit="Lux"
          data={sensorData.map((reading) => reading.Lux)}
        />
      </div>
    </div>
  );
};

const SensorBox = ({ title, unit, data }) => (
  <div className="h-32 md:h-28 lg:h-32 dark:bg-gray-800 bg-white border rounded-lg p-4 shadow-md">
    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
      {title}
    </h2>
    <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
      {data.map((value) => `${value} ${unit}`).join(", ")}
    </p>
  </div>
);

export default Sensor;
