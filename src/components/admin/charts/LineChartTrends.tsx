
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TrendData {
  name: string;
  estudantes: number;
  professores: number;
  [key: string]: number | string;
}

interface LineChartTrendsProps {
  data: TrendData[];
  title: string;
  description: string;
}

const LineChartTrends: React.FC<LineChartTrendsProps> = ({ data, title, description }) => {
  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="estudantes" stroke="#4C51BF" activeDot={{ r: 8 }} strokeWidth={2} />
              <Line type="monotone" dataKey="professores" stroke="#38B2AC" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartTrends;
