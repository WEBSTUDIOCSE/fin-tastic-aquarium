import React, { useState, useEffect } from "react";
import { useNavigate } from "@remix-run/react"; // Import useNavigate from Remix

const LoginPage = ({ onLoginSuccess }: any) => {
  // Accept onLoginSuccess prop
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to set a cookie
  const setCookie = (name: string, value: any, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  // Function to get a cookie by name
  const getCookie = (name: any) => {
    const cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  // Function to handle login
  const handleLogin = () => {
    if (username === "Saurabh" && password === "Saurabh@123321") {
      setCookie("username", username, 1); // Set username cookie for 1 day
      setCookie("isLoggedIn", true, 1); // Set isLoggedIn cookie for 1 day
      navigate("/dashboard"); // Navigate to dashboard if logged in
    } else if (username === "Sarth" && password === "Sarth@123") {
      setCookie("username", username, 1); // Set username cookie for 1 day
      setCookie("isLoggedIn", true, 1); // Set isLoggedIn cookie for 1 day
      navigate("/dashboard"); // Navigate to dashboard if logged in
    } else {
      setError("Invalid username or password.");
    }
  };

  // Check if user is already logged in
  useEffect(() => {
    const isLoggedIn = getCookie("isLoggedIn");
    if (isLoggedIn === "true") {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-64 py-2 px-4 mb-2 border rounded-md focus:outline-none"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-64 py-2 px-4 mb-2 border rounded-md focus:outline-none"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        onClick={() => {
          handleLogin();
          onLoginSuccess(); // Call onLoginSuccess prop when login is successful
        }}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
