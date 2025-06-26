
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, AlertTriangle, CheckCircle, Calendar, Upload } from "lucide-react";

interface ComplianceItem {
  id: string;
  name: string;
  description: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'warning' | 'expired';
  documentUrl?: string;
  type: string;
}

export function InspectionsManager() {
  const [items, setItems] = useState<ComplianceItem[]>([
    {
      id: "1",
      name: "AVCB - Auto de Vistoria do Corpo de Bombeiros",
      description: "Certificado de conformidade contra incêndio e pânico",
      issueDate: "2023-03-15",
      expiryDate: "2025-03-15",
      status: "valid",
      type: "fire_safety"
    },
    {
      id: "2", 
      name: "Laudo Técnico de Elevadores",
      description: "Inspeção técnica anual dos elevadores",
      issueDate: "2024-01-10",
      expiryDate: "2025-01-10",
      status: "warning",
      type: "elevator"
    },
    {
      id: "3",
      name: "Laudo de Segurança Estrutural",
      description: "Avaliação da integridade estrutural do edifício",
      issueDate: "2022-06-20",
      expiryDate: "2024-06-20", 
      status: "expired",
      type: "structural"
    },
    {
      id: "4",
      name: "Certificado de Potabilidade da Água",
      description: "Análise da qualidade da água para consumo",
      issueDate: "2024-11-01",
      expiryDate: "2025-05-01",
      status: "valid",
      type: "water"
    }
  ]);

  const getStatusInfo = (item: ComplianceItem) => {
    const today = new Date();
    const expiry = new Date(item.expiryDate);
    const daysUntilExpiry = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return {
        status: 'expired',
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        label: `Vencido há ${Math.abs(daysUntilExpiry)} dias`,
        priority: 3
      };
    } else if (daysUntilExpiry <= 15) {
      return {
        status: 'expired', 
        color: 'bg-red-500',
        textColor: 'text-red-700',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertTriangle,
        label: `Vence em ${daysUntilExpiry} dias`,
        priority: 3
      };
    } else if (daysUntilExpiry <= 60) {
      return {
        status: 'warning',
        color: 'bg-yellow-500',
        textColor: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200', 
        icon: Calendar,
        label: `Vence em ${daysUntilExpiry} dias`,
        priority: 2
      };
    } else {
      return {
        status: 'valid',
        color: 'bg-green-500',
        textColor: 'text-green-700',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        icon: CheckCircle,
        label: `Válido por ${daysUntilExpiry} dias`,
        priority: 1
      };
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    const aInfo = getStatusInfo(a);
    const bInfo = getStatusInfo(b);
    return bInfo.priority - aInfo.priority;
  });

  const statusCounts = {
    valid: items.filter(item => getStatusInfo(item).status === 'valid').length,
    warning: items.filter(item => getStatusInfo(item).status === 'warning').length,
    expired: items.filter(item => getStatusInfo(item).status === 'expired').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestor de Inspeções e Conformidade</h1>
          <p className="text-gray-600 mt-2">Dashboard de conformidade com sistema semafórico</p>
        </div>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <CardTitle className="text-green-700">Em Dia</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-700">{statusCounts.valid}</div>
            <p className="text-sm text-green-600">Certificados válidos</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <CardTitle className="text-yellow-700">Atenção</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-700">{statusCounts.warning}</div>
            <p className="text-sm text-yellow-600">Vencimento próximo (16-60 dias)</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <CardTitle className="text-red-700">Crítico</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-700">{statusCounts.expired}</div>
            <p className="text-sm text-red-600">Vencidos ou ≤ 15 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Items */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Certificados e Laudos</h2>
        
        {sortedItems.map((item) => {
          const statusInfo = getStatusInfo(item);
          const IconComponent = statusInfo.icon;
          
          return (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <Card className={`cursor-pointer hover:shadow-lg transition-shadow border-l-4 ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${statusInfo.color}`}></div>
                        <div>
                          <CardTitle className="text-lg">{item.name}</CardTitle>
                          <CardDescription className={statusInfo.textColor}>
                            {item.description}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className={`${statusInfo.textColor} border-current`}>
                          <IconComponent className="h-3 w-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        <p className="text-sm text-gray-500 mt-1">
                          Vencimento: {new Date(item.expiryDate).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </DialogTrigger>
              
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{item.name}</DialogTitle>
                  <DialogDescription>{item.description}</DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Data de Emissão</Label>
                      <p className="text-sm text-gray-900">
                        {new Date(item.issueDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700">Data de Vencimento</Label>
                      <p className="text-sm text-gray-900">
                        {new Date(item.expiryDate).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium text-gray-700">Status</Label>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-3 h-3 rounded-full ${statusInfo.color}`}></div>
                      <span className={`text-sm font-medium ${statusInfo.textColor}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Label className="text-sm font-medium text-gray-700">Documento</Label>
                    <div className="mt-2 space-y-2">
                      {item.documentUrl ? (
                        <Button variant="outline" className="w-full">
                          <FileText className="h-4 w-4 mr-2" />
                          Visualizar Documento
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload do Documento
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          );
        })}
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
