
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import AccessibilityMenu from "./AccessibilityMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-education-primary flex items-center justify-center text-white font-bold text-xl">
            E
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-education-primary">EducAraraquara</h1>
            <p className="text-xs text-gray-500">Portal Educacional</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="nav-link-active">Início</Link>
          <Link to="/escolas" className="nav-link">Escolas</Link>
          <Link to="/projetos" className="nav-link">Projetos</Link>
          <Link to="/noticias" className="nav-link">Notícias</Link>
          <Link to="/contato" className="nav-link">Contato</Link>
          <button className="text-gray-700 hover:text-education-primary">
            <Search size={20} />
          </button>
          <AccessibilityMenu />
        </nav>

        {/* Login Button */}
        <div className="hidden md:block">
          <Button 
            variant="outline" 
            className="border-2 border-education-primary text-education-primary hover:bg-education-light"
          >
            Acessar Portal
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
            <Link to="/" className="nav-link-active py-2">Início</Link>
            <Link to="/escolas" className="nav-link py-2">Escolas</Link>
            <Link to="/projetos" className="nav-link py-2">Projetos</Link>
            <Link to="/noticias" className="nav-link py-2">Notícias</Link>
            <Link to="/contato" className="nav-link py-2">Contato</Link>
            
            <div className="flex items-center justify-between py-2">
              <button className="text-gray-700 hover:text-education-primary">
                <Search size={20} />
              </button>
              <AccessibilityMenu />
            </div>
            
            <Button 
              variant="outline" 
              className="border-2 border-education-primary text-education-primary hover:bg-education-light w-full"
            >
              Acessar Portal
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
