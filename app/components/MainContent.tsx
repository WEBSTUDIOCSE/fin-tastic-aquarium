import { useNavigate } from "@remix-run/react";

const MainContent = () => {
  const navigate = useNavigate();

  const handleExploreClick = () => {
    navigate("/explore");
  };

  return (
    <div className="container mx-auto p-8">
      {/* Image and Text Content */}
      <div className="md:flex md:items-center">
        {/* Image Section (Right for larger screens) */}
        <div className="md:flex-1 md:order-2">
          <img
            src="/fish.png" // Replace with your image path
            alt="Aquarium"
            className="w-full h-auto rounded"
          />
        </div>
        {/* Text Content Section (Left for larger screens) */}
        <div className="md:flex-1 md:order-1 text-center md:text-left mb-8 md:mb-0">
          <p className="text-[62px] font-bold mb-4">
            Discover The Ocean's Beauty
          </p>
          <p className="text-lg mb-8 text-gray-600">
            Dive into the mesmerizing world of aquatic life and create your own
            underwater paradise.
          </p>
          <button
            onClick={handleExploreClick}
            className="px-6 py-2 bg-secondary text-background rounded hover:bg-secondary-dark transition duration-300 mb-8"
          >
            Explore
          </button>
          <div className="flex justify-center text-text md:justify-start space-x-4">
            <div className="border  rounded p-4 text-center w-24">
              <p className="text-2xl font-bold">100</p>
              <p className="text-sm">Species</p>
            </div>
            <div className="border rounded p-4 text-center w-24">
              <p className="text-2xl font-bold">1</p>
              <p className="text-sm">Aquarium</p>
            </div>
            <div className="border rounded p-4 text-center w-24">
              <p className="text-2xl font-bold">300+</p>
              <p className="text-sm">Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
