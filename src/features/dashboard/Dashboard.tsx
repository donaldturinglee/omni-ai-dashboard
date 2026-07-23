import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import { DashboardContent } from "@/features/dashboard/DashboardContent";
import { DashboardFooter } from "@/features/dashboard/DashboardFooter";
import { DashboardHeader } from "@/features/dashboard/DashboardHeader";
import { DashboardSidebar } from "@/features/dashboard/DashboardSidebar";

export const Dashboard = () => (
  <SidebarProvider>
    <DashboardSidebar />
    <SidebarInset>
      <DashboardHeader />
      <DashboardContent />
      <DashboardFooter />
    </SidebarInset>
  </SidebarProvider>
);
