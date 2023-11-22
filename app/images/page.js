"use client";
// import { useState } from "react";
import Image from "next/image";

import "../styles/globals.css";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
// import Switch from "../components/Switch";

import app from "@/utils/firebase";
import ImageGallery from "../components/imagegallery";



import { getFirestore } from "firebase/firestore";

const db = getFirestore();

const images = () => {
  return (
    <div>
      <div className="p-4 flex items-center sm:ml-64">
        <ImageGallery />
      </div>
    </div>
  );
};

export default images;
