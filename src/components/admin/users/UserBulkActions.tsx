
import React from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface UserBulkActionsProps {
  selectedUsers: string[];
  onSelectAll: (checked: boolean) => void;
  onClearSelection: () => void;
  allSelected: boolean;
}

const UserBulkActions: React.FC<UserBulkActionsProps> = ({
  selectedUsers,
  onSelectAll,
  onClearSelection,
  allSelected
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={allSelected}
          onCheckedChange={onSelectAll}
        />
        <span className="text-sm">
          {selectedUsers.length > 0 
            ? `${selectedUsers.length} usuário(s) selecionado(s)`
            : 'Selecionar todos'
          }
        </span>
      </div>
      
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onClearSelection}>
            Limpar seleção
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
                Ações em massa
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                Ativar usuários
              </DropdownMenuItem>
              <DropdownMenuItem>
                Desativar usuários
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Remover usuários
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
};

export default UserBulkActions;
