
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, UserX, Trash2, Mail } from 'lucide-react';
import { useUsers, User } from '@/hooks/useUsers';

interface UserBulkActionsProps {
  selectedUsers: User[];
  onClearSelection: () => void;
  onUsersUpdated: () => void;
}

const UserBulkActions: React.FC<UserBulkActionsProps> = ({ 
  selectedUsers, 
  onClearSelection, 
  onUsersUpdated 
}) => {
  const { bulkUpdateUsers, blockUser, unblockUser } = useUsers();
  const [bulkAction, setBulkAction] = useState('');

  const handleBulkAction = async () => {
    if (!bulkAction || selectedUsers.length === 0) return;

    const userIds = selectedUsers.map(user => user.id);

    try {
      switch (bulkAction) {
        case 'activate':
          await bulkUpdateUsers(userIds, { active: true });
          break;
        case 'deactivate':
          await bulkUpdateUsers(userIds, { active: false });
          break;
        case 'block':
          for (const userId of userIds) {
            await blockUser(userId, 'Bloqueio em lote');
          }
          break;
        case 'unblock':
          for (const userId of userIds) {
            await unblockUser(userId);
          }
          break;
      }
      
      onUsersUpdated();
      onClearSelection();
      setBulkAction('');
    } catch (error) {
      console.error('Error performing bulk action:', error);
    }
  };

  if (selectedUsers.length === 0) return null;

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center">
          <Users className="h-5 w-5 mr-2" />
          Ações em Lote
          <Badge variant="secondary" className="ml-2">
            {selectedUsers.length} usuário(s) selecionado(s)
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-4">
          <Select value={bulkAction} onValueChange={setBulkAction}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Escolher ação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="activate">
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Ativar usuários
                </div>
              </SelectItem>
              <SelectItem value="deactivate">
                <div className="flex items-center">
                  <UserX className="h-4 w-4 mr-2" />
                  Desativar usuários
                </div>
              </SelectItem>
              <SelectItem value="block">
                <div className="flex items-center">
                  <UserX className="h-4 w-4 mr-2" />
                  Bloquear usuários
                </div>
              </SelectItem>
              <SelectItem value="unblock">
                <div className="flex items-center">
                  <UserCheck className="h-4 w-4 mr-2" />
                  Desbloquear usuários
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Button 
            onClick={handleBulkAction}
            disabled={!bulkAction}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Executar Ação
          </Button>

          <Button 
            variant="outline" 
            onClick={onClearSelection}
          >
            Limpar Seleção
          </Button>

          <Button 
            variant="outline"
            className="text-blue-600 hover:text-blue-800"
          >
            <Mail className="h-4 w-4 mr-2" />
            Enviar E-mail
          </Button>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Usuários selecionados:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.slice(0, 5).map(user => (
              <Badge key={user.id} variant="outline">
                {user.name}
              </Badge>
            ))}
            {selectedUsers.length > 5 && (
              <Badge variant="outline">
                +{selectedUsers.length - 5} mais
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserBulkActions;
