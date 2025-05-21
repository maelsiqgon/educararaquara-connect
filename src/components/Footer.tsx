
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-education-primary text-white">
      <div className="araraquara-container pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://www.araraquara.sp.gov.br/++theme++plonegovbr.portal_araraquara/img/brasao-branco.png" 
                alt="Brasão de Araraquara" 
                className="h-12"
              />
              <div>
                <h3 className="text-lg font-bold">Secretaria de Educação</h3>
                <p className="text-xs text-gray-300">Prefeitura de Araraquara</p>
              </div>
            </div>
            <p className="text-sm text-gray-300">
              Portal da Secretaria Municipal de Educação de Araraquara, 
              dedicado a conectar toda a comunidade escolar.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-education-accent border-b border-education-accent pb-2">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-education-accent transition-colors">Página Inicial</Link></li>
              <li><Link to="/escolas" className="hover:text-education-accent transition-colors">Nossas Escolas</Link></li>
              <li><Link to="/projetos" className="hover:text-education-accent transition-colors">Projetos Educacionais</Link></li>
              <li><Link to="/calendario" className="hover:text-education-accent transition-colors">Calendário Escolar</Link></li>
              <li><Link to="/noticias" className="hover:text-education-accent transition-colors">Notícias e Eventos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-education-accent border-b border-education-accent pb-2">Acesso</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-education-accent transition-colors">Portal do Aluno</Link></li>
              <li><Link to="/login" className="hover:text-education-accent transition-colors">Portal do Professor</Link></li>
              <li><Link to="/login" className="hover:text-education-accent transition-colors">Portal do Responsável</Link></li>
              <li><Link to="/login" className="hover:text-education-accent transition-colors">Gestão Escolar</Link></li>
              <li><Link to="/login" className="hover:text-education-accent transition-colors">Área da Secretaria</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-education-accent border-b border-education-accent pb-2">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li>Secretaria Municipal de Educação</li>
              <li>Av. Vicente Jerônimo Freire, 22</li>
              <li>Centro - Araraquara/SP</li>
              <li>CEP: 14801-150</li>
              <li>Tel: (16) 3301-1900</li>
              <li>educacao@araraquara.sp.gov.br</li>
            </ul>
            <div className="mt-4 flex space-x-3">
              <a href="https://www.facebook.com/prefeiturarq/" target="_blank" rel="noopener noreferrer" className="hover:text-education-accent" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/prefeituradeararaquara/" target="_blank" rel="noopener noreferrer" className="hover:text-education-accent" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/prefeiturarq" target="_blank" rel="noopener noreferrer" className="hover:text-education-accent" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://www.youtube.com/c/PrefeituraMunicipaldeAraraquara" target="_blank" rel="noopener noreferrer" className="hover:text-education-accent" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary footer with city government info */}
      <div className="bg-education-dark py-4">
        <div className="araraquara-container text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center">
          <div>© {currentYear} Prefeitura Municipal de Araraquara. Todos os direitos reservados.</div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <Link to="/acessibilidade" className="hover:text-white">Acessibilidade</Link>
            <Link to="/privacidade" className="hover:text-white">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-white">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
