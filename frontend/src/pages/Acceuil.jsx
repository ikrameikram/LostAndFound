import React, { useEffect, useState } from 'react';
import api from '../api/axios';

const Acceuil = () => {
    const [objects, setObjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ type: '', location: '' });

    // Récupération des données au chargement et à chaque modification des filtres
    useEffect(() => {
        const fetchObjects = async () => {
            setLoading(true);
            try {
                // Envoie une requête GET /api/objects avec les paramètres de filtrage
                const response = await api.get('/objects', { params: filters });
                setObjects(response.data);
            } catch (err) {
                console.error("Erreur lors de la récupération des objets:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchObjects();
    }, [filters]);

    return (
        <div className="max-w-7xl mx-auto px-14 py-10">
            <h1 className="text-4xl font-extrabold text-[#0044CC] text-center mb-4">
                Catalogue des Objets
            </h1>
            <p className="text-gray-500 text-center mb-10 text-lg italic">
                Retrouvez ce que vous avez perdu ou aidez la communauté.
            </p>
            
            {/* Barre de Filtres */}
            <div className="flex flex-wrap gap-4 justify-center mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100 shadow-sm">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Ville / Lieu</label>
                    <input 
                        className="border-2 border-gray-200 p-3 rounded-xl focus:border-[#0044CC] outline-none transition w-64 bg-white" 
                        placeholder="Ex: Casablanca, Paris..."
                        value={filters.location}
                        onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                </div>
                
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">Catégorie</label>
                    <select 
                        className="border-2 border-gray-200 p-3 rounded-xl focus:border-[#0044CC] outline-none bg-white cursor-pointer w-48"
                        value={filters.type}
                        onChange={(e) => setFilters({...filters, type: e.target.value})}
                    >
                        <option value="">Tous les types</option>
                        <option value="perdu"> Objets Perdus</option>
                        <option value="trouve"> Objets Trouvés</option>
                    </select>
                </div>
            </div>

            {/* État de chargement */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0044CC]"></div>
                    <span className="ml-4 text-gray-500 font-medium">Chargement des annonces...</span>
                </div>
            ) : (
                <>
                    {/* Grille des Objets */}
                    {objects.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {objects.map(obj => (
                                <div key={obj.id} className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group">
                                    {/* Badge Type */}
                                    <div className={`py-2 text-center text-white text-xs font-black uppercase tracking-widest ${
                                        obj.type === 'perdu' ? 'bg-red-500' : 'bg-green-500'
                                    }`}>
                                        {obj.type}
                                    </div>
                                    
                                    <div className="p-6 flex-grow">
                                        <h3 className="font-bold text-xl text-gray-800 group-hover:text-[#0044CC] transition-colors mb-2">
                                            {obj.titre}
                                        </h3>
                                        <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                                            {obj.description}
                                        </p>
                                        
                                        <div className="space-y-2">
                                            <div className="flex items-center text-gray-400 text-xs">
                                                <span className="mr-2">📍</span>
                                                <span className="font-medium text-gray-600">{obj.location}</span>
                                            </div>
                                            <div className="flex items-center text-gray-400 text-xs">
                                                <span className="mr-2">📅</span>
                                                <span>Le {new Date(obj.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Footer de la carte */}
                                    <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 bg-[#0044CC] text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                                                {obj.user?.name?.charAt(0).toUpperCase() || 'U'}
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                Par <span className="font-semibold text-gray-700">{obj.user?.name || 'Utilisateur'}</span>
                                            </span>
                                        </div>
                                        <button className="text-[#0044CC] text-xs font-bold hover:underline">
                                            Détails →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                            <p className="text-gray-400 text-lg font-medium">Aucun objet ne correspond à votre recherche. 🔍</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Acceuil;