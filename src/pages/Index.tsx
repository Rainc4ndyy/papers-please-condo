
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Routes, Route } from "react-router-dom";
import { SuperlogicaDashboard } from "@/components/SuperlogicaDashboard";
import { PapersPleaseDashboard } from "@/components/PapersPleaseDashboard";
import { WorksManager } from "@/components/WorksManager";
import { InspectionsManager } from "@/components/InspectionsManager";
import { MaintenanceManager } from "@/components/MaintenanceManager";
import { PorterRoutines } from "@/components/PorterRoutines";
import { UnidadesManager } from "@/components/UnidadesManager";
import { ContasBancariasManager } from "@/components/ContasBancariasManager";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<SuperlogicaDashboard />} />
            <Route path="/receitas" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Receitas</h1><p className="text-gray-600">Módulo em desenvolvimento</p></div>} />
            <Route path="/despesas" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Despesas</h1><p className="text-gray-600">Módulo em desenvolvimento</p></div>} />
            <Route path="/financeiro" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Financeiro</h1><p className="text-gray-600">Módulo em desenvolvimento</p></div>} />
            <Route path="/area-condomino" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Área do Condômino</h1><p className="text-gray-600">Módulo em desenvolvimento</p></div>} />
            <Route path="/condominio" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Condomínio</h1><p className="text-gray-600">Módulo em desenvolvimento</p></div>} />
            <Route path="/apps" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Apps</h1><p className="text-gray-600">Módulo em desenvolvimento</p></div>} />
            <Route path="/novidades" element={<div className="text-center py-20"><h1 className="text-2xl font-bold">Novidades</h1><p className="text-gray-600">Módulo em desenvolvimento</p></div>} />
            <Route path="/unidades" element={<UnidadesManager />} />
            <Route path="/contas-bancarias" element={<ContasBancariasManager />} />
            <Route path="/papers-please" element={<PapersPleaseDashboard />} />
            <Route path="/papers-please/obras" element={<WorksManager />} />
            <Route path="/papers-please/inspecoes" element={<InspectionsManager />} />
            <Route path="/papers-please/manutencao" element={<MaintenanceManager />} />
            <Route path="/papers-please/portaria" element={<PorterRoutines />} />
          </Routes>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
