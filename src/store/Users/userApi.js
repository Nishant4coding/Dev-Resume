// src/api/userApi.js

const BASE_URL = "https://dev-resume-backend.vercel.app/api/auth";

export const getUserProfile = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authToken: token,
      },
    });

    if (!response.ok) {
      throw new Error("Unauthorized access. Please log in.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
