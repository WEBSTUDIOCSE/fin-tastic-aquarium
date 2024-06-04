import { useNavigate } from "@remix-run/react";
import React from "react";

const dashboard = () => {
  const navigate = useNavigate();
  const navigateToFishGallery = () => {
    navigate("/fish_gallery");
  };
  return (
    <div>
      {" "}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
        <div className="grid grid-cols-2 gap-4">
          <div
            className="dashboard-tile cursor-pointer"
            onClick={navigateToFishGallery}
          >
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
              Fish Gallery
            </div>
          </div>
          {/* Add more tiles for other components */}
        </div>
      </div>
    </div>
  );
};

export default dashboard;
