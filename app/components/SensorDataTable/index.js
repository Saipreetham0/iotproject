// // SensorDataTable.js
// import React, { useState, useEffect } from "react";
// import { db } from "@/utils/firebase";
// import {
//   collection,
//   getDocs,
//   deleteDoc,
//   doc,
//   orderBy,
//   query,
//   startAfter,
//   limit,
// } from "firebase/firestore";

// import { Line } from "react-chartjs-2";
// import "chart.js"; // Ensure Chart.js is imported

// import LineChart from "../chart";

// const SensorDataTable = () => {
//   const [sensorData, setSensorData] = useState([]);
//   const [lastDocument, setLastDocument] = useState(null);

//   const fetchNextPage = async () => {
//     try {
//       const device1CollectionRef = collection(db, "device1");

//       const q = lastDocument
//         ? query(
//             device1CollectionRef,
//             orderBy("myTimestamp", "desc"),
//             startAfter(lastDocument),
//             limit(10)
//           )
//         : query(
//             device1CollectionRef,
//             orderBy("myTimestamp", "desc"),
//             limit(10)
//           );

//       const device1Docs = await getDocs(q);

//       const data = [];
//       device1Docs.forEach((doc) => {
//         const { CO2, humidity, lux, myTimestamp, temp } = doc.data();
//         data.push({
//           id: doc.id,
//           timestamp: myTimestamp,
//           temperature: temp,
//           humidity,
//           co2: CO2,
//           lux,
//         });
//       });

//       setLastDocument(device1Docs.docs[data.length - 1] || null);
//       setSensorData((prevData) => [...prevData, ...data]);
//     } catch (error) {
//       console.error("Error fetching sensor data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchNextPage();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const device1DocRef = doc(db, "device1", id);
//       await deleteDoc(device1DocRef);
//       setSensorData((prevData) =>
//         prevData.filter((sensor) => sensor.id !== id)
//       );
//     } catch (error) {
//       console.error("Error deleting sensor data:", error);
//     }
//   };

//   return (
//     <div>
//       {/* <LineChart  />
//        */}
//       <div className="grid grid-cols-1 xl:grid-cols-2  gap-2">
//         {/* Add a LineChart component for each sensor */}
//         <LineChart
//           title="Temperature"
//           sensorData={sensorData.map((dataPoint) => ({
//             data: dataPoint.temperature,
//             timestamp: dataPoint.timestamp,
//           }))}
//           lineColor="#e74c3c"
//         />
//         <LineChart
//           title="Humidity"
//           sensorData={sensorData.map((dataPoint) => ({
//             data: dataPoint.humidity,
//             timestamp: dataPoint.timestamp,
//           }))}
//           lineColor="#2ecc71"
//         />
//         <LineChart
//           title="CO2"
//           sensorData={sensorData.map((dataPoint) => ({
//             data: dataPoint.co2,
//             timestamp: dataPoint.timestamp,
//           }))}
//           lineColor="#7f8c8d"
//         />
//         <LineChart
//           title="Lux"
//           sensorData={sensorData.map((dataPoint) => ({
//             data: dataPoint.lux,
//             timestamp: dataPoint.timestamp,
//           }))}
//           lineColor="#e67e22"
//         />
//       </div>

//       <div className="mt-4">
//         <button
//           onClick={fetchNextPage}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Load More
//         </button>
//       </div>

//       <div className="container mx-auto mt-8">
//         <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
//           Sensor Data Table
//         </h1>

//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-700">
//                 <th className="py-2 px-4 border-b dark:border-gray-600">
//                   Timestamp
//                 </th>
//                 <th className="py-2 px-4 border-b dark:border-gray-600">
//                   Temperature
//                 </th>
//                 <th className="py-2 px-4 border-b dark:border-gray-600">
//                   Humidity
//                 </th>
//                 <th className="py-2 px-4 border-b dark:border-gray-600">CO2</th>
//                 <th className="py-2 px-4 border-b dark:border-gray-600">Lux</th>
//                 {/* <th className="py-2 px-4 border-b dark:border-gray-600">
//                   Actions
//                 </th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {sensorData.map((sensor, index) => (
//                 <tr
//                   key={index}
//                   className={
//                     index % 2 === 0
//                       ? "bg-gray-50 dark:bg-gray-800"
//                       : "bg-white dark:bg-gray-700"
//                   }
//                 >
//                   <td className="py-2 px-4 border-b dark:border-gray-600">
//                     {sensor.timestamp}
//                   </td>
//                   <td className="py-2 px-4 border-b dark:border-gray-600">
//                     {sensor.temperature}
//                   </td>
//                   <td className="py-2 px-4 border-b dark:border-gray-600">
//                     {sensor.humidity}
//                   </td>
//                   <td className="py-2 px-4 border-b dark:border-gray-600">
//                     {sensor.co2}
//                   </td>
//                   <td className="py-2 px-4 border-b dark:border-gray-600">
//                     {sensor.lux}
//                   </td>
//                   {/* <td className="py-2 px-4 border-b dark:border-gray-600">
//                     <button
//                       onClick={() => handleDelete(sensor.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div className="mt-4">
//             <button
//               onClick={fetchNextPage}
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//               Load More
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SensorDataTable;

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

import LineChart from "../chart";
import "chart.js"; // Ensure Chart.js is imported

const SensorDataTable = () => {
  const [sensorData, setSensorData] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [timeInterval, setTimeInterval] = useState("oneHour");

  const fetchSensorData = async (interval) => {
    try {
      const device1CollectionRef = collection(db, "device1");

      let q;

      switch (interval) {
        case "oneHour":
          q = query(
            device1CollectionRef,
            orderBy("myTimestamp", "desc"),
            limit(2)
          );
          break;
        case "sixHours":
          q = query(
            device1CollectionRef,
            orderBy("myTimestamp", "desc"),
            limit(12)
          );
          break;
        case "oneDay":
          q = query(
            device1CollectionRef,
            orderBy("myTimestamp", "desc"),
            limit(48)
          );
          break;
        case "oneWeek":
          q = query(
            device1CollectionRef,
            orderBy("myTimestamp", "desc"),
            limit(336)
          );
          break;
        default:
          // Default to one hour
          q = query(
            device1CollectionRef,
            orderBy("myTimestamp", "desc"),
            limit(2)
          );
      }

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
      setSensorData(data);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData(timeInterval);
  }, [timeInterval]);

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

  // const handleDelete = async (id) => {
  //   try {
  //     // const device1DocRef = doc(db, "device1", id);
  //     // await deleteDoc(device1DocRef);
  //     // setSensorData((prevData) =>
  //     //   prevData.filter((sensor) => sensor.id !== id)
  //     // );

  //     const confirmed = window.confirm(
  //       "Are you sure you want to delete this Data?"
  //     );
  //     if (confirmed) {
  //       try {
  //         const device1DocRef = doc(db, "device1", id);
  //         await deleteDoc(device1DocRef);
  //         setSensorData((prevData) =>
  //           prevData.filter((sensor) => sensor.id !== id)
  //         );
  //       } catch (error) {
  //         console.error("Error deleting sensor data:", error);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error deleting sensor data:", error);
  //   }
  // };

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setTimeInterval("oneHour")}
          className={`${
            timeInterval === "oneHour" ? "bg-blue-500" : "bg-blue-200"
          } hover:bg-blue-300 text-white font-bold py-2 px-4 rounded`}
        >
          One Hour
        </button>
        <button
          onClick={() => setTimeInterval("sixHours")}
          className={`${
            timeInterval === "sixHours" ? "bg-blue-500" : "bg-blue-200"
          } hover:bg-blue-300 text-white font-bold py-2 px-4 rounded`}
        >
          Six Hours
        </button>
        <button
          onClick={() => setTimeInterval("oneDay")}
          className={`${
            timeInterval === "oneDay" ? "bg-blue-500" : "bg-blue-200"
          } hover:bg-blue-300 text-white font-bold py-2 px-4 rounded`}
        >
          One Day
        </button>
        <button
          onClick={() => setTimeInterval("oneWeek")}
          className={`${
            timeInterval === "oneWeek" ? "bg-blue-500" : "bg-blue-200"
          } hover:bg-blue-300 text-white font-bold py-2 px-4 rounded`}
        >
          One Week
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2  gap-2">
        {sensorData.length > 0 && (
          <>
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
          </>
        )}
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
                <th className="py-2 px-4 border-b dark:border-gray-600">
                  Actions
                </th>
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
                  <td className="py-2 px-4 border-b dark:border-gray-600">
                    <button
                      onClick={() => handleDelete(sensor.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {sensorData.length > 0 && (
            <div className="mt-4">
              {/* <button
                onClick={fetchNextPage}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Load More
              </button> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SensorDataTable;
