
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface FormFieldsProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isLoading: boolean;
}

const FormFields = ({ email, setEmail, password, setPassword, isLoading }: FormFieldsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@educ.araraquara.sp.gov.br"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white focus-visible:ring-education-primary"
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link to="/admin/recuperar-senha" className="text-sm font-medium text-education-primary hover:underline">
            Esqueceu a senha?
          </Link>
        </div>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="bg-white focus-visible:ring-education-primary"
        />
      </div>
      <Button
        type="submit"
        className="w-full bg-education-primary hover:bg-education-dark"
        disabled={isLoading}
      >
        {isLoading ? "Autenticando..." : "Entrar"}
      </Button>
    </div>
  );
};

export default FormFields;
