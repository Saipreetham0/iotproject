// pages/dashboard.js

import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Sensor = () => {
  const [user, setUser] = useState(null);
  const [sensorData, setSensorData] = useState(null);

  const fetchData = async () => {
    try {
      const device1CollectionRef = collection(db, "device1");

      // Fetch only one document, ordered by timestamp in descending order
      const device1Query = query(
        device1CollectionRef,
        orderBy("myTimestamp", "desc"), // Change to your timestamp field
        limit(1)
      );

      const device1Docs = await getDocs(device1Query);

      if (!device1Docs.empty) {
        const docData = device1Docs.docs[0].data();
        const { CO2, humidity, lux, myTimestamp, temp } = docData;

        // Update state with the fetched data
        setSensorData({
          timestamp: myTimestamp,
          temperature: temp,
          humidity,
          co2: CO2,
          lux,
        });
      } else {
        console.log("No documents found");
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // Fetch fresh data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* Check if sensorData is not null before rendering */}
      {sensorData && (
        <>
          <h2 className="text-xl font-medium m-4 ">
            Welcome back, {user ? user.displayName || user.email : "UserName"}{" "}
            🙂
          </h2>
          <h2 className="text-xl font-medium m-4 ">📊 Dashboard</h2>

          <h3 className="text-sl font-medium m-4">
            Last Update : {sensorData.timestamp}
          </h3>

          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <SensorBox
              title="Temperature"
              unit="°C"
              data={sensorData.temperature}
              timestamp={sensorData.timestamp}
            />
            <SensorBox
              title="Humidity"
              unit="%"
              data={sensorData.humidity}
              timestamp={sensorData.timestamp}
            />
            <SensorBox
              title="CO2"
              unit="PPM"
              data={sensorData.co2}
              timestamp={sensorData.timestamp}
            />
            <SensorBox
              title="Lux"
              unit="Lux"
              data={sensorData.lux}
              timestamp={sensorData.timestamp}
            />
          </div>

          {/* Button to fetch fresh data */}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={fetchData}
          >
            Refresh Data
          </button>
        </>
      )}
    </div>
  );
};

const SensorBox = ({ title, unit, data, timestamp }) => (
  <div className="h-32 md:h-28 lg:h-32 dark:bg-gray-800 bg-white border rounded-lg p-4 shadow-md">
    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
      {title}
    </h2>
    <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
      {`${title}: ${data} ${unit}`}
    </p>
    {/* <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
      {`Timestamp: ${timestamp}`}
    </p> */}
  </div>
);

export default Sensor;
