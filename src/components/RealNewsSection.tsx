
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { useNews } from '@/hooks/useNews';
import { Calendar, Eye, User, Newspaper } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const RealNewsSection = () => {
  const { news, loading } = useNews();

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="araraquara-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-education-primary mb-4">
              Últimas Notícias
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Carregando notícias...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-64"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const publishedNews = news.filter(item => item.status === 'published').slice(0, 6);

  return (
    <section className="py-16 bg-white">
      <div className="araraquara-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-education-primary mb-4">
            Últimas Notícias
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fique por dentro das novidades da educação em Araraquara
          </p>
        </div>

        {publishedNews.length === 0 ? (
          <div className="text-center py-12">
            <Newspaper className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nenhuma notícia publicada
            </h3>
            <p className="text-gray-500">
              As notícias aparecerão aqui quando forem publicadas.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {publishedNews.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden bg-gray-200">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Newspaper className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      {item.category && (
                        <Badge 
                          style={{ backgroundColor: item.category.color }}
                          className="text-white text-xs"
                        >
                          {item.category.name}
                        </Badge>
                      )}
                      {item.featured && (
                        <Badge variant="secondary" className="text-xs">
                          Destaque
                        </Badge>
                      )}
                    </div>
                    
                    <CardTitle className="text-xl text-education-primary line-clamp-2">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pb-2">
                    <CardDescription className="line-clamp-3 mb-3">
                      {item.excerpt || item.content.substring(0, 150) + '...'}
                    </CardDescription>
                    
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(item.published_at || item.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                      </div>
                      
                      {item.views > 0 && (
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {item.views}
                        </div>
                      )}
                      
                      {item.author && (
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {item.author.name}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to={`/noticias/${item.id}`}>
                        Leia mais
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button asChild size="lg" className="bg-education-primary hover:bg-education-dark">
                <Link to="/noticias">
                  Ver todas as notícias
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RealNewsSection;
