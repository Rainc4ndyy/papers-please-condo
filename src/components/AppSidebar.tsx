
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
  ClipboardList,
  BarChart3
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
    { icon: Receipt, label: "Receitas", path: "/receitas" },
    { icon: DollarSign, label: "Despesas", path: "/despesas" },
    { icon: BarChart3, label: "Financeiro", path: "/financeiro" },
    { icon: UserCheck, label: "Área do condômino", path: "/area-condomino" },
    { icon: Building2, label: "Condomínio", path: "/condominio" },
    { icon: Grid3X3, label: "Apps", path: "/apps" },
    { icon: ClipboardList, label: "Papers, Please", path: "/papers-please" },
    { icon: Sparkles, label: "Novidades", path: "/novidades" }
  ];

  return (
    <Sidebar className="bg-gray-800 text-white border-r-0 w-20">
      <SidebarHeader className="p-4 border-b border-gray-600">
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 bg-cyan-400 rounded flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="p-0 bg-gray-800">
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton 
                      asChild 
                      className={`flex flex-col items-center justify-center py-4 px-2 hover:bg-gray-700 min-h-[70px] w-full border-b border-gray-600 ${
                        isActive(item.path) ? 'bg-cyan-500 text-white' : 'text-white bg-gray-800'
                      }`}
                    >
                      <Link to={item.path} className="flex flex-col items-center text-white">
                        <IconComponent className="h-6 w-6 mb-1 text-white" />
                        <span className="text-[10px] text-center leading-tight font-semibold text-white">{item.label}</span>
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
