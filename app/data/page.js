"use client";
// import { useState } from "react";
import Image from "next/image";

import "../styles/globals.css";
import SensorDataTable from "../components/SensorDataTable";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
// import Switch from "../components/Switch";

import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const dashboard = () => {
  return (
    <div>
      <div className="p-4  sm:ml-64">
        <SensorDataTable />
      </div>
    </div>
  );
};

export default dashboard;
