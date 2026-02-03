import axios from 'axios';

const api = axios.create({
    // L'URL de base de ton API Laravel (vérifie ton port, souvent 8000)
    baseURL: 'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

// Cet intercepteur attache automatiquement le token Sanctum à chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        // Le format "Bearer" est requis par le middleware auth:sanctum de ton api.php
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;