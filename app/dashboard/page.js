"use client";
// import { useState } from "react";
import Image from "next/image";

import "../styles/globals.css";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Sensor from "../components/sensorsData";

import SetPointEdit from "../components/EditValue";

// import Switch from "../components/Switch";

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
          <Sensor />
          <SetPointEdit />

          {/* <h2 className="text-xl font-medium m-4 ">
            Temperature and Humidity Set Points
          </h2> */}

          {/* <div className="grid grid-cols-1 xl:grid-cols-3 mt-5 gap-2">
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
            <div className=""></div>
          </div>*/}
        </div>
      </div>
    </div>
  );
};

export default dashboard;