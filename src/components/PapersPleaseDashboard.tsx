
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, Shield, Wrench, Camera, ArrowRight } from "lucide-react";

export function PapersPleaseDashboard() {
  const modules = [
    {
      title: "Gestor de Obras e Reformas",
      description: "Digitalizar o fluxo de aprovação de obras em unidades, conforme ABNT NBR 16280",
      icon: HardHat,
      link: "/papers-please/obras",
      color: "border-l-4 border-l-blue-500"
    },
    {
      title: "Gestor de Inspeções e Conformidade",
      description: "Controlar a validade de laudos e certificados do condomínio",
      icon: Shield,
      link: "/papers-please/inspecoes",
      color: "border-l-4 border-l-green-500"
    },
    {
      title: "Gestor de Manutenção e Contratos",
      description: "Gerenciar contratos com fornecedores e ordens de serviço",
      icon: Wrench,
      link: "/papers-please/manutencao",
      color: "border-l-4 border-l-orange-500"
    },
    {
      title: "Gestão de Rotinas da Portaria",
      description: "Padronizar e auditar as tarefas da equipe de portaria",
      icon: Camera,
      link: "/papers-please/portaria",
      color: "border-l-4 border-l-purple-500"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Papers, Please</h1>
          <p className="text-gray-600 mt-2">Sistema de Gestão Documental e Conformidade</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((module, index) => {
          const IconComponent = module.icon;
          return (
            <Link key={index} to={module.link} className="block">
              <Card className={`hover:shadow-lg transition-shadow cursor-pointer ${module.color}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-gray-700" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {module.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
