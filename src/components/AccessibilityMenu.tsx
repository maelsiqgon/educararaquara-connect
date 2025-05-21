
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AccessibilityMenu = () => {
  const [fontSize, setFontSize] = useState(100);

  const increaseFontSize = () => {
    if (fontSize < 130) {
      setFontSize(fontSize + 10);
      document.documentElement.style.fontSize = `${fontSize + 10}%`;
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 90) {
      setFontSize(fontSize - 10);
      document.documentElement.style.fontSize = `${fontSize - 10}%`;
    }
  };

  const resetFontSize = () => {
    setFontSize(100);
    document.documentElement.style.fontSize = "100%";
  };

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle("high-contrast");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="border-none hover:bg-gray-100"
          aria-label="Acessibilidade"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m8 9 2 3h4l2-3" />
            <path d="M9.5 15a3.5 3.5 0 0 0 5 0" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="px-3 py-2 text-sm font-medium text-center border-b">
          Acessibilidade
        </div>
        <DropdownMenuItem onClick={increaseFontSize}>
          Aumentar texto
        </DropdownMenuItem>
        <DropdownMenuItem onClick={decreaseFontSize}>
          Diminuir texto
        </DropdownMenuItem>
        <DropdownMenuItem onClick={resetFontSize}>
          Tamanho padrão
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleHighContrast}>
          Alto contraste
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccessibilityMenu;
