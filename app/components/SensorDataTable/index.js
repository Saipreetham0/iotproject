// SensorDataTable.js
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const device1CollectionRef = collection(db, "device1");
        const device1Docs = await getDocs(device1CollectionRef);

        const data = [];
        device1Docs.forEach((doc) => {
          const { CO2, humidity, lux, myTimestamp, temp } = doc.data();
          data.push({
            id: doc.id, // Adding document ID to use for delete operation
            timestamp: myTimestamp,
            temperature: temp,
            humidity,
            co2: CO2,
            lux,
          });
        });

        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const device1DocRef = doc(db, "device1", id);
      await deleteDoc(device1DocRef);

      // Update the state after deletion
      setSensorData((prevData) => prevData.filter((sensor) => sensor.id !== id));
    } catch (error) {
      console.error("Error deleting sensor data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">Sensor Data Table</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="py-2 px-4 border-b dark:border-gray-600">
                Timestamp
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-600">
                Temperature
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-600">
                Humidity
              </th>
              <th className="py-2 px-4 border-b dark:border-gray-600">CO2</th>
              <th className="py-2 px-4 border-b dark:border-gray-600">Lux</th>
              {/* <th className="py-2 px-4 border-b dark:border-gray-600">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {sensorData.map((sensor, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {sensor.timestamp}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {sensor.temperature}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {sensor.humidity}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {sensor.co2}
                </td>
                <td className="py-2 px-4 border-b dark:border-gray-600">
                  {sensor.lux}
                </td>
                {/* <td className="py-2 px-4 border-b dark:border-gray-600">
                  <button
                    onClick={() => handleDelete(sensor.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorDataTable;
