// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="hover:text-gray-300">Accueil</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-300">À propos</Link>
        </li>
      </ul>
    </nav>
  );
}
