// SensorDataTable.js
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
  startAfter,
  limit,
} from "firebase/firestore";

import { Line } from "react-chartjs-2";
import "chart.js"; // Ensure Chart.js is imported

import LineChart from "../chart";

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);

  // const chartData = {
  //   labels: sensorData.map((sensor) => sensor.timestamp),
  //   datasets: [
  //     {
  //       label: "Temperature",
  //       data: sensorData.map((sensor) => sensor.temperature),
  //       borderColor: "rgba(255, 99, 132, 1)",
  //       borderWidth: 1,
  //       fill: false,
  //     },
  //     // Add similar datasets for other sensor data (humidity, CO2, lux)
  //   ],
  // };

  // const chartOptions = {
  //   scales: {
  //     x: {
  //       type: "time",
  //       position: "bottom",
  //       time: {
  //         unit: "minute",
  //       },
  //     },
  //   },
  // };

  const fetchNextPage = async () => {
    try {
      const device1CollectionRef = collection(db, "device1");

      const q = lastDocument
        ? query(
            device1CollectionRef,
            orderBy("myTimestamp", "desc"),
            startAfter(lastDocument),
            limit(100)
          )
        : query(
            device1CollectionRef,
            orderBy("myTimestamp", "desc"),
            limit(100)
          );

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

      setLastDocument(device1Docs.docs[data.length - 1] || null);
      setSensorData((prevData) => [...prevData, ...data]);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchNextPage();
  }, []);

  const handleDelete = async (id) => {
    try {
      const device1DocRef = doc(db, "device1", id);
      await deleteDoc(device1DocRef);
      setSensorData((prevData) =>
        prevData.filter((sensor) => sensor.id !== id)
      );
    } catch (error) {
      console.error("Error deleting sensor data:", error);
    }
  };

  return (
    <div>
      {/* <LineChart  />
       */}
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-2">
        {/* Add a LineChart component for each sensor */}
        <LineChart
          title="Temperature"
          sensorData={sensorData.map((dataPoint) => ({
            data: dataPoint.temperature,
            timestamp: dataPoint.timestamp,
          }))}
          lineColor="#e74c3c"
        />
        <LineChart
          title="Humidity"
          sensorData={sensorData.map((dataPoint) => ({
            data: dataPoint.humidity,
            timestamp: dataPoint.timestamp,
          }))}
          lineColor="#2ecc71"
        />
        <LineChart
          title="CO2"
          sensorData={sensorData.map((dataPoint) => ({
            data: dataPoint.co2,
            timestamp: dataPoint.timestamp,
          }))}
          lineColor="#7f8c8d"
        />
        <LineChart
          title="Lux"
          sensorData={sensorData.map((dataPoint) => ({
            data: dataPoint.lux,
            timestamp: dataPoint.timestamp,
          }))}
          lineColor="#e67e22"
        />
      </div>

      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
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
                {/* <th className="py-2 px-4 border-b dark:border-gray-600">
                  Actions
                </th> */}
              </tr>
            </thead>
            <tbody>
              {sensorData.map((sensor, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-700"
                  }
                >
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
    </div>
  );
};

export default SensorDataTable;
