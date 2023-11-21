// pages/index.js or any Next.js component
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
// import firebase from "firebase/app";
import app from "@/utils/firebase";
import { getStorage, ref, listAll } from "firebase/storage";

// import storage from "firebase"

const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, "data");

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    listAll(listRef)
      .then((res) => {
        const imageURLs = res.items.map((itemRef) => {
          return itemRef.getDownloadURL();
          console.log(itemRef.getDownloadURL());
          console.log(itemRef);
        });

        Promise.all(imageURLs).then((urls) => {
          setImages(urls);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Images</h1>
      <ul>
        {images.map((imageUrl) => (
          <li key={imageUrl}>
            <img src={imageUrl} alt="Image" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;
