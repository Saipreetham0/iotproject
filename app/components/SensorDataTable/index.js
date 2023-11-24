// SensorDataTable.js
import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
// import { getDocs, collection, query, where } from "firebase/firestore";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const mainCollectionRef = collection(db, "devices");

        // Reference to a specific document in the main collection
        const mainDocRef = doc(mainCollectionRef, "iot-project");

        // Reference to the subcollection within the main document ("Sensors-data")
        const sensorsDataCollectionRef = collection(mainDocRef, "Sensors-data");

        // Reference to the documents within the "Sensors-data" subcollection
        const sensorsDataDocs = await getDocs(sensorsDataCollectionRef);

        // Iterate through each document in "Sensors-data" subcollection
        sensorsDataDocs.forEach(async (sensorDoc) => {
          // console.log("Sensor Document ID:", sensorDoc.id);

          // Reference to subcollections within each sensor document ("temp", "humidity", "co2", "lux")
          const tempCollectionRef = collection(sensorDoc.ref, "temp");
          const humidityCollectionRef = collection(sensorDoc.ref, "humidity");
          const co2CollectionRef = collection(sensorDoc.ref, "CO2");
          const luxCollectionRef = collection(sensorDoc.ref, "lux");

          // Fetch data from each subcollection
          const tempDocs = await getDocs(tempCollectionRef);
          const humidityDocs = await getDocs(humidityCollectionRef);
          const co2Docs = await getDocs(co2CollectionRef);
          const luxDocs = await getDocs(luxCollectionRef);

          // Log data from each subcollection
          tempDocs.forEach((tempDoc) => {
            console.log("Temp Data:", tempDoc.data());
          });

          humidityDocs.forEach((humidityDoc) => {
            console.log("Humidity Data:", humidityDoc.data());
          });

          co2Docs.forEach((co2Doc) => {
            console.log("CO2 Data:", co2Doc.data());
          });

          luxDocs.forEach((luxDoc) => {
            console.log("Lux Data:", luxDoc.data());
          });

          tempDocs.forEach((tempDoc) => {
            data.push({ ...tempDoc.data() });
          });

          humidityDocs.forEach((humidityDoc) => {
            data.push({ ...humidityDoc.data() });
          });

          co2Docs.forEach((co2Doc) => {
            data.push({ ...co2Doc.data() });
          });

          luxDocs.forEach((luxDoc) => {
            data.push({ ...luxDoc.data() });
          });
        });

        // setSensorData(data);

        setSensorData(data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchSensorData();
  }, []);

  return (
    // <div className="container mx-auto mt-8">
    //   <h1 className="text-3xl font-bold mb-4 dark:text-white">
    //     Sensor Data Table
    //   </h1>
    //   <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
    //     <thead>
    //       <tr className="bg-gray-100 dark:bg-gray-700">
    //         <th className="py-2 px-4 border-b dark:border-gray-600">
    //           Timestamp
    //         </th>
    //         <th className="py-2 px-4 border-b dark:border-gray-600">
    //           Temperature
    //         </th>
    //         <th className="py-2 px-4 border-b dark:border-gray-600">
    //           Humidity
    //         </th>
    //         <th className="py-2 px-4 border-b dark:border-gray-600">CO2</th>
    //         <th className="py-2 px-4 border-b dark:border-gray-600">Lux</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {sensorData.map((sensor, index) => (
    //         <tr key={index}>
    //           <td className="py-2 px-4 border-b dark:border-gray-600">
    //             {sensor.timestamp}
    //           </td>
    //           <td className="py-2 px-4 border-b dark:border-gray-600">
    //             {sensor.temperature}
    //           </td>
    //           <td className="py-2 px-4 border-b dark:border-gray-600">
    //             {sensor.humidity}
    //           </td>
    //           <td className="py-2 px-4 border-b dark:border-gray-600">
    //             {sensor.co2}
    //           </td>
    //           <td className="py-2 px-4 border-b dark:border-gray-600">
    //             {sensor.lux}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        Sensor Data Table
      </h1>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SensorDataTable;
