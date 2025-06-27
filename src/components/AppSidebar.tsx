
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  Home,
  Users,
  CreditCard,
  FileText,
  Settings,
  Receipt,
  DollarSign,
  Banknote,
  UserCheck,
  Grid3X3,
  Sparkles,
  ClipboardList
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { icon: Receipt, label: "Faturas", path: "/faturas" },
    { icon: DollarSign, label: "Despesas", path: "/despesas" },
    { icon: Banknote, label: "Financeiro", path: "/financeiro" },
    { icon: UserCheck, label: "Área do condômino", path: "/area-condomino" },
    { icon: Building2, label: "Condomínio", path: "/condominio" },
    { icon: Grid3X3, label: "Apps", path: "/apps" },
    { icon: ClipboardList, label: "Papers, Please", path: "/papers-please" },
    { icon: Sparkles, label: "Novidades", path: "/novidades" }
  ];

  return (
    <Sidebar className="bg-gray-800 border-r-0 w-16">
      <SidebarHeader className="p-2 border-b border-gray-600">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 bg-cyan-400 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-0">
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton 
                      asChild 
                      className={`flex flex-col items-center justify-center py-3 px-2 hover:bg-gray-700 min-h-[60px] w-full border-b border-gray-700 ${
                        isActive(item.path) ? 'bg-cyan-400 text-white' : 'text-white hover:text-white'
                      }`}
                    >
                      <Link to={item.path} className="flex flex-col items-center">
                        <IconComponent className="h-5 w-5 mb-1" />
                        <span className="text-xs text-center leading-tight font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
