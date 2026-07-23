import { Outlet } from "react-router-dom";

import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardFooter } from "@/features/dashboard/components/DashboardFooter";
import { DashboardHeader } from "@/features/dashboard/components/DashboardHeader";
import { DashboardSidebar } from "@/features/dashboard/components/DashboardSidebar";

export const Dashboard = () => (
  <SidebarProvider>
    <DashboardSidebar />
    <SidebarInset>
      <DashboardHeader />
      <Outlet />
      <DashboardFooter />
    </SidebarInset>
  </SidebarProvider>
);
