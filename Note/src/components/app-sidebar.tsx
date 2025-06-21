import * as React from "react";
import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  // IconCamera,
  // IconChartBar,
  IconDashboard,
  IconDatabase,
  // IconFileAi,
  // IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  // IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  // IconUsers,
} from "@tabler/icons-react";
import useTelegramUser from "@/hooks/useTelegramUser";

// import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Home",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: IconFolder,
    },
    // {
    //   title: "Team",
    //   url: "#",
    //   icon: IconUsers,
    // },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Data Library",
      url: "#",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "#",
      icon: IconReport,
    },
    {
      name: "Word Assistant",
      url: "#",
      icon: IconFileWord,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();
  const user = useTelegramUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img src="/images/black.png" alt="" className="w-[2rem] h-[2rem]" />
                <span className="text-base font-semibold">Notez</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  {/* <Avatar className="h-8 w-8 rounded-lg grayscale"> */}
                  {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                  {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback> */}
                  {/* </Avatar> */}
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <div className="font-medium flex flex-row gap-1">
                      <span className="truncate">
                        {user?.first_name || "FirstName"}
                      </span>
                      <span className="truncate">
                        {user?.last_name || "LastName"}
                      </span>
                    </div>

                    <span className="text-muted-foreground truncate text-xs">
                      {user?.username || "username"}
                    </span>
                  </div>
                  {/* <IconDotsVertical className="ml-auto size-4" /> */}
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              {/* <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {/* <Avatar className="h-8 w-8 rounded-lg"> */}
                    {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
                    {/* <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar> */}
                    {/* <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-medium">
                        {user?.first_name || "User's name"}
                      </span>
                      <span className="text-muted-foreground truncate text-xs">
                        {user?.last_name}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSeparator />
              </DropdownMenuContent> */}
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
