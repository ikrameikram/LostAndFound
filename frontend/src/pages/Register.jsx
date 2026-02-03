import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await api.post('/register', formData);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
            window.location.reload(); 
        } catch (err) {
            setError(err.response?.data?.message || "Erreur lors de l'inscription");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[70vh] px-14">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h2 className="text-2xl font-bold text-[#0044CC] mb-6 text-center">S'inscrire</h2>
                
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input 
                        type="text" 
                        placeholder="Nom complet"
                        className="w-full border-2 border-gray-200 rounded-lg p-2 outline-none focus:border-[#0044CC]"
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Email"
                        className="w-full border-2 border-gray-200 rounded-lg p-2 outline-none focus:border-[#0044CC]"
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Mot de passe"
                        className="w-full border-2 border-gray-200 rounded-lg p-2 outline-none focus:border-[#0044CC]"
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirmer le mot de passe"
                        className="w-full border-2 border-gray-200 rounded-lg p-2 outline-none focus:border-[#0044CC]"
                        onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                        required 
                    />
                    <button type="submit" className="w-full bg-[#0044CC] text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
                        Créer un compte
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;