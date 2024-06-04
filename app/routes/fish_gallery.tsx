import React, { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "~/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FishGallery = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imageNames, setImageNames] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(filesArray);
      // Reset image names when changing images
      setImageNames([]);
    }
  };

  const handleNameChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newNames = [...imageNames];
    newNames[index] = e.target.value;
    setImageNames(newNames);
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setStatus("Please select at least one image.");
      return;
    }

    if (imageNames.length !== images.length) {
      setStatus("Please provide a name for each image.");
      return;
    }

    setLoading(true);
    const urls: string[] = [];
    try {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const imageName = imageNames[i];
        const imageRef = ref(storage, `fish-gallery/${imageName}`);
        await uploadBytes(imageRef, image);
        const downloadURL = await getDownloadURL(imageRef);
        urls.push(downloadURL);
        await addDoc(collection(db, "FishGallery"), {
          imageUrl: downloadURL,
          imageName: imageName,
          createdAt: new Date(),
        });
      }
      setStatus("Images uploaded successfully!");
      setImages([]);
      setImageNames([]);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Fish Gallery</h1>
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleUpload}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <div>
            <label htmlFor="imageUpload" className="text-lg font-semibold">
              Upload Image(s):
            </label>
            <input
              type="file"
              id="imageUpload"
              onChange={handleImageChange}
              multiple
              className="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    className="w-full h-48 object-cover"
                  />
                  <input
                    type="text"
                    placeholder={`Name for image ${index + 1}`}
                    value={imageNames[index] || ""}
                    onChange={(e) => handleNameChange(e, index)}
                    className="p-2 border-t border-gray-200 w-full focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
            {status && (
              <p className="text-center mt-4 text-green-600">{status}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FishGallery;
