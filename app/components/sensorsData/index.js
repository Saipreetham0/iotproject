// pages/dashboard.js

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';



const fetchDataFromFirestore = async (sensorType) => {
  const firestore = firebase.firestore();

  try {
    const collectionRef = firestore.collection(sensorType);
    const snapshot = await collectionRef.get();

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.error(`Error fetching ${sensorType} data from Firestore:`, error);
    return [];
  }
};

const Dashboard = () => {
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [co2Data, setCO2Data] = useState([]);
  const [luxData, setLuxData] = useState([]);

  useEffect(() => {
    const fetchSensorData = async () => {
      const temperatureData = await fetchDataFromFirestore('temperature');
      const humidityData = await fetchDataFromFirestore('humidity');
      const co2Data = await fetchDataFromFirestore('co2');
      const luxData = await fetchDataFromFirestore('lux');

      setTemperatureData(temperatureData);
      setHumidityData(humidityData);
      setCO2Data(co2Data);
      setLuxData(luxData);
    };

    fetchSensorData();
  }, []);

  return (
    <div>

      <div>
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
      </div>
    </div>
  );
};

export default Dashboard;
