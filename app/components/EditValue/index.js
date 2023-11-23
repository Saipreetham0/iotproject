import React, { useState, useEffect } from "react";
// import { database } from "@/utils/firebase";

import { getDatabase, ref, onValue, update } from "firebase/database";

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

  const database = getDatabase();

  useEffect(() => {
    const fetchData = () => {
      // Replace with your Realtime Database URL
      const db = getDatabase();

      const devicesRef = ref(db, "board1/outputs/digital");

      // Listen for changes on relay 1
      const relay1Ref = ref(db, "board1/outputs/digital/25");
      onValue(relay1Ref, (snapshot) => {
        const value = snapshot.val();

        setLightRelay1(value === 1);
      });

      const relay2Ref = ref(db, "board1/outputs/digital/26");
      onValue(relay2Ref, (snapshot) => {
        const value = snapshot.val();
        setLightRelay2(value === 1);
      });

      onValue(devicesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const {
            temp_set_point_on,
            temp_set_point_off,
            humd_set_point_on,
            humd_set_point_off,
            25: lightRelay1,
            26: lightRelay2,
          } = data;

          setTemperatureSetPointOn(temp_set_point_on || "");
          setTemperatureSetPointOff(temp_set_point_off || "");
          setHumiditySetPointOn(humd_set_point_on || "");
          setHumiditySetPointOff(humd_set_point_off || "");
          setLightRelay1(lightRelay1 === 1);
          setLightRelay2(lightRelay2 === 1);
        }
      });
    };

    fetchData();
  }, []);

  const handleEditTemperature = () => {
    setIsEditingTemperature(true);
  };

  const handleSaveTemperature = async () => {
    const db = getDatabase();
    const devicesRef = ref(db, "board1/outputs/digital");

    const updates = {
      temp_set_point_on: temperatureSetPointOn,
      temp_set_point_off: temperatureSetPointOff,
    };

    update(devicesRef, updates);

    setIsEditingTemperature(false);
  };

  const handleEditHumidity = () => {
    setIsEditingHumidity(true);
  };

  const handleSaveHumidity = async () => {
    const db = getDatabase();
    const devicesRef = ref(db, "board1/outputs/digital");

    const updates = {
      humd_set_point_on: humiditySetPointOn,
      humd_set_point_off: humiditySetPointOff,
    };

    update(devicesRef, updates);

    setIsEditingHumidity(false);
  };

  const handleToggleLightRelay1 = (checked) => {
    const newValue = checked ? 1 : 0;

    // Update Realtime Database with the new value for relay 1
    const relay1Ref = ref(database, "board1/outputs/digital");

    // Wrap newValue in an object with the key you want to update
    update(relay1Ref, { 25: newValue });
  };

  const handleToggleLightRelay2 = (checked) => {
    const newValue = checked ? 1 : 0;

    // Update Realtime Database with the new value for relay 2
    const relay2Ref = ref(database, "board1/outputs/digital");

    // Wrap newValue in an object with the key you want to update
    update(relay2Ref, { 26: newValue });
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
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">
            Light Relay 1
          </h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 dark:text-gray-300 mr-4">
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

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">
            Light Relay 2
          </h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 dark:text-gray-300 mr-4">
              Relay Control
            </label>
            <Switch
              onChange={handleToggleLightRelay2}
              checked={lightRelay2}
              onColor="#10B981"
              offColor="#EF4444"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPointEdit;
