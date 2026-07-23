import {
  AlertRegular,
  BotRegular,
  ChevronUpDownRegular,
  DataTrendingRegular,
  DocumentRegular,
  HomeRegular,
  PeopleRegular,
  PersonRegular,
  SettingsRegular,
  SignOutRegular,
  SparkleRegular,
  WalletRegular,
} from "@gamecrafters/base-ui-icons";
import { useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/Sidebar";
import { routePaths } from "@/router/routes";

const navigationItems = [
  { label: "Overview", icon: HomeRegular, isActive: true },
  { label: "Assistants", icon: BotRegular, isActive: false },
  { label: "Analytics", icon: DataTrendingRegular, isActive: false },
  { label: "Documents", icon: DocumentRegular, isActive: false },
  { label: "Team", icon: PeopleRegular, isActive: false },
  { label: "Settings", icon: SettingsRegular, isActive: false },
];

const user = {
  name: "Avery Chen",
  email: "avery.chen@omni.ai",
  initials: "AC",
};

export const DashboardSidebar = () => {
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 group-data-[collapsible=icon]:flex-col">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="Omni AI">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <SparkleRegular aria-hidden="true" />
                </div>
                <span className="font-heading font-medium tracking-tight">
                  Omni AI
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.isActive}
                    tooltip={item.label}
                  >
                    <item.icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
                <Avatar>
                  <AvatarFallback>{user.initials}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs text-sidebar-foreground/70">
                    {user.email}
                  </span>
                </div>
                <ChevronUpDownRegular aria-hidden="true" className="ml-auto" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                side="right"
                className="min-w-56"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <PersonRegular aria-hidden="true" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <WalletRegular aria-hidden="true" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <AlertRegular aria-hidden="true" />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => navigate(routePaths.signIn)}
                >
                  <SignOutRegular aria-hidden="true" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
