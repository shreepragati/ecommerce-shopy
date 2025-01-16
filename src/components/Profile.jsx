import React, { useState, useEffect } from "react";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch user data from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user", {
          withCredentials: true,
        });
        const principalData = response.data.authorities[0]?.attributes || {};
        setUser(principalData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data");
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">
        User Profile
      </h1>

      {user ? (
        <div className="space-y-4">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <img
              src={user.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full border-2 border-gray-300"
            />
          </div>

          {/* Basic Information */}
          <div>
            <p className="text-lg">
              <span className="font-semibold text-gray-600">Username:</span>{" "}
              {user.given_name || "N/A"}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-600">Name:</span> {user.name}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-600">Email:</span> {user.email}
            </p>
            <p className="text-lg font-semibold">
              <span className="text-gray-600">Email Verified:</span>{" "}
              {user.email_verified ? "Yes" : "No"}
            </p>
          </div>

          {/* Logout Button */}
          <div className="flex justify-center mt-6">
            <a
              href="/logout"
              className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600 transition"
            >
              Logout
            </a>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No user data available</p>
      )}
    </div>
  );
};

export default ProfilePage;
