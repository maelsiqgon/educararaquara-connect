
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { initialNews } from "@/components/admin/mockData";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState(initialNews.slice(0, 3));

  return (
    <section className="py-20 bg-education-lightgray relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-dot-bg opacity-5"></div>
      
      <div className="araraquara-container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h2 className="section-title pb-4 md:mb-0">Últimas Notícias</h2>
          <Button asChild variant="outline" className="border-education-primary text-education-primary hover:bg-education-light shadow-sm hover:shadow-md transition-all duration-300">
            <Link to="/noticias">Ver todas</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={item.id} className="overflow-hidden card-hover border-0 shadow-soft rounded-lg opacity-0 stagger-item animate-fade-in">
              <div className="h-56 overflow-hidden relative gradient-overlay">
                <img
                  src={item.image || "https://via.placeholder.com/400x300?text=Imagem+da+Noticia"}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-white bg-education-primary px-3 py-1 rounded-full shadow-sm">
                    {item.category}
                  </span>
                  <span className="text-xs text-education-gray">{item.date}</span>
                </div>
                <CardTitle className="text-xl text-education-primary hover:text-education-dark transition-colors duration-200">
                  <Link to={`/noticias/${item.id}`}>{item.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-education-gray line-clamp-3 font-body">
                  {item.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="ghost" size="sm" className="text-education-primary hover:text-education-dark hover:bg-education-light group flex items-center gap-1">
                  <Link to={`/noticias/${item.id}`}>
                    Leia mais
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none"
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className="transition-transform duration-300 transform group-hover:translate-x-1"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
