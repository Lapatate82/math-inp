// Importation des modules nécessaires
import './App.css'

import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar'; 
import Home from './Pages/Home';
import About from './Pages/About';

function App() {

  return (
    <>
      <div className="w-full font-sans">
        <Navbar />

        <div className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Page d'accueil */}
            <Route path="about" element={<About />} /> {/* Page À propos */}
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App