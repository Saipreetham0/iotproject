"use client";
// import { useState } from "react";
import Image from "next/image";

import "../styles/globals.css";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Sensor from "../components/sensorsData";
import SetPointEdit from "../components/EditValue";

import { getAuth, onAuthStateChanged } from "firebase/auth";


const dashboard = () => {


  return (
    <div>
      <div className="p-4  sm:ml-64">
        <div className=" container mx-auto p-4 border border-white  rounded-lg dark:border-gray-700 mt-1">
          {/* <h2 className="text-xl font-medium m-4 ">
            Welcome back, UserName 🙂
          </h2> */}
          <Sensor />
          <h2 className="text-xl font-medium m-5 ">
            Temperature and Humidity Set Points
          </h2>
          <SetPointEdit />
        </div>
      </div>
    </div>
  );
};

export default dashboard;
