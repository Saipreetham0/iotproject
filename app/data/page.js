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
        {/* <div className=" container mx-auto p-4 border border-white  rounded-lg dark:border-gray-700 mt-1">
          <h2 className="text-xl font-medium m-4 ">
            Welcome back, UserName 🙂
          </h2>
          <h2 className="text-xl font-medium m-4 ">📊 Dashboard</h2>

        </div> */}

        
      </div>
    </div>
  );
};

export default dashboard;
