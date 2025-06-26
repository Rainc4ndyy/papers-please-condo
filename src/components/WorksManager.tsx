
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkRequest {
  id: string;
  unit: string;
  resident: string;
  workType: string;
  description: string;
  status: 'pending' | 'in_analysis' | 'approved' | 'rejected';
  documents: { name: string; type: string; required: boolean; uploaded: boolean }[];
  createdAt: string;
  updatedAt: string;
}

export function WorksManager() {
  const { toast } = useToast();
  const [requests, setRequests] = useState<WorkRequest[]>([
    {
      id: "1",
      unit: "Apto 101",
      resident: "João Silva",
      workType: "structural",
      description: "Reforma do banheiro com alteração da tubulação",
      status: "in_analysis",
      documents: [
        { name: "ART/RRT", type: "art", required: true, uploaded: true },
        { name: "Projeto Arquitetônico", type: "project", required: true, uploaded: false },
        { name: "Memorial Descritivo", type: "memorial", required: true, uploaded: true }
      ],
      createdAt: "2024-01-15",
      updatedAt: "2024-01-16"
    },
    {
      id: "2",
      unit: "Apto 205",
      resident: "Maria Santos",
      workType: "non_structural",
      description: "Pintura interna do apartamento",
      status: "approved",
      documents: [
        { name: "Cronograma de Obra", type: "schedule", required: false, uploaded: true }
      ],
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12"
    }
  ]);

  const [newRequest, setNewRequest] = useState({
    unit: "",
    resident: "",
    workType: "",
    description: ""
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pendente", icon: Clock },
      in_analysis: { variant: "default" as const, label: "Em Análise", icon: AlertTriangle },
      approved: { variant: "default" as const, label: "Aprovado", icon: CheckCircle, className: "bg-green-500" },
      rejected: { variant: "destructive" as const, label: "Reprovado", icon: XCircle }
    };
    const config = variants[status as keyof typeof variants];
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.variant} className={config.className || ''}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const canApprove = (request: WorkRequest) => {
    return request.documents.filter(doc => doc.required).every(doc => doc.uploaded);
  };

  const handleApprove = (requestId: string) => {
    const request = requests.find(r => r.id === requestId);
    if (!canApprove(request!)) {
      toast({
        title: "Documentação Incompleta",
        description: "Todos os documentos obrigatórios devem ser anexados antes da aprovação.",
        variant: "destructive"
      });
      return;
    }

    setRequests(prev => prev.map(r => 
      r.id === requestId 
        ? { ...r, status: 'approved' as const, updatedAt: new Date().toISOString().split('T')[0] }
        : r
    ));

    toast({
      title: "Obra Aprovada",
      description: "A solicitação de obra foi aprovada com sucesso."
    });
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(r => 
      r.id === requestId 
        ? { ...r, status: 'rejected' as const, updatedAt: new Date().toISOString().split('T')[0] }
        : r
    ));

    toast({
      title: "Obra Reprovada",
      description: "A solicitação de obra foi reprovada."
    });
  };

  const submitNewRequest = () => {
    const documents = [];
    if (newRequest.workType === 'structural') {
      documents.push(
        { name: "ART/RRT", type: "art", required: true, uploaded: false },
        { name: "Projeto Arquitetônico", type: "project", required: true, uploaded: false },
        { name: "Memorial Descritivo", type: "memorial", required: true, uploaded: false }
      );
    }

    const request: WorkRequest = {
      id: (requests.length + 1).toString(),
      ...newRequest,
      status: 'pending',
      documents,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };

    setRequests(prev => [...prev, request]);
    setNewRequest({ unit: "", resident: "", workType: "", description: "" });
    
    toast({
      title: "Solicitação Criada",
      description: "Sua solicitação de obra foi enviada para análise."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestor de Obras e Reformas</h1>
          <p className="text-gray-600 mt-2">Controle de aprovações conforme ABNT NBR 16280</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              Nova Solicitação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Nova Solicitação de Obra</DialogTitle>
              <DialogDescription>
                Preencha os dados da obra que deseja realizar.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="unit">Unidade</Label>
                <Input
                  id="unit"
                  value={newRequest.unit}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="Ex: Apto 101"
                />
              </div>
              <div>
                <Label htmlFor="resident">Morador</Label>
                <Input
                  id="resident"
                  value={newRequest.resident}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, resident: e.target.value }))}
                  placeholder="Nome completo"
                />
              </div>
              <div>
                <Label htmlFor="workType">Tipo de Obra</Label>
                <Select value={newRequest.workType} onValueChange={(value) => setNewRequest(prev => ({ ...prev, workType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="structural">Estrutural</SelectItem>
                    <SelectItem value="non_structural">Não Estrutural</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={newRequest.description}
                  onChange={(e) => setNewRequest(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva detalhadamente a obra..."
                />
              </div>
              <Button onClick={submitNewRequest} className="w-full bg-green-500 hover:bg-green-600">
                Enviar Solicitação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="in_analysis">Em Análise</TabsTrigger>
          <TabsTrigger value="approved">Aprovadas</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.unit} - {request.resident}</CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(request.status)}
                    <p className="text-sm text-gray-500 mt-1">
                      Atualizado: {new Date(request.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Documentação:</h4>
                    <div className="space-y-2">
                      {request.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc.name}</span>
                            {doc.required && <Badge variant="outline" className="text-xs">Obrigatório</Badge>}
                          </div>
                          <div className="flex items-center space-x-2">
                            {doc.uploaded ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Button size="sm" variant="outline">
                                <Upload className="h-3 w-3 mr-1" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {request.status === 'in_analysis' && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        disabled={!canApprove(request)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprovar Obra
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reprovar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {requests.filter(r => r.status === 'pending').map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.unit} - {request.resident}</CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(request.status)}
                    <p className="text-sm text-gray-500 mt-1">
                      Atualizado: {new Date(request.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Documentação:</h4>
                    <div className="space-y-2">
                      {request.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc.name}</span>
                            {doc.required && <Badge variant="outline" className="text-xs">Obrigatório</Badge>}
                          </div>
                          <div className="flex items-center space-x-2">
                            {doc.uploaded ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Button size="sm" variant="outline">
                                <Upload className="h-3 w-3 mr-1" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {request.status === 'in_analysis' && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        disabled={!canApprove(request)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprovar Obra
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reprovar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="in_analysis" className="space-y-4">
          {requests.filter(r => r.status === 'in_analysis').map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.unit} - {request.resident}</CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(request.status)}
                    <p className="text-sm text-gray-500 mt-1">
                      Atualizado: {new Date(request.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Documentação:</h4>
                    <div className="space-y-2">
                      {request.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc.name}</span>
                            {doc.required && <Badge variant="outline" className="text-xs">Obrigatório</Badge>}
                          </div>
                          <div className="flex items-center space-x-2">
                            {doc.uploaded ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Button size="sm" variant="outline">
                                <Upload className="h-3 w-3 mr-1" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {request.status === 'in_analysis' && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        disabled={!canApprove(request)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprovar Obra
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reprovar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {requests.filter(r => r.status === 'approved').map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{request.unit} - {request.resident}</CardTitle>
                    <CardDescription>{request.description}</CardDescription>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(request.status)}
                    <p className="text-sm text-gray-500 mt-1">
                      Atualizado: {new Date(request.updatedAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Documentação:</h4>
                    <div className="space-y-2">
                      {request.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center space-x-2">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{doc.name}</span>
                            {doc.required && <Badge variant="outline" className="text-xs">Obrigatório</Badge>}
                          </div>
                          <div className="flex items-center space-x-2">
                            {doc.uploaded ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Button size="sm" variant="outline">
                                <Upload className="h-3 w-3 mr-1" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {request.status === 'in_analysis' && (
                    <div className="flex space-x-2 pt-4 border-t">
                      <Button
                        onClick={() => handleApprove(request.id)}
                        disabled={!canApprove(request)}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Aprovar Obra
                      </Button>
                      <Button
                        onClick={() => handleReject(request.id)}
                        variant="destructive"
                      >
                        <XCircle className="h-4 w-4 mr-1" />
                        Reprovar
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
