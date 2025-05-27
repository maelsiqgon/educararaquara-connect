
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-education-primary text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            EducAraraquara
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/" className="hover:text-education-light transition-colors">
              Início
            </Link>
            <Link to="/escolas" className="hover:text-education-light transition-colors">
              Escolas
            </Link>
            <Link to="/contato" className="hover:text-education-light transition-colors">
              Contato
            </Link>
            <Link 
              to="/admin/login" 
              className="bg-education-dark px-3 py-1 rounded hover:bg-opacity-80 transition-colors"
            >
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
