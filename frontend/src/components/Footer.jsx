import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#0044CC] text-white pt-10 pb-6 mt-auto">
            <div className="px-14 grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
                <div>
                    <h3 className="font-bold text-md mb-3 border-b border-blue-400 pb-1">À propos</h3>
                    <p className="text-xs text-blue-100 leading-relaxed">
                        Plateforme de gestion des objets perdus et trouvés pour les universités et entreprises.
                    </p>
                </div>
                <div>
                    <h3 className="font-bold text-md mb-3 border-b border-blue-400 pb-1">Liens utiles</h3>
                    <ul className="text-xs space-y-2 text-blue-100">
                        <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
                        <li><Link to="/?type=perdu" className="hover:text-white transition">Objets perdus</Link></li>
                        <li><Link to="/?type=trouve" className="hover:text-white transition">Objets trouvés</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-md mb-3 border-b border-blue-400 pb-1">Support</h3>
                    <ul className="text-xs space-y-2 text-blue-100">
                        <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                        <li><Link to="/conditions" className="hover:text-white transition">Conditions</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-md mb-3 border-b border-blue-400 pb-1">Légal</h3>
                    <ul className="text-xs space-y-2 text-blue-100">
                        <li><Link to="/confidentialite" className="hover:text-white transition">Confidentialité</Link></li>
                        <li><Link to="/cgu" className="hover:text-white transition">CGU</Link></li>
                        <li><Link to="/cookies" className="hover:text-white transition">Cookies</Link></li>
                    </ul>
                </div>
            </div>
            <div className="mt-8 pt-4 border-t border-blue-500 text-center text-[10px] text-blue-200 uppercase tracking-widest">
                <p>&copy; {new Date().getFullYear()} - Lost & Found. Tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;