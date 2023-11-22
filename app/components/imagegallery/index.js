// pages/index.js or any Next.js component
// "use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import firebase from "firebase/app";
import app, { db } from "@/utils/firebase";
import { doc, getDoc, collection } from "firebase/firestore";

const ImageGallery = () => {
  const [galleryURL, setGalleryURL] = useState("");

  // useEffect(() => {
  //   const getGalleryURL = async () => {
  //     const colRef = collection(db, "gallery");
  //     const querySnapshot = await getDocs(colRef);

  //     querySnapshot.forEach((doc) => {
  //       const data = doc.data();
  //       console.log(data);
  //       const url = data.url;
  //       setGalleryURL(url);
  //     });
  //   };

  //   getGalleryURL();
  // }, []);

  return (
    <div>
      <h1>Images</h1>
      <div>
        {/* <div><ImageGallery url={galleryURL} /></div> */}
      </div>
    </div>
  );
};

export default ImageGallery;
