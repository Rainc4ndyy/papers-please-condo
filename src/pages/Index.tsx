
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Routes, Route } from "react-router-dom";
import { PapersPleaseDashboard } from "@/components/PapersPleaseDashboard";
import { WorksManager } from "@/components/WorksManager";
import { InspectionsManager } from "@/components/InspectionsManager";
import { MaintenanceManager } from "@/components/MaintenanceManager";
import { PorterRoutines } from "@/components/PorterRoutines";

const Index = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<PapersPleaseDashboard />} />
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
