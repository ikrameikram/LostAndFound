import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/login', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
            window.location.reload();
        } catch (err) {
            setError('Identifiants invalides ou erreur serveur.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh] px-14">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-[#0044CC] mb-6 text-center">Connexion</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Adresse Email</label>
                        <input 
                            type="email" 
                            className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-[#0044CC] outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                        <input 
                            type="password" 
                            className="w-full border-2 border-gray-200 rounded-lg p-2 focus:border-[#0044CC] outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-[#0044CC] text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Connection
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;