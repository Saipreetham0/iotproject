import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import Switch from "react-switch";

const SetPointEdit = () => {
  const [temperatureSetPointOn, setTemperatureSetPointOn] = useState("");
  const [temperatureSetPointOff, setTemperatureSetPointOff] = useState("");
  const [humiditySetPointOn, setHumiditySetPointOn] = useState("");
  const [humiditySetPointOff, setHumiditySetPointOff] = useState("");
  const [isEditingTemperature, setIsEditingTemperature] = useState(false);
  const [isEditingHumidity, setIsEditingHumidity] = useState(false);

  const [lightRelay1, setLightRelay1] = useState(false);
  const [lightRelay2, setLightRelay2] = useState(false);

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

          if (docsData.length > 0) {
            const {
              Tem_SetPoint_on,
              Tem_SetPoint_off,
              Hum_SetPoint_on,
              Hum_SetPoint_off,
              Light_Relay_1,
              Light_Relay_2,
            } = docsData[0];

            setTemperatureSetPointOn(Tem_SetPoint_on || "");
            setTemperatureSetPointOff(Tem_SetPoint_off || "");
            setHumiditySetPointOn(Hum_SetPoint_on || "");
            setHumiditySetPointOff(Hum_SetPoint_off || "");
            setLightRelay1(Light_Relay_1 || false);
            setLightRelay2(Light_Relay_2 || false);
          }
        } else {
          console.log("No documents found");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  const handleEditTemperature = () => {
    setIsEditingTemperature(true);
  };

  const handleSaveTemperature = async () => {
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    await updateDoc(deviceDoc, {
      Tem_SetPoint_on: temperatureSetPointOn,
      Tem_SetPoint_off: temperatureSetPointOff,
    });
    setIsEditingTemperature(false);
  };

  const handleEditHumidity = () => {
    setIsEditingHumidity(true);
  };

  const handleSaveHumidity = async () => {
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    await updateDoc(deviceDoc, {
      Hum_SetPoint_on: humiditySetPointOn,
      Hum_SetPoint_off: humiditySetPointOff,
    });
    setIsEditingHumidity(false);
  };

  const handleToggleLightRelay1 = (checked) => {
    const newValue = checked ? 1 : 0;
    setLightRelay1(newValue);

    // Add logic to update Firestore with the new value
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    updateDoc(deviceDoc, { Light_Relay_1: newValue }).catch((error) => {
      console.error("Error updating Light_Relay_1:", error);
    });
  };

  const handleToggleLightRelay2 = (checked) => {
    const newValue = checked ? 1 : 0;
    setLightRelay2(newValue);

    // Add logic to update Firestore with the new value
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    updateDoc(deviceDoc, { Light_Relay_2: newValue }).catch((error) => {
      console.error("Error updating Light_Relay_2:", error);
    });
  };

  const handleTurnOnRelay1 = async () => {
    // Add logic to update Firestore and setLightRelay1(true)
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    await updateDoc(deviceDoc, { Light_Relay_1: 1 });
    setLightRelay1(true);
  };

  const handleTurnOffRelay1 = async () => {
    // Add logic to update Firestore and setLightRelay1(false)
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    await updateDoc(deviceDoc, { Light_Relay_1: 0 });
    setLightRelay1(false);
  };

  const handleTurnOnRelay2 = async () => {
    // Add logic to update Firestore and setLightRelay2(true)
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    await updateDoc(deviceDoc, { Light_Relay_2: 1 });
    setLightRelay2(true);
  };

  const handleTurnOffRelay2 = async () => {
    // Add logic to update Firestore and setLightRelay2(false)
    const devicesCollection = collection(db, "devices");
    const deviceDoc = doc(devicesCollection, "iot-project");
    await updateDoc(deviceDoc, { Light_Relay_2: 0 });
    setLightRelay2(false);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 mt-5 gap-2">
      {/* Temperature */}
      <div>
        <h2 className="text-xl font-medium m-2 ">Temperature</h2>
        <div className="xl:w-3/5">
          <label className="font-medium dark:text-white">Set Point On</label>
          <input
            type="number"
            value={temperatureSetPointOn}
            onChange={(e) => setTemperatureSetPointOn(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            disabled={!isEditingTemperature}
          />
        </div>
        <div className="xl:w-3/5">
          <label className="font-medium dark:text-white">Set Point off</label>
          <input
            type="number"
            value={temperatureSetPointOff}
            onChange={(e) => setTemperatureSetPointOff(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            disabled={!isEditingTemperature}
          />
        </div>

        <div className="flex gap-2">
          {isEditingTemperature && (
            <>
              <button
                type="button"
                onClick={handleSaveTemperature}
                className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditingTemperature(false)}
                className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-gray-500 hover:bg-gray-400 active:bg-gray-500 rounded-lg duration-150"
              >
                Cancel
              </button>
            </>
          )}
          {!isEditingTemperature && (
            <button
              type="button"
              onClick={handleEditTemperature}
              className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      {/* Humidity */}
      <div className="">
        <h2 className="text-xl font-medium m-2 ">Humidity</h2>
        <div className="xl:w-3/5">
          <label className="font-medium dark:text-white">Set Point On</label>
          <input
            type="number"
            value={humiditySetPointOn}
            onChange={(e) => setHumiditySetPointOn(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            disabled={!isEditingHumidity}
          />
        </div>
        <div className=" xl:w-3/5">
          <label className="font-medium dark:text-white">Set Point off</label>
          <input
            type="number"
            value={humiditySetPointOff}
            onChange={(e) => setHumiditySetPointOff(e.target.value)}
            required
            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
            disabled={!isEditingHumidity}
          />
        </div>

        <div className="flex gap-2">
          {isEditingHumidity && (
            <>
              <button
                type="button"
                onClick={handleSaveHumidity}
                className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
              >
                Save
              </button>

              <button
                type="button"
                onClick={() => setIsEditingHumidity(false)}
                className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-gray-500 hover:bg-gray-400 active:bg-gray-500 rounded-lg duration-150"
              >
                Cancel
              </button>
            </>
          )}
          {!isEditingHumidity && (
            <button
              type="button"
              onClick={handleEditHumidity}
              className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="">
        <div className="rounded-lg p-4 shadow-md">
          <h2 className="text-xl font-medium mb-2">Light Relay 1</h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 mr-4">
              Relay Control
            </label>
            <Switch
              onChange={handleToggleLightRelay1}
              checked={lightRelay1}
              onColor="#10B981"
              offColor="#EF4444"
              //   disabled={!isEditingHumidity}
            />
            {/* <button
              type="button"
              onClick={lightRelay1 ? handleTurnOffRelay1 : handleTurnOnRelay1}
              className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              {lightRelay1 ? "Turn Off" : "Turn On"}
            </button> */}
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2">Light Relay 2</h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 mr-4">
              Relay Control
            </label>
            <Switch
              onChange={handleToggleLightRelay2}
              checked={lightRelay2}
              onColor="#10B981"
              offColor="#EF4444"
              //   disabled={!isEditingHumidity}
            />
            {/* <button
              type="button"
              onClick={lightRelay2 ? handleTurnOffRelay2 : handleTurnOnRelay2}
              className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
            >
              {lightRelay2 ? "Turn Off" : "Turn On"}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPointEdit;
