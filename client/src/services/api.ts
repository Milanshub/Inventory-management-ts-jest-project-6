import axios from 'axios';

const REACT_APP_API_URL = 'http://localhost:5000/api'; // Base URL for your API

const api = axios.create({
    baseURL: REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Set up interceptors for request and response handling
api.interceptors.request.use(config => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token'); 
    if (token) {
        // Add the token to the Authorization header
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(response => {
    return response;
}, error => {
    // Handle response errors here
    if (error.response.status === 401) {
        // Optionally handle unauthorized responses (e.g., redirect to login)
        console.error('Unauthorized! Redirecting to login...');
        // Redirect logic can go here
    }
    return Promise.reject(error);
});

export default api;
