import React, { useEffect, useState } from "react";
import { db } from "~/firebaseConfig";
import {
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  getDocs,
} from "firebase/firestore";

const Gallery = () => {
  const [images, setImages] = useState<{ src: string; alt: string }[]>([]);

  useEffect(() => {
    // Function to fetch images from Firestore
    const fetchImages = async () => {
      try {
        const imagesCollection = collection(db, "FishGallery");
        const querySnapshot = await getDocs(imagesCollection); // Use getDocs to retrieve documents

        const fetchedImages: { src: string; alt: string }[] = [];
        querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          // Each document represents an image
          fetchedImages.push({
            src: doc.data().imageUrl,
            alt: doc.data().createdAt.toDate().toLocaleDateString(), // Use createdAt as alt text (you can adjust this)
          });
        });
        console.log(fetchedImages, "Imagess");
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages(); // Fetch images when component mounts

    // Cleanup function
    return () => {
      // Cleanup logic (if any)
    };
  }, []); // Run effect only once when component mounts

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Fish Gallery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg shadow-lg relative"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover hover:scale-105 transform transition duration-300"
              />
              <p className="text-center absolute bottom-0  bg-opacity-50 text-white p-2 w-full">
                {image.alt}
              </p>{" "}
              {/* Overlapping text with absolute positioning */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
