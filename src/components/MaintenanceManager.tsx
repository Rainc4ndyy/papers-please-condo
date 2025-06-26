
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
import { Star, FileText, Wrench, Calendar, Users, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Supplier {
  id: string;
  name: string;
  service: string;
  contact: string;
  rating: number;
  evaluations: number;
  documents: string[];
}

interface Contract {
  id: string;
  supplier: string;
  service: string;
  startDate: string;
  endDate: string;
  value: number;
  status: 'active' | 'expiring' | 'expired';
  alertDays: number[];
}

interface ServiceOrder {
  id: string;
  title: string;
  description: string;
  supplier: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'in_progress' | 'completed';
  createdAt: string;
  updatedAt: string;
  attachments: string[];
}

export function MaintenanceManager() {
  const { toast } = useToast();
  
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: "1",
      name: "Elétrica Silva Ltda",
      service: "Serviços Elétricos",
      contact: "(11) 99999-9999",
      rating: 4.5,
      evaluations: 12,
      documents: ["CNPJ", "Alvará", "Responsabilidade Civil"]
    },
    {
      id: "2", 
      name: "Hidráulica Santos",
      service: "Serviços Hidráulicos",
      contact: "(11) 88888-8888",
      rating: 4.8,
      evaluations: 8,
      documents: ["CNPJ", "Alvará"]
    }
  ]);

  const [contracts, setContracts] = useState<Contract[]>([
    {
      id: "1",
      supplier: "Limpeza Total",
      service: "Limpeza das Áreas Comuns",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      value: 2500,
      status: "active",
      alertDays: [90, 60, 30]
    },
    {
      id: "2",
      supplier: "Segurança 24h",
      service: "Portaria e Vigilância",
      startDate: "2023-06-01", 
      endDate: "2024-02-29",
      value: 4500,
      status: "expiring",
      alertDays: [90, 60, 30]
    }
  ]);

  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>([
    {
      id: "1",
      title: "Reparo no elevador social",
      description: "Elevador social apresentando ruídos estranhos",
      supplier: "Elevadores Tech",
      priority: "high",
      status: "in_progress",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-16",
      attachments: []
    },
    {
      id: "2",
      title: "Troca de lâmpadas LED",
      description: "Substituição das lâmpadas queimadas no hall",
      supplier: "Elétrica Silva Ltda",
      priority: "medium",
      status: "completed",
      createdAt: "2024-01-10",
      updatedAt: "2024-01-12",
      attachments: ["foto_antes.jpg", "nota_fiscal.pdf"]
    }
  ]);

  const getContractStatus = (contract: Contract) => {
    const today = new Date();
    const endDate = new Date(contract.endDate);
    const daysUntilExpiry = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return { status: 'expired', color: 'destructive', label: 'Vencido' };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'expiring', color: 'secondary', label: `Vence em ${daysUntilExpiry} dias` };
    } else {
      return { status: 'active', color: 'default', label: 'Ativo', className: 'bg-green-500 text-white' };
    }
  };

  const getPriorityBadge = (priority: string) => {
    const configs = {
      low: { color: 'default', label: 'Baixa' },
      medium: { color: 'secondary', label: 'Média' },
      high: { color: 'destructive', label: 'Alta' }
    };
    const config = configs[priority as keyof typeof configs];
    return <Badge variant={config.color as any}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const configs = {
      open: { color: 'secondary', label: 'Aberta', icon: Clock },
      in_progress: { color: 'default', label: 'Em Execução', icon: Wrench },
      completed: { color: 'default', label: 'Concluída', icon: CheckCircle, className: 'bg-green-500 text-white' }
    };
    const config = configs[status as keyof typeof configs];
    const IconComponent = config.icon;
    
    return (
      <Badge variant={config.color as any} className={config.className || ''}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestor de Manutenção e Contratos</h1>
          <p className="text-gray-600 mt-2">Gestão de fornecedores, contratos e ordens de serviço</p>
        </div>
      </div>

      <Tabs defaultValue="suppliers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suppliers">Fornecedores</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="orders">Ordens de Serviço</TabsTrigger>
        </TabsList>

        <TabsContent value="suppliers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Fornecedores Cadastrados</h2>
            <Button className="bg-green-500 hover:bg-green-600">
              <Users className="h-4 w-4 mr-2" />
              Novo Fornecedor
            </Button>
          </div>

          {suppliers.map((supplier) => (
            <Card key={supplier.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{supplier.name}</CardTitle>
                    <CardDescription>{supplier.service}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {renderStars(supplier.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {supplier.rating} ({supplier.evaluations} avaliações)
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{supplier.contact}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">Documentos:</h4>
                    <div className="flex flex-wrap gap-2">
                      {supplier.documents.map((doc, index) => (
                        <Badge key={index} variant="outline">
                          <FileText className="h-3 w-3 mr-1" />
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2 border-t">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm">Avaliar</Button>
                    <Button variant="outline" size="sm">Ver Histórico</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Contratos Ativos</h2>
            <Button className="bg-green-500 hover:bg-green-600">
              <FileText className="h-4 w-4 mr-2" />
              Novo Contrato
            </Button>
          </div>

          {contracts.map((contract) => {
            const statusInfo = getContractStatus(contract);
            return (
              <Card key={contract.id} className={statusInfo.status === 'expiring' ? 'border-yellow-200 bg-yellow-50' : statusInfo.status === 'expired' ? 'border-red-200 bg-red-50' : ''}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{contract.supplier}</CardTitle>
                      <CardDescription>{contract.service}</CardDescription>
                    </div>
                    <div className="text-right">
                      <Badge variant={statusInfo.color as any} className={statusInfo.className}>
                        {statusInfo.label}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">
                        R$ {contract.value.toLocaleString('pt-BR')}/mês
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Início</Label>
                      <p className="text-sm">{new Date(contract.startDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Vencimento</Label>
                      <p className="text-sm">{new Date(contract.endDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2 border-t">
                    <Button variant="outline" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      Ver Contrato
                    </Button>
                    <Button variant="outline" size="sm">Renovar</Button>
                    {statusInfo.status === 'expiring' && (
                      <Badge variant="secondary" className="text-yellow-700">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Atenção ao Vencimento
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Ordens de Serviço</h2>
            <Button className="bg-green-500 hover:bg-green-600">
              <Wrench className="h-4 w-4 mr-2" />
              Nova OS
            </Button>
          </div>

          {serviceOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">OS #{order.id} - {order.title}</CardTitle>
                    <CardDescription>{order.description}</CardDescription>
                  </div>
                  <div className="text-right space-y-1">
                    {getStatusBadge(order.status)}
                    {getPriorityBadge(order.priority)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Fornecedor</Label>
                      <p className="text-sm">{order.supplier}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Última Atualização</Label>
                      <p className="text-sm">{new Date(order.updatedAt).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                  
                  {order.attachments.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Anexos</Label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {order.attachments.map((attachment, index) => (
                          <Badge key={index} variant="outline" className="cursor-pointer">
                            <FileText className="h-3 w-3 mr-1" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 pt-2 border-t">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="outline" size="sm">Anexar Foto</Button>
                    <Button variant="outline" size="sm">Nota Fiscal</Button>
                    {order.status !== 'completed' && (
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        Concluir OS
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
