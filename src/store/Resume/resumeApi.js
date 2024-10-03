// src/api/resumeApi.js
const BASE_URL = 'http://localhost:5000/api/resume'; // Adjust to your backend URL

export const fetchResume = async () => {
  const response = await fetch(`${BASE_URL}/fetch`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Use if you are sending cookies for session handling
  });

  if (!response.ok) {
    throw new Error('Failed to fetch resume');
  }

  return await response.json();
};

export const updateResume = async (resumeData) => {
  const response = await fetch(`${BASE_URL}/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(resumeData),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to update resume');
  }

  return await response.json();
};
