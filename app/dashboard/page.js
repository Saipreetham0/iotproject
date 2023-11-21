"use client";
// import { useState } from "react";
import Image from "next/image";

import "../styles/globals.css";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Switch from "../components/Switch";

import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const dashboard = () => {
  const handleButton = () => {
    router.push("/create");
  };

  return (
    <div>
      <div className="p-4  sm:ml-64">
        <div className=" container mx-auto p-4 border border-white  rounded-lg dark:border-gray-700 mt-1">
          <h2 className="text-xl font-medium m-4 ">
            Welcome back, UserName 🙂
          </h2>
          <h2 className="text-xl font-medium m-4 ">📊 Dashboard</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-4">
            <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
                Temperature
              </h2>

              <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
                Numbers
              </p>
            </div>

            <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
                Humidity
              </h2>

              <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
                Numbers
              </p>
            </div>
            <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
                C02
              </h2>

              <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
                Numbers
              </p>
            </div>
            <div className=" h-32 md:h-28 lg:h-32  dark:bg-gray-800  bg-white border rounded-lg p-4 shadow-md">
              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl  font-semibold">
                Lux
              </h2>

              <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
                Numbers
              </p>
            </div>

            {/* <div className="h-32 md:h-28 lg:h-32 bg-gradient-to-r from-indigo-500 to-purple-500 border rounded-lg p-4 shadow-md">
              <button className="h-full w-full flex flex-col items-center justify-center text-white bg-transparent border border-white rounded-lg transition-all duration-300 hover:bg-white hover:text-indigo-500 focus:outline-none">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
                  Total Forms
                </h2>
                <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
                  Numbers
                </p>
              </button>
            </div> */}
          </div>
          {/* <h2 className="text-xl font-medium m-4 ">
            Temperature and Humidity Set Points
          </h2> */}

          <div className="grid grid-cols-1 xl:grid-cols-3 mt-5 gap-2">
            <div>
              <h2 className="text-xl font-medium m-2 ">Temperature</h2>
              <div className="xl:w-3/5">
                <label className="font-medium dark:text-white ">
                  Set Point On
                </label>
                <input
                  type="number"
                  // placeholder="Email"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
                />
              </div>
              <div className="xl:w-3/5">
                <label className="font-medium dark:text-white ">
                  Set Point off
                </label>
                <input
                  type="number"
                  // placeholder="Email"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="w-1/3 xl:w-1/6 px-4 py-2 mt-2   text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Edit
                </button>

                <button
                  type="submit"
                  className="w-1/3 xl:w-1/6 px-4 py-2 mt-2   text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="">
              <h2 className="text-xl font-medium m-2 ">Humidity</h2>
              <div className="xl:w-3/5">
                <label className="font-medium dark:text-white ">
                  Set Point On
                </label>
                <input
                  type="number"
                  // placeholder="Email"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
                />
              </div>
              <div className=" xl:w-3/5">
                <label className="font-medium dark:text-white ">
                  Set Point off
                </label>
                <input
                  type="number"
                  // placeholder="Email"
                  //   value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg dark:text-white dark:border-gray-200"
                />
              </div>
              <div className="flex  gap-2">
                <button
                  type="submit"
                  className="w-1/3 xl:w-1/6 px-4 py-2 mt-2   text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Edit
                </button>

                <button
                  type="submit"
                  className="w-1/3 xl:w-1/6 px-4 py-2 mt-2   text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                >
                  Save
                </button>
              </div>
            </div>
            <div className="">
              {/* <Switch />
              <Switch /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default dashboard;
