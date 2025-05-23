
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FormFields from "./FormFields";

interface AuthFormProps {
  title: string;
  description: string;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

const AuthForm = ({
  title,
  description,
  email,
  setEmail,
  password,
  setPassword,
  isLoading,
  onSubmit,
}: AuthFormProps) => {
  const navigate = useNavigate();

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">{title}</CardTitle>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FormFields
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            isLoading={isLoading}
          />
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="text-education-primary hover:text-education-dark hover:bg-education-light"
        >
          Voltar para o Portal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
