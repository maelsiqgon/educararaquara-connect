
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, positive, icon }: StatCardProps) => {
  return (
    <Card className="shadow-sm border-0">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-baseline">
              <h3 className="text-2xl font-bold">{value}</h3>
              <span className={`ml-2 text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            </div>
          </div>
          <div className="rounded-full bg-gray-100 p-3">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
