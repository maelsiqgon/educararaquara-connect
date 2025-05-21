
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import AccessibilityMenu from "./AccessibilityMenu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      {/* Top bar - Institutional */}
      <div className="bg-education-primary text-white py-1">
        <div className="araraquara-container flex justify-between items-center">
          <div className="text-xs md:text-sm flex items-center gap-4">
            <span>Prefeitura de Araraquara</span>
            <a href="#" className="hover:underline">Portal da Transparência</a>
            <a href="#" className="hover:underline">Ouvidoria</a>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs md:text-sm">
            <a href="#" className="hover:underline">Acesso à Informação</a>
            <AccessibilityMenu />
          </div>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className={`bg-white border-b border-gray-200 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-3'}`}>
        <div className="araraquara-container flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex items-center transition-transform duration-300 group-hover:scale-105">
              <img alt="Brasão de Araraquara" className="h-12" src="/lovable-uploads/0032e082-f844-4918-852d-e45ad583f331.png" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-education-primary">Secretaria de Educação</h1>
              <p className="text-xs text-education-gray">Prefeitura de Araraquara</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="nav-link-active">Início</Link>
            <div className="relative group">
              <button className="nav-link flex items-center gap-1">
                Institucional <ChevronDown size={16} className="transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-md min-w-40 z-10 animate-slide-down origin-top">
                <div className="py-2">
                  <Link to="/quem-somos" className="block px-4 py-2 hover:bg-education-light transition-colors">Quem Somos</Link>
                  <Link to="/equipe" className="block px-4 py-2 hover:bg-education-light transition-colors">Equipe</Link>
                  <Link to="/legislacao" className="block px-4 py-2 hover:bg-education-light transition-colors">Legislação</Link>
                </div>
              </div>
            </div>
            <Link to="/escolas" className="nav-link">Escolas</Link>
            <Link to="/projetos" className="nav-link">Projetos</Link>
            <Link to="/noticias" className="nav-link">Notícias</Link>
            <Link to="/contato" className="nav-link">Contato</Link>
            <button className="text-education-gray hover:text-education-primary transition-colors focus:outline-none focus:ring-2 focus:ring-education-primary rounded-full p-1">
              <Search size={20} />
            </button>
          </nav>

          {/* Login Button */}
          <div className="hidden md:block">
            <Button asChild variant="outline" className="border-2 border-education-primary text-education-primary hover:bg-education-light rounded-md shadow-sm hover:shadow-md transition-all duration-300">
              <Link to="/login">Acessar Portal</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-education-gray p-1 rounded-md hover:bg-gray-100 transition-colors" onClick={toggleMenu} aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t animate-fade-in shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-3">
            <Link to="/" className="nav-link-active py-2">Início</Link>
            <details className="group">
              <summary className="nav-link py-2 flex cursor-pointer items-center justify-between">
                Institucional <ChevronDown size={16} className="transform group-open:rotate-180 transition-transform" />
              </summary>
              <div className="pl-4 py-2 space-y-2 animate-slide-down">
                <Link to="/quem-somos" className="block py-1 nav-link">Quem Somos</Link>
                <Link to="/equipe" className="block py-1 nav-link">Equipe</Link>
                <Link to="/legislacao" className="block py-1 nav-link">Legislação</Link>
              </div>
            </details>
            <Link to="/escolas" className="nav-link py-2">Escolas</Link>
            <Link to="/projetos" className="nav-link py-2">Projetos</Link>
            <Link to="/noticias" className="nav-link py-2">Notícias</Link>
            <Link to="/contato" className="nav-link py-2">Contato</Link>
            
            <div className="flex items-center justify-between py-2">
              <button className="text-education-gray hover:text-education-primary transition-colors focus:outline-none focus:ring-2 focus:ring-education-primary rounded-full p-1">
                <Search size={20} />
              </button>
            </div>
            
            <Button asChild variant="outline" className="border-2 border-education-primary text-education-primary hover:bg-education-light w-full rounded-md shadow-sm transition-all duration-300">
              <Link to="/login">Acessar Portal</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
