// SensorDataTable.js
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, deleteDoc, doc, orderBy, query, startAfter, limit } from "firebase/firestore";

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);

  const fetchNextPage = async () => {
    try {
      const device1CollectionRef = collection(db, "device1");

      // If there is a lastDocument, start the query after it
      const q = lastDocument
        ? query(device1CollectionRef, orderBy("myTimestamp", "desc"), startAfter(lastDocument), limit(10))
        : query(device1CollectionRef, orderBy("myTimestamp", "desc"), limit(10));

      const device1Docs = await getDocs(q);

      const data = [];
      device1Docs.forEach((doc) => {
        const { CO2, humidity, lux, myTimestamp, temp } = doc.data();
        data.push({
          id: doc.id,
          timestamp: myTimestamp,
          temperature: temp,
          humidity,
          co2: CO2,
          lux,
        });
      });

      // Update the lastDocument for the next page
      setLastDocument(device1Docs.docs[data.length - 1] || null);

      // Update the state with the fetched data
      setSensorData((prevData) => [...prevData, ...data]);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    // Fetch the first page on mount
    fetchNextPage();
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
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        Sensor Data Table
      </h1>
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
        <div className="mt-4">
          <button
            onClick={fetchNextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default SensorDataTable;
