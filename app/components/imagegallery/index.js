// pages/index.js or any Next.js component
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs } from "firebase/firestore";

const ImageGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchGalleryImages = async () => {
      const colRef = collection(db, "gallery");
      const querySnapshot = await getDocs(colRef);

      const imagesData = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const imageUrl = data.myUrl;
        console.log(imageUrl);

        // Ensure the document has a valid URL before adding to the array
        if (imageUrl) {
          imagesData.push({ id: doc.id, imageUrl });
        }
      });

      setGalleryImages(imagesData);
    };

    fetchGalleryImages();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  justify-center items-center">
      {galleryImages.map((image) => (
        <div key={image.id}>
          {/* Ensure that the image URL is correctly formatted */}
          <Image
            src={image.imageUrl}
            alt="Gallery Image"
            width={300}
            height={200}
            className="rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
