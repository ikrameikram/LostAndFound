import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import logo from '../assets/logo.png'; 

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;

    const handleLogout = async () => {
        try {
            await api.post('/logout');
            localStorage.clear();
            navigate('/login');
        } catch (error) {
            console.error("Erreur de déconnexion", error);
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <nav className="bg-[#0044CC] text-white py-3 shadow-lg">
            <div className="px-14 flex justify-between items-center w-full">
                <div className="flex items-center gap-3">
                    <Link to="/" className="flex items-center gap-3 group">
                        <img 
                            src={logo} 
                            alt="Logo" 
                            className="w-10 h-10 object-contain bg-white rounded-full p-1" 
                        />
                        <div className="flex flex-col">
                            <span className="text-xl font-extrabold leading-none">
                                Lost & Found
                            </span>
                            <span className="text-[10px] uppercase tracking-wider text-blue-100 mt-1">
                                Plateforme de gestion des objets
                            </span>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                    {token ? (
                        <div className="flex items-center gap-4">
                            <Link to="/my-objects" className="text-sm font-medium hover:text-blue-200">
                                Mes Objets
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-bold transition shadow-md"
                            >
                                Déconnexion
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link 
                                to="/login" 
                                className="bg-white text-[#0044CC] px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-blue-50 transition"
                            >
                                Connexion
                            </Link>
                            <Link 
                                to="/register" 
                                className="bg-white text-[#0044CC] px-6 py-2 rounded-lg font-bold text-sm shadow-md hover:bg-blue-50 transition"
                            >
                                S'inscrire
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;