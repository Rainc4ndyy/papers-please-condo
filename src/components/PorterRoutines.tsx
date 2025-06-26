import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { QrCode, CheckCircle, Clock, AlertTriangle, MapPin, Plus, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChecklistTask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  required: boolean;
}

interface Checklist {
  id: string;
  name: string;
  shift: 'morning' | 'afternoon' | 'night';
  tasks: ChecklistTask[];
  completedAt?: string;
  completedBy?: string;
}

interface ControlPoint {
  id: string;
  name: string;
  location: string;
  qrCode: string;
  lastCheck?: string;
}

interface SecurityRound {
  id: string;
  date: string;
  shift: string;
  porter: string;
  points: { pointId: string; checkedAt: string }[];
  status: 'completed' | 'in_progress' | 'missed';
}

export function PorterRoutines() {
  const { toast } = useToast();
  
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: "1",
      name: "Rotina Matutina",
      shift: "morning",
      tasks: [
        { id: "1", title: "Verificar luzes das áreas comuns", description: "Checar se todas as lâmpadas estão funcionando", completed: true, required: true },
        { id: "2", title: "Limpeza do hall principal", description: "Verificar se a limpeza foi realizada adequadamente", completed: true, required: true },
        { id: "3", title: "Check das câmeras de segurança", description: "Verificar funcionamento de todas as câmeras", completed: false, required: true },
        { id: "4", title: "Teste dos interfones", description: "Testar comunicação com algumas unidades", completed: false, required: false }
      ],
      completedAt: undefined,
      completedBy: undefined
    }
  ]);

  const [controlPoints, setControlPoints] = useState<ControlPoint[]>([
    { id: "1", name: "Portaria Principal", location: "Térreo - Entrada", qrCode: "QR001", lastCheck: "2024-01-15T08:30:00" },
    { id: "2", name: "Garagem", location: "Subsolo", qrCode: "QR002", lastCheck: "2024-01-15T08:45:00" },
    { id: "3", name: "Piscina", location: "Área de Lazer", qrCode: "QR003" },
    { id: "4", name: "Salão de Festas", location: "Térreo", qrCode: "QR004", lastCheck: "2024-01-15T09:15:00" },
    { id: "5", name: "Cobertura", location: "Último Andar", qrCode: "QR005" }
  ]);

  const [securityRounds, setSecurityRounds] = useState<SecurityRound[]>([
    {
      id: "1",
      date: "2024-01-15",
      shift: "Manhã",
      porter: "José Silva",
      points: [
        { pointId: "1", checkedAt: "08:30" },
        { pointId: "2", checkedAt: "08:45" },
        { pointId: "4", checkedAt: "09:15" }
      ],
      status: "in_progress"
    }
  ]);

  const [newChecklist, setNewChecklist] = useState({
    name: "",
    shift: "",
    tasks: []
  });

  const [qrScannerOpen, setQrScannerOpen] = useState(false);

  const toggleTask = (checklistId: string, taskId: string) => {
    setChecklists(prev => prev.map(checklist => 
      checklist.id === checklistId 
        ? {
            ...checklist,
            tasks: checklist.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            )
          }
        : checklist
    ));
  };

  const completeChecklist = (checklistId: string) => {
    const checklist = checklists.find(c => c.id === checklistId);
    const requiredTasks = checklist?.tasks.filter(t => t.required) || [];
    const completedRequired = requiredTasks.filter(t => t.completed);

    if (completedRequired.length < requiredTasks.length) {
      toast({
        title: "Checklist Incompleto",
        description: "Todas as tarefas obrigatórias devem ser concluídas.",
        variant: "destructive"
      });
      return;
    }

    setChecklists(prev => prev.map(c => 
      c.id === checklistId 
        ? { 
            ...c, 
            completedAt: new Date().toISOString(),
            completedBy: "Porteiro Atual" 
          }
        : c
    ));

    toast({
      title: "Checklist Concluído",
      description: "Rotina finalizada com sucesso!"
    });
  };

  const simulateQRScan = (pointId: string) => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    // Update control point
    setControlPoints(prev => prev.map(point =>
      point.id === pointId 
        ? { ...point, lastCheck: now.toISOString() }
        : point
    ));

    // Update current security round
    setSecurityRounds(prev => prev.map(round => 
      round.status === 'in_progress'
        ? {
            ...round,
            points: [...round.points.filter(p => p.pointId !== pointId), { pointId, checkedAt: timeString }]
          }
        : round
    ));

    toast({
      title: "QR Code Escaneado",
      description: `Ponto ${controlPoints.find(p => p.id === pointId)?.name} verificado às ${timeString}`
    });
  };

  const getChecklistProgress = (checklist: Checklist) => {
    const completed = checklist.tasks.filter(t => t.completed).length;
    const total = checklist.tasks.length;
    return { completed, total, percentage: (completed / total) * 100 };
  };

  const getShiftBadge = (shift: string) => {
    const colors = {
      morning: 'bg-yellow-100 text-yellow-800',
      afternoon: 'bg-orange-100 text-orange-800', 
      night: 'bg-blue-100 text-blue-800'
    };
    const labels = {
      morning: 'Manhã',
      afternoon: 'Tarde',
      night: 'Noite'
    };
    return (
      <Badge className={colors[shift as keyof typeof colors]}>
        {labels[shift as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestão de Rotinas da Portaria</h1>
          <p className="text-gray-600 mt-2">Checklists digitais e controle de rondas de segurança</p>
        </div>
      </div>

      <Tabs defaultValue="checklists" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="checklists">Checklists</TabsTrigger>
          <TabsTrigger value="rounds">Rondas de Segurança</TabsTrigger>
          <TabsTrigger value="points">Pontos de Controle</TabsTrigger>
        </TabsList>

        <TabsContent value="checklists" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Checklists de Rotina</h2>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Novo Checklist
            </Button>
          </div>

          {checklists.map((checklist) => {
            const progress = getChecklistProgress(checklist);
            return (
              <Card key={checklist.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{checklist.name}</CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        {getShiftBadge(checklist.shift)}
                        <span className="text-sm text-gray-500">
                          {progress.completed}/{progress.total} tarefas concluídas
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {checklist.completedAt ? (
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Concluído
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          Em Andamento
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress.percentage}%` }}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {checklist.tasks.map((task) => (
                      <div key={task.id} className="flex items-start space-x-3 p-2 rounded border">
                        <Checkbox 
                          checked={task.completed}
                          onCheckedChange={() => toggleTask(checklist.id, task.id)}
                          disabled={!!checklist.completedAt}
                        />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                              {task.title}
                            </span>
                            {task.required && (
                              <Badge variant="outline" className="text-xs">Obrigatório</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{task.description}</p>
                        </div>
                      </div>
                    ))}
                    
                    {!checklist.completedAt && (
                      <div className="pt-4 border-t">
                        <Button 
                          onClick={() => completeChecklist(checklist.id)}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Finalizar Checklist
                        </Button>
                      </div>
                    )}

                    {checklist.completedAt && (
                      <div className="pt-4 border-t text-sm text-gray-600">
                        Concluído em {new Date(checklist.completedAt).toLocaleString('pt-BR')} por {checklist.completedBy}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="rounds" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Rondas de Segurança</h2>
            <Button className="bg-green-500 hover:bg-green-600">
              <QrCode className="h-4 w-4 mr-2" />
              Iniciar Ronda
            </Button>
          </div>

          {securityRounds.map((round) => (
            <Card key={round.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">Ronda - {round.shift}</CardTitle>
                    <CardDescription>
                      {new Date(round.date).toLocaleDateString('pt-BR')} - {round.porter}
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={round.status === 'completed' ? 'default' : 'secondary'}
                    className={round.status === 'completed' ? 'bg-green-500 text-white' : ''}
                  >
                    {round.status === 'completed' ? 'Concluída' : 'Em Andamento'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Pontos Verificados:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {round.points.map((point) => {
                        const controlPoint = controlPoints.find(cp => cp.id === point.pointId);
                        return (
                          <div key={point.pointId} className="flex items-center space-x-2 p-2 bg-green-50 rounded border border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <div>
                              <p className="text-sm font-medium">{controlPoint?.name}</p>
                              <p className="text-xs text-gray-500">{point.checkedAt}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm text-gray-600">
                      Progresso: {round.points.length}/{controlPoints.length} pontos verificados
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${(round.points.length / controlPoints.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="points" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Pontos de Controle</h2>
            <Button 
              onClick={() => setQrScannerOpen(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Escanear QR Code
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {controlPoints.map((point) => (
              <Card key={point.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{point.name}</CardTitle>
                      <CardDescription>
                        <MapPin className="h-3 w-3 inline mr-1" />
                        {point.location}
                      </CardDescription>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center mb-1">
                        <QrCode className="h-6 w-6 text-gray-400" />
                      </div>
                      <p className="text-xs text-gray-500">{point.qrCode}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {point.lastCheck ? (
                      <div className="flex items-center space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Última verificação: {new Date(point.lastCheck).toLocaleString('pt-BR')}</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        <span>Nunca verificado</span>
                      </div>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => simulateQRScan(point.id)}
                    >
                      Simular Scan
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Dialog open={qrScannerOpen} onOpenChange={setQrScannerOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Scanner QR Code</DialogTitle>
                <DialogDescription>
                  Aponte a câmera para o QR Code do ponto de controle
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-64 h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Câmera QR Scanner</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full">
                  {controlPoints.slice(0, 4).map((point) => (
                    <Button
                      key={point.id}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        simulateQRScan(point.id);
                        setQrScannerOpen(false);
                      }}
                    >
                      {point.name}
                    </Button>
                  ))}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
