import React, { useState, useEffect } from "react";
// import { database } from "@/utils/firebase";

import { getDatabase, ref, onValue, update } from "firebase/database";

import Switch from "react-switch";

const SetPointEdit = () => {
  const [temperatureSetPointOn, setTemperatureSetPointOn] = useState();
  const [temperatureSetPointOff, setTemperatureSetPointOff] = useState();
  const [humiditySetPointOn, setHumiditySetPointOn] = useState();
  const [humiditySetPointOff, setHumiditySetPointOff] = useState();

  const [dehumidifierSetPointOn, setDehumidifierSetPointOn] = useState();
  const [dehumidifierSetPointOff, setDehumidifierSetPointOff] = useState();
  const [isEditingDeHumidity, setIsEditingDeHumidity] = useState(false);
  const [isEditingTemperature, setIsEditingTemperature] = useState(false);
  const [isEditingHumidity, setIsEditingHumidity] = useState(false);

  const [lightRelay1, setLightRelay1] = useState(false);
  const [lightRelay2, setLightRelay2] = useState(false);

  const [lightRelay3, setLightRelay3] = useState(false);
  const [lightRelay4, setLightRelay4] = useState(false);
  const [lightRelay5, setLightRelay5] = useState(false);

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

      const relay3Ref = ref(db, "board1/outputs/digital/12");
      onValue(relay3Ref, (snapshot) => {
        const value = snapshot.val();
        setLightRelay3(value === 1);
      });

      const relay4Ref = ref(db, "board1/outputs/digital/13");
      onValue(relay4Ref, (snapshot) => {
        const value = snapshot.val();
        setLightRelay4(value === 1);
      });

      const relay5Ref = ref(db, "board1/outputs/digital/22");
      onValue(relay5Ref, (snapshot) => {
        const value = snapshot.val();
        setLightRelay5(value === 1);
      });

      onValue(devicesRef, (snapshot) => {
        const data = snapshot.val();

        if (data) {
          const {
            temp_set_point_on,
            temp_set_point_off,
            humd_set_point_on,
            humd_set_point_off,
            dehumd_set_point_on,
            dehumd_set_point_off,
            23: lightRelay1,
            4: lightRelay2,
            19: lightRelay3,
            13: lightRelay4,
            25: lightRelay5,
          } = data;

          setTemperatureSetPointOn(temp_set_point_on || "");
          setTemperatureSetPointOff(temp_set_point_off || "");
          setHumiditySetPointOn(humd_set_point_on || "");
          setHumiditySetPointOff(humd_set_point_off || "");
          setDehumidifierSetPointOn(dehumd_set_point_on || "");
          setDehumidifierSetPointOff(dehumd_set_point_off || "");
          setLightRelay1(lightRelay1 === 0);
          setLightRelay2(lightRelay2 === 0);
          setLightRelay3(lightRelay3 === 0);
          setLightRelay4(lightRelay4 === 0);
          setLightRelay5(lightRelay5 === 0);
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
      temp_set_point_on: parseFloat(temperatureSetPointOn, 10),
      temp_set_point_off: parseFloat(temperatureSetPointOff, 10),
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
      humd_set_point_on: parseFloat(humiditySetPointOn, 10),
      humd_set_point_off: parseFloat(humiditySetPointOff, 10),
    };

    update(devicesRef, updates);

    setIsEditingHumidity(false);
  };

  // const handleEditDeHumidity = () => {
  //   setIsEditingDeHumidity(true);
  // };

  // const handleSaveDeHumidity = async () => {
  //   const db = getDatabase();
  //   const devicesRef = ref(db, "board1/outputs/digital");

  //   const updates = {
  //     dehumd_set_point_on: parseFloat(dehumiditySetPointOn, 10),
  //     dehumd_set_point_off: parseFloat(dehumiditySetPointOff, 10),
  //   };

  //   update(devicesRef, updates);

  //   setIsEditingDeHumidity(false);
  // };

  const handleEditDeHumidity = () => {
    setIsEditingDeHumidity(true);
  };

  const handleSaveDeHumidity = async () => {
    const db = getDatabase();
    const devicesRef = ref(db, "board1/outputs/digital");

    const updates = {
      // ... (existing updates)

      dehumd_set_point_on: parseFloat(dehumidifierSetPointOn, 10),
      dehumd_set_point_off: parseFloat(dehumidifierSetPointOff, 10),
    };

    update(devicesRef, updates);

    setIsEditingDeHumidity(false);
  };

  // For relay 1
  const handleToggleLightRelay1 = (checked) => {
    handleToggleLightRelay(23, checked);
  };

  // For relay 2
  const handleToggleLightRelay2 = (checked) => {
    handleToggleLightRelay(4, checked);
  };

  // For relay 3 (and so on...)
  const handleToggleLightRelay3 = (checked) => {
    handleToggleLightRelay(19, checked);
  };

  const handleToggleLightRelay4 = (checked) => {
    handleToggleLightRelay(13, checked);
  };

  const handleToggleLightRelay5 = (checked) => {
    handleToggleLightRelay(25, checked);
  };

  const handleToggleLightRelay = (relayNumber, checked) => {
    console.log(`Toggling Relay ${relayNumber} to ${checked}`);
    const newValue = checked ? 0 : 1;

    // Update Realtime Database with the new value for the specified relay
    const relayRef = ref(database, `board1/outputs/digital`);

    // Wrap newValue in an object with the key you want to update
    update(relayRef, { [relayNumber]: newValue })
      .then(() => console.log(`Relay ${relayNumber} updated successfully.`))
      .catch((error) =>
        console.error(`Error updating Relay ${relayNumber}:`, error)
      );
  };

  const relayData = [
    {
      relayNumber: 1,
      state: lightRelay1,
      handleToggle: handleToggleLightRelay1,
    },
    {
      relayNumber: 2,
      state: lightRelay2,
      handleToggle: handleToggleLightRelay2,
    },
    {
      relayNumber: 3,
      state: lightRelay3,
      handleToggle: handleToggleLightRelay3,
    },
    {
      relayNumber: 4,
      state: lightRelay4,
      handleToggle: handleToggleLightRelay4,
    },
    {
      relayNumber: 5,
      state: lightRelay5,
      handleToggle: handleToggleLightRelay5,
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 xl:grid-cols-2 mt-5 gap-2">
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

        {/* Dehumidity */}
        <div className="">
          <h2 className="text-xl font-medium m-2 ">Dehumidity</h2>
          <div className="xl:w-3/5">
            <label className="font-medium dark:text-white">Set Point On</label>
            <input
              type="number"
              value={dehumidifierSetPointOn}
              onChange={(e) => setDehumidifierSetPointOn(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
              disabled={!isEditingDeHumidity}
            />
          </div>
          <div className=" xl:w-3/5">
            <label className="font-medium dark:text-white">Set Point off</label>
            <input
              type="number"
              value={dehumidifierSetPointOff}
              onChange={(e) => setDehumidifierSetPointOff(e.target.value)}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
              disabled={!isEditingDeHumidity}
            />
          </div>

          <div className="flex gap-2">
            {isEditingDeHumidity && (
              <>
                <button
                  type="button"
                  onClick={handleSaveDeHumidity}
                  className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Save
                </button>

                <button
                  type="button"
                  onClick={() => setIsEditingDeHumidity(false)}
                  className="w-1/3 xl:w-1/6 px-4 py-2 mt-2 text-white font-medium bg-gray-500 hover:bg-gray-400 active:bg-gray-500 rounded-lg duration-150"
                >
                  Cancel
                </button>
              </>
            )}
            {!isEditingDeHumidity && (
              <button
                type="button"
                onClick={handleEditDeHumidity}
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

        {/* <div className="">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">Light 1</h2>
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
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">Light 2</h2>
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
      </div> */}

        {/* <div className="">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">Light 1</h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 dark:text-gray-300 mr-4">
              Relay Control
            </label>
            <Switch
              onChange={handleToggleLightRelay3}
              checked={lightRelay3}
              onColor="#10B981"
              offColor="#EF4444"
              //   disabled={!isEditingHumidity}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">Light 2</h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 dark:text-gray-300 mr-4">
              Relay Control
            </label>
            <Switch
              onChange={handleToggleLightRelay4}
              checked={lightRelay4}
              onColor="#10B981"
              offColor="#EF4444"
            />
          </div>
        </div>
      </div> */}
        {/*
      <div className="">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">Light 1</h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 dark:text-gray-300 mr-4">
              Relay Control
            </label>
            <Switch
              onChange={handleToggleLightRelay5}
              checked={lightRelay5}
              onColor="#10B981"
              offColor="#EF4444"
              //   disabled={!isEditingHumidity}
            />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
          <h2 className="text-xl font-medium mb-2 dark:text-white">Light 2</h2>
          <div className="flex items-center">
            <label className="font-medium text-gray-700 dark:text-gray-300 mr-4">
              Relay Control
            </label>
            <Switch
              onChange={handleToggleLightRelay6}
              checked={lightRelay6}
              onColor="#10B981"
              offColor="#EF4444"
            />
          </div>
        </div>
      </div> */}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 mt-5 gap-2">
        {relayData.map((relay) => (
          <div key={relay.relayNumber} className="">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mt-4 shadow-md">
              <h2 className="text-xl font-medium mb-2 dark:text-white">
                Light {relay.relayNumber}
              </h2>
              <div className="flex items-center">
                <label className="font-medium text-gray-700 dark:text-gray-300 mr-4">
                  Relay Control
                </label>
                <Switch
                  onChange={(checked) => relay.handleToggle(checked)}
                  checked={relay.state}
                  onColor="#10B981"
                  offColor="#EF4444"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SetPointEdit;
