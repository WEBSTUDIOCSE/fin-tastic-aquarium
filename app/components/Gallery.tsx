import React from "react";

const Gallery = () => {
  const images = [
    {
      src: "https://i.natgeofe.com/n/fcfb6198-4a0f-4c73-988c-b07be7d8d888/STOCKPKG_MJ8859___DSC2961.jpg",
      alt: "Fish 1",
    },
    {
      src: "https://i.natgeofe.com/n/fcfb6198-4a0f-4c73-988c-b07be7d8d888/STOCKPKG_MJ8859___DSC2961.jpg",
      alt: "Fish 2",
    },
    {
      src: "https://i.natgeofe.com/n/fcfb6198-4a0f-4c73-988c-b07be7d8d888/STOCKPKG_MJ8859___DSC2961.jpg",
      alt: "Fish 3",
    },
    {
      src: "https://i.natgeofe.com/n/fcfb6198-4a0f-4c73-988c-b07be7d8d888/STOCKPKG_MJ8859___DSC2961.jpg",
      alt: "Fish 4",
    },
    {
      src: "https://i.natgeofe.com/n/fcfb6198-4a0f-4c73-988c-b07be7d8d888/STOCKPKG_MJ8859___DSC2961.jpg",
      alt: "Fish 5",
    },
    {
      src: "https://i.natgeofe.com/n/fcfb6198-4a0f-4c73-988c-b07be7d8d888/STOCKPKG_MJ8859___DSC2961.jpg",
      alt: "Fish 6",
    },
    // Add more images as needed
  ];

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
