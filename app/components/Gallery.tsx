import React, { useState, ChangeEvent, FormEvent } from "react";
import { db, storage } from "~/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function FishGallery() {
  const [image, setImage] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();
    if (!image) {
      setStatus("Please select an image first.");
      return;
    }

    setLoading(true);
    const imageRef = ref(storage, `fish-gallery/${image.name}`);
    try {
      await uploadBytes(imageRef, image);
      const downloadURL = await getDownloadURL(imageRef);
      await addDoc(collection(db, "FishGallery"), {
        imageUrl: downloadURL,
        createdAt: new Date(),
      });
      setStatus("Image uploaded and URL saved successfully!");
      setImage(null);
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Fish Gallery</h1>
      <form onSubmit={handleUpload}>
        <div>
          <label htmlFor="imageUpload">Upload Image:</label>
          <input type="file" id="imageUpload" onChange={handleImageChange} />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
