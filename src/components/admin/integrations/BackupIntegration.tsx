
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Download, Upload, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface BackupRecord {
  id: string;
  type: 'full' | 'incremental' | 'manual';
  status: 'running' | 'completed' | 'failed';
  size: number;
  created_at: string;
  file_path?: string;
}

const BackupIntegration = () => {
  const [backupSettings, setBackupSettings] = useState({
    auto_backup: true,
    frequency: 'daily',
    retention_days: 30,
    include_media: true,
    backup_time: '02:00',
    storage_type: 'local'
  });

  const [backups, setBackups] = useState<BackupRecord[]>([
    {
      id: '1',
      type: 'full',
      status: 'completed',
      size: 1024000000, // 1GB
      created_at: '2024-01-27T02:00:00Z',
      file_path: '/backups/backup_2024-01-27.sql'
    },
    {
      id: '2',
      type: 'incremental',
      status: 'completed',
      size: 256000000, // 256MB
      created_at: '2024-01-26T02:00:00Z',
      file_path: '/backups/backup_2024-01-26.sql'
    },
    {
      id: '3',
      type: 'manual',
      status: 'running',
      size: 0,
      created_at: '2024-01-27T10:30:00Z'
    }
  ]);

  const [backupProgress, setBackupProgress] = useState(0);
  const [isRunningBackup, setIsRunningBackup] = useState(false);
  const [lastBackup, setLastBackup] = useState<string>('2024-01-27T02:00:00Z');

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Concluído</Badge>;
      case 'running':
        return <Badge className="bg-blue-100 text-blue-800"><Clock className="h-3 w-3 mr-1" />Executando</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><AlertCircle className="h-3 w-3 mr-1" />Falha</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const runManualBackup = async () => {
    try {
      setIsRunningBackup(true);
      setBackupProgress(0);
      
      toast.info('Iniciando backup manual...');
      
      // Simular progresso do backup
      const interval = setInterval(() => {
        setBackupProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 500);

      // Simular tempo de backup
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const newBackup: BackupRecord = {
        id: (backups.length + 1).toString(),
        type: 'manual',
        status: 'completed',
        size: 512000000, // 512MB
        created_at: new Date().toISOString(),
        file_path: `/backups/manual_backup_${new Date().toISOString().split('T')[0]}.sql`
      };

      setBackups(prev => [newBackup, ...prev]);
      setLastBackup(newBackup.created_at);
      toast.success('Backup manual concluído com sucesso!');
    } catch (err) {
      toast.error('Erro ao executar backup manual');
    } finally {
      setIsRunningBackup(false);
      setBackupProgress(0);
    }
  };

  const saveBackupSettings = async () => {
    try {
      // Simular salvamento das configurações
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Configurações de backup salvas com sucesso!');
    } catch (err) {
      toast.error('Erro ao salvar configurações');
    }
  };

  const downloadBackup = async (backup: BackupRecord) => {
    try {
      toast.info('Preparando download...');
      // Simular download
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('Download iniciado!');
    } catch (err) {
      toast.error('Erro ao fazer download do backup');
    }
  };

  const deleteBackup = async (backupId: string) => {
    try {
      setBackups(prev => prev.filter(b => b.id !== backupId));
      toast.success('Backup removido com sucesso!');
    } catch (err) {
      toast.error('Erro ao remover backup');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup Automatizado
          </CardTitle>
          <CardDescription>
            Configure e gerencie backups automáticos do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="auto-backup"
                  checked={backupSettings.auto_backup}
                  onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, auto_backup: checked }))}
                />
                <Label htmlFor="auto-backup">Ativar backup automático</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="frequency">Frequência</Label>
                <Select 
                  value={backupSettings.frequency} 
                  onValueChange={(value) => setBackupSettings(prev => ({ ...prev, frequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">A cada hora</SelectItem>
                    <SelectItem value="daily">Diário</SelectItem>
                    <SelectItem value="weekly">Semanal</SelectItem>
                    <SelectItem value="monthly">Mensal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="retention">Retenção (dias)</Label>
                <Select 
                  value={backupSettings.retention_days.toString()} 
                  onValueChange={(value) => setBackupSettings(prev => ({ ...prev, retention_days: parseInt(value) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 dias</SelectItem>
                    <SelectItem value="15">15 dias</SelectItem>
                    <SelectItem value="30">30 dias</SelectItem>
                    <SelectItem value="60">60 dias</SelectItem>
                    <SelectItem value="90">90 dias</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="include-media"
                  checked={backupSettings.include_media}
                  onCheckedChange={(checked) => setBackupSettings(prev => ({ ...prev, include_media: checked }))}
                />
                <Label htmlFor="include-media">Incluir arquivos de mídia</Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-time">Horário do backup</Label>
                <Select 
                  value={backupSettings.backup_time} 
                  onValueChange={(value) => setBackupSettings(prev => ({ ...prev, backup_time: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="01:00">01:00</SelectItem>
                    <SelectItem value="02:00">02:00</SelectItem>
                    <SelectItem value="03:00">03:00</SelectItem>
                    <SelectItem value="04:00">04:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage-type">Tipo de armazenamento</Label>
                <Select 
                  value={backupSettings.storage_type} 
                  onValueChange={(value) => setBackupSettings(prev => ({ ...prev, storage_type: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local</SelectItem>
                    <SelectItem value="s3">Amazon S3</SelectItem>
                    <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    <SelectItem value="azure">Azure Blob Storage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={saveBackupSettings}>
              Salvar Configurações
            </Button>
            <Button variant="outline" onClick={runManualBackup} disabled={isRunningBackup}>
              {isRunningBackup ? 'Executando...' : 'Backup Manual'}
            </Button>
          </div>

          {isRunningBackup && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progresso do backup</span>
                <span>{backupProgress}%</span>
              </div>
              <Progress value={backupProgress} className="w-full" />
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Backups</CardTitle>
          <CardDescription>
            Últimos backups realizados no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backups.map((backup) => (
              <div key={backup.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="h-4 w-4 text-gray-500" />
                  <div>
                    <div className="font-medium">
                      Backup {backup.type === 'full' ? 'Completo' : backup.type === 'incremental' ? 'Incremental' : 'Manual'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(backup.created_at).toLocaleString('pt-BR')} • {formatFileSize(backup.size)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(backup.status)}
                  {backup.status === 'completed' && (
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => downloadBackup(backup)}>
                        <Download className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteBackup(backup.id)}>
                        <AlertCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">✓</div>
              <div className="text-sm">Último Backup</div>
              <div className="text-xs text-gray-500">
                {new Date(lastBackup).toLocaleDateString('pt-BR')}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{backups.length}</div>
              <div className="text-sm">Total de Backups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {formatFileSize(backups.reduce((total, backup) => total + backup.size, 0))}
              </div>
              <div className="text-sm">Espaço Usado</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {backupSettings.retention_days}d
              </div>
              <div className="text-sm">Retenção</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BackupIntegration;
