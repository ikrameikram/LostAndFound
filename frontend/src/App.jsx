import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Acceuil from './pages/Acceuil';
import Login from './pages/Login'; // Importez la nouvelle page
import Register from './pages/Register';
import UserObjects from './pages/UserObjects';
import AddObject from './pages/AddObject';


export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow pb-10">
          <Routes>
            <Route path="/" element={<Acceuil />} />
            <Route path="/login" element={<Login />} /> {/* Ajoutez cette ligne */}
            <Route path="/register" element={<Register />} />
            <Route path="/my-objects" element={<UserObjects />} />
            <Route path="/add-object" element={<AddObject />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}