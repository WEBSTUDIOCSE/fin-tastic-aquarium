import React, { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "~/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FishGallery = () => {
  const [images, setImages] = useState<File[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setStatus("Please select at least one image.");
      return;
    }

    setLoading(true);
    const urls: string[] = [];
    try {
      for (const image of images) {
        const imageRef = ref(storage, `fish-gallery/${image.name}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        urls.push(downloadURL);
        await addDoc(collection(db, "FishGallery"), {
          imageUrl: downloadURL,
          createdAt: new Date(),
        });
      }
      setStatus("Images uploaded successfully!");
      setImages([]);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">Fish Gallery</h1>
      <form onSubmit={handleUpload} className="max-w-sm mx-auto mb-4">
        <label htmlFor="imageUpload" className="block text-center mb-2">
          Upload Image(s):
        </label>
        <input
          type="file"
          id="imageUpload"
          onChange={handleImageChange}
          multiple
          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {status && <p className="text-center mt-2">{status}</p>}
    </div>
  );
};

export default FishGallery;
