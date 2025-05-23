
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface EducationCardFeatureProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  content: string;
  features: string[];
}

const EducationCardFeature = ({
  icon: Icon,
  iconColor,
  title,
  description,
  content,
  features,
}: EducationCardFeatureProps) => {
  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Icon className={`h-5 w-5 mr-2 ${iconColor}`} />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{content}</p>
        <div className="mt-4 bg-gray-50 p-3 rounded-lg">
          <h4 className="font-medium mb-2">Funcionalidades</h4>
          <ul className="text-sm space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
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
                  className="mr-2 text-green-600"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationCardFeature;
