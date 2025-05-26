
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { initialNews } from "@/components/admin/mockData";

const Noticias = () => {
  const [news] = useState(initialNews);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-education-primary text-white py-16">
          <div className="araraquara-container">
            <h1 className="text-4xl font-bold mb-4">Notícias</h1>
            <p className="text-xl">Mantenha-se informado sobre a educação em Araraquara</p>
          </div>
        </div>
        
        <div className="py-16">
          <div className="araraquara-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image || "https://via.placeholder.com/400x300?text=Imagem+da+Noticia"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-white bg-education-primary px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <span className="text-xs text-gray-500">{item.date}</span>
                    </div>
                    <CardTitle className="text-xl text-education-primary">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-3">
                      {item.description}
                    </CardDescription>
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Noticias;
