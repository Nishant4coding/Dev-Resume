
const BASE_URL = 'http://localhost:5000/api/auth';
export const userData= async ()=>{
    const response = await fetch(`${BASE_URL}/getuser`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    const data = await response.json();
    return data;
};
