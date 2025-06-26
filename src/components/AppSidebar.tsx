
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Home,
  Users,
  CreditCard,
  FileText,
  Settings,
  ChevronDown,
  ClipboardList,
  HardHat,
  Shield,
  Wrench,
  Camera
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

export function AppSidebar() {
  const location = useLocation();
  const [condominiumOpen, setCondominiumOpen] = useState(true);
  const [papersOpen, setPapersOpen] = useState(true);

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className="bg-gray-800 text-white border-r-0">
      <SidebarHeader className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8 text-cyan-400" />
          <h1 className="text-xl font-bold text-white">Superlógica</h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-0">
        <SidebarGroup className="px-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                className={`px-4 py-3 hover:bg-gray-700 ${isActive('/') ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}
              >
                <Link to="/">
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <Collapsible open={condominiumOpen} onOpenChange={setCondominiumOpen}>
            <CollapsibleTrigger className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 text-gray-300">
              <div className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Condomínio</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${condominiumOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`px-8 py-2 hover:bg-gray-700 ${isActive('/unidades') ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
                  >
                    <Link to="/unidades">
                      <Users className="h-4 w-4" />
                      <span>Unidades</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`px-8 py-2 hover:bg-gray-700 ${isActive('/contas-bancarias') ? 'bg-cyan-500 text-white' : 'text-gray-400'}`}
                  >
                    <Link to="/contas-bancarias">
                      <CreditCard className="h-4 w-4" />
                      <span>Contas bancárias</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <Collapsible open={papersOpen} onOpenChange={setPapersOpen}>
            <CollapsibleTrigger className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-700 ${location.pathname.includes('/papers-please') ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}>
              <div className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5" />
                <span>Papers, Please</span>
              </div>
              <ChevronDown className={`h-4 w-4 transition-transform ${papersOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`px-8 py-2 hover:bg-gray-700 ${isActive('/papers-please/obras') ? 'bg-cyan-400 text-gray-900' : 'text-gray-400'}`}
                  >
                    <Link to="/papers-please/obras">
                      <HardHat className="h-4 w-4" />
                      <span>Obras e Reformas</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`px-8 py-2 hover:bg-gray-700 ${isActive('/papers-please/inspecoes') ? 'bg-cyan-400 text-gray-900' : 'text-gray-400'}`}
                  >
                    <Link to="/papers-please/inspecoes">
                      <Shield className="h-4 w-4" />
                      <span>Inspeções</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`px-8 py-2 hover:bg-gray-700 ${isActive('/papers-please/manutencao') ? 'bg-cyan-400 text-gray-900' : 'text-gray-400'}`}
                  >
                    <Link to="/papers-please/manutencao">
                      <Wrench className="h-4 w-4" />
                      <span>Manutenção</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton 
                    asChild 
                    className={`px-8 py-2 hover:bg-gray-700 ${isActive('/papers-please/portaria') ? 'bg-cyan-400 text-gray-900' : 'text-gray-400'}`}
                  >
                    <Link to="/papers-please/portaria">
                      <Camera className="h-4 w-4" />
                      <span>Rotinas Portaria</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>

        <SidebarGroup className="px-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild 
                className={`px-4 py-3 hover:bg-gray-700 ${isActive('/configuracoes') ? 'bg-cyan-500 text-white' : 'text-gray-300'}`}
              >
                <Link to="/configuracoes">
                  <Settings className="h-5 w-5" />
                  <span>Configurações</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
