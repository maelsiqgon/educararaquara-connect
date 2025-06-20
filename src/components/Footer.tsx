import { Link } from "react-router-dom";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gradient-to-b from-education-dark to-education-primary text-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dot-bg opacity-5"></div>
      
      <div className="araraquara-container pt-16 pb-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img alt="Brasão de Araraquara" src="/lovable-uploads/db2cf68a-4d32-4fce-9f2b-4c87c5b04448.png" className="h-12 object-contain" />
              <div>
                <h3 className="text-lg font-bold">Secretaria de Educação</h3>
                <p className="text-xs text-gray-300">Prefeitura de Araraquara</p>
              </div>
            </div>
            <p className="text-sm text-gray-300 font-body">
              Portal da Secretaria Municipal de Educação de Araraquara, 
              dedicado a conectar toda a comunidade escolar.
            </p>
            <div className="pt-2 flex space-x-4">
              <a href="https://www.facebook.com/prefeiturarq/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://www.instagram.com/prefeituradeararaquara/" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="https://twitter.com/prefeiturarq" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="https://www.youtube.com/c/PrefeituraMunicipaldeAraraquara" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-education-accent border-b border-education-accent/30 pb-2">Links Rápidos</h3>
            <ul className="space-y-2 text-sm font-body">
              {[{
              label: "Página Inicial",
              url: "/"
            }, {
              label: "Nossas Escolas",
              url: "/escolas"
            }, {
              label: "Projetos Educacionais",
              url: "/projetos"
            }, {
              label: "Calendário Escolar",
              url: "/calendario"
            }, {
              label: "Notícias e Eventos",
              url: "/noticias"
            }].map((link, index) => <li key={index}>
                  <Link to={link.url} className="hover:text-education-accent transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-accent/70">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-education-accent border-b border-education-accent/30 pb-2">Acesso</h3>
            <ul className="space-y-2 text-sm font-body">
              {[{
              label: "Portal do Aluno",
              url: "/login"
            }, {
              label: "Portal do Professor",
              url: "/login"
            }, {
              label: "Portal do Responsável",
              url: "/login"
            }, {
              label: "Gestão Escolar",
              url: "/login"
            }, {
              label: "Área da Secretaria",
              url: "/login"
            }].map((link, index) => <li key={index}>
                  <Link to={link.url} className="hover:text-education-accent transition-colors flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-accent/70">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    {link.label}
                  </Link>
                </li>)}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 text-education-accent border-b border-education-accent/30 pb-2">Contato</h3>
            <ul className="space-y-2 text-sm font-body">
              <li className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-accent/70 mt-0.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <div>Av. Vicente Jerônimo Freire, 22</div>
                  <div>Centro - Araraquara/SP</div>
                  <div>CEP: 14801-150</div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-accent/70">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>(16) 3301-1900</span>
              </li>
              <li className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-education-accent/70">
                  <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <span>educacao@araraquara.sp.gov.br</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Secondary footer with city government info */}
      <div className="bg-black/20 backdrop-blur-sm py-4 relative z-10">
        <div className="araraquara-container text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center font-body">
          <div>© {currentYear} Prefeitura Municipal de Araraquara. Todos os direitos reservados.</div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-4">
            <Link to="/acessibilidade" className="hover:text-white transition-colors">Acessibilidade</Link>
            <Link to="/privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link to="/termos" className="hover:text-white transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;