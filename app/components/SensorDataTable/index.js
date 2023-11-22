// SensorDataTable.js
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { getDocs, collection } from "firebase/firestore";

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const colRef = collection(db, "device");
        const querySnapshot = await getDocs(colRef);

        const data = [];

        querySnapshot.forEach((doc) => {
          const sensor = doc.data();
          data.push({
            timestamp: sensor.timestamp.toDate().toLocaleString(),
            temperature: sensor.temperature,
            humidity: sensor.humidity,
            co2: sensor.co2,
            lux: sensor.lux,
          });
        });

        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Sensor Data Table</h1>
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-700">
            <th className="py-2 px-4 border-b dark:border-gray-600">Timestamp</th>
            <th className="py-2 px-4 border-b dark:border-gray-600">Temperature</th>
            <th className="py-2 px-4 border-b dark:border-gray-600">Humidity</th>
            <th className="py-2 px-4 border-b dark:border-gray-600">CO2</th>
            <th className="py-2 px-4 border-b dark:border-gray-600">Lux</th>
          </tr>
        </thead>
        <tbody>
          {sensorData.map((sensor, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b dark:border-gray-600">{sensor.timestamp}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600">{sensor.temperature}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600">{sensor.humidity}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600">{sensor.co2}</td>
              <td className="py-2 px-4 border-b dark:border-gray-600">{sensor.lux}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorDataTable;
