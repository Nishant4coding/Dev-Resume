
// src/api/authApi.js
const BASE_URL = 'http://localhost:5000/api/auth'; // Adjust this to your backend URL

export const login = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  console.log("login",response);

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return await response.json();
};

export const signup = async (userData) => {
  const response = await fetch(`${BASE_URL}/createuser`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

// Other auth-related API functions (e.g., logout)
