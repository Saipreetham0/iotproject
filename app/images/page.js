"use client";
// import { useState } from "react";
import Image from "next/image";

import "../styles/globals.css";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Switch from "../components/Switch";

import app from "@/utils/firebase";
import ImageGallery from "../components/imagegallery";

import { DocumentPlusIcon } from "@heroicons/react/24/outline";

const images = () => {
  return (
    <div>
      <div className="p-4  sm:ml-64">
        <ImageGallery />
      </div>
    </div>
  );
};

export default images;
