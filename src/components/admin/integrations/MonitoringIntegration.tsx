
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Server, Users, Database, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface SystemMetric {
  timestamp: string;
  cpu: number;
  memory: number;
  disk: number;
  requests: number;
  errors: number;
  response_time: number;
}

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const MonitoringIntegration = () => {
  const [systemStatus, setSystemStatus] = useState({
    status: 'healthy',
    uptime: '99.9%',
    last_check: new Date().toISOString(),
    cpu_usage: 45,
    memory_usage: 62,
    disk_usage: 78,
    active_users: 156,
    total_requests: 2847,
    error_rate: 0.2
  });

  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { timestamp: '09:00', cpu: 45, memory: 60, disk: 75, requests: 120, errors: 2, response_time: 250 },
    { timestamp: '09:15', cpu: 52, memory: 65, disk: 76, requests: 145, errors: 1, response_time: 280 },
    { timestamp: '09:30', cpu: 48, memory: 63, disk: 77, requests: 132, errors: 3, response_time: 260 },
    { timestamp: '09:45', cpu: 55, memory: 68, disk: 78, requests: 167, errors: 0, response_time: 240 },
    { timestamp: '10:00', cpu: 42, memory: 58, disk: 78, requests: 98, errors: 1, response_time: 220 },
    { timestamp: '10:15', cpu: 47, memory: 62, disk: 79, requests: 134, errors: 2, response_time: 270 }
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'warning',
      message: 'Uso de disco acima de 75%',
      timestamp: '2024-01-27T10:30:00Z',
      resolved: false
    },
    {
      id: '2',
      type: 'info',
      message: 'Sistema reiniciado com sucesso',
      timestamp: '2024-01-27T08:00:00Z',
      resolved: true
    },
    {
      id: '3',
      type: 'error',
      message: 'Falha temporária na conexão com banco',
      timestamp: '2024-01-26T14:22:00Z',
      resolved: true
    }
  ]);

  const [monitoring, setMonitoring] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simular atualização dos dados em tempo real
      setSystemStatus(prev => ({
        ...prev,
        cpu_usage: Math.max(20, Math.min(80, prev.cpu_usage + (Math.random() - 0.5) * 10)),
        memory_usage: Math.max(30, Math.min(90, prev.memory_usage + (Math.random() - 0.5) * 5)),
        active_users: Math.max(50, prev.active_users + Math.floor((Math.random() - 0.5) * 20)),
        total_requests: prev.total_requests + Math.floor(Math.random() * 10),
        last_check: new Date().toISOString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'critical':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'error':
        return <Badge className="bg-red-100 text-red-800">Erro</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">Aviso</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
    toast.success('Alerta marcado como resolvido');
  };

  const runSystemCheck = async () => {
    try {
      toast.info('Executando verificação do sistema...');
      
      // Simular verificação
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setSystemStatus(prev => ({
        ...prev,
        last_check: new Date().toISOString()
      }));
      
      toast.success('Verificação do sistema concluída');
    } catch (err) {
      toast.error('Erro na verificação do sistema');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Monitoramento do Sistema
              </CardTitle>
              <CardDescription>
                Acompanhe o desempenho e saúde do sistema em tempo real
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {getStatusIcon(systemStatus.status)}
              <span className={`font-medium ${getStatusColor(systemStatus.status)}`}>
                {systemStatus.status === 'healthy' ? 'Saudável' : systemStatus.status}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{systemStatus.uptime}</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{systemStatus.active_users}</div>
              <div className="text-sm text-gray-600">Usuários Ativos</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{systemStatus.total_requests.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Requisições</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{systemStatus.error_rate}%</div>
              <div className="text-sm text-gray-600">Taxa de Erro</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">CPU</span>
                <span className="text-sm">{systemStatus.cpu_usage}%</span>
              </div>
              <Progress value={systemStatus.cpu_usage} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Memória</span>
                <span className="text-sm">{systemStatus.memory_usage}%</span>
              </div>
              <Progress value={systemStatus.memory_usage} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Disco</span>
                <span className="text-sm">{systemStatus.disk_usage}%</span>
              </div>
              <Progress value={systemStatus.disk_usage} className="h-2" />
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={runSystemCheck}>
              Verificar Sistema
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setMonitoring(!monitoring)}
            >
              {monitoring ? 'Pausar' : 'Retomar'} Monitoramento
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Uso de Recursos</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="cpu" stroke="#3B82F6" name="CPU %" />
                <Line type="monotone" dataKey="memory" stroke="#10B981" name="Memória %" />
                <Line type="monotone" dataKey="disk" stroke="#F59E0B" name="Disco %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requisições e Tempo de Resposta</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="requests" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} name="Requisições" />
                <Area type="monotone" dataKey="response_time" stackId="2" stroke="#EF4444" fill="#EF4444" fillOpacity={0.6} name="Tempo Resp. (ms)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alertas do Sistema</CardTitle>
          <CardDescription>
            Últimos alertas e notificações do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 border rounded-lg ${alert.resolved ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-3">
                  {getAlertBadge(alert.type)}
                  <div>
                    <div className="font-medium">{alert.message}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(alert.timestamp).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {alert.resolved ? (
                    <Badge variant="outline" className="text-green-600">Resolvido</Badge>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => resolveAlert(alert.id)}>
                      Resolver
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MonitoringIntegration;
