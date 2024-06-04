import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import LoginPage from "~/components/LoginPage";

interface IndexProps {
  onLoginSuccess: () => void; // Define the onLoginSuccess prop
}

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

const Index: React.FC<IndexProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle successful login
  const handleLoginSuccess = () => {
    onLoginSuccess(); // Call onLoginSuccess callback
    navigate("/dashboard"); // Navigate to the dashboard route
  };

  return (
    <div>
      <LoginPage onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default Index;
