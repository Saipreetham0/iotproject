// pages/index.js or any Next.js component
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const ImageGallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleDeleteImage = async () => {
    if (!selectedImage) {
      return;
    }

    const confirmed = window.confirm("Are you sure you want to delete this image?");
    if (confirmed) {
      try {
        const imageDocRef = doc(collection(db, "gallery"), selectedImage.id);
        await deleteDoc(imageDocRef);
        setGalleryImages((prevImages) =>
          prevImages.filter((image) => image.id !== selectedImage.id)
        );
        setSelectedImage(null);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4  justify-center items-center">
      {galleryImages.map((image) => (
        <div key={image.id} className="relative">
          {/* Ensure that the image URL is correctly formatted */}
          <Image
            src={image.imageUrl}
            alt="Gallery Image"
            width={300}
            height={200}
            className="rounded-lg cursor-pointer"
            onClick={() => handleImageClick(image)}
          />
        </div>
      ))}

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <p>Selected Image:</p>
            <Image
              src={selectedImage.imageUrl}
              alt="Selected Image"
              width={600}
              height={400}
              className="rounded-lg"
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteImage}
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
