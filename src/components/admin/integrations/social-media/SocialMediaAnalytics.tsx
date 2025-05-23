
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const SocialMediaAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Seguidores</CardTitle>
          <CardDescription>Crescimento mensal</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-3xl font-bold">+1,256</div>
          <div className="text-sm text-green-600">+12% em relação ao mês anterior</div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Engajamento</CardTitle>
          <CardDescription>Interações por postagem</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-3xl font-bold">8.5%</div>
          <div className="text-sm text-green-600">+3.2% em relação ao mês anterior</div>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Alcance</CardTitle>
          <CardDescription>Pessoas alcançadas</CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="text-3xl font-bold">32,456</div>
          <div className="text-sm text-green-600">+18% em relação ao mês anterior</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaAnalytics;
