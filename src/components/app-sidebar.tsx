"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Organizational Structure",
          url: "/libraries/org-structure",
        },
        {
          title: "Users",
          url: "/libraries/users",
        },
        {
          title: "Accounts",
          url: "/libraries/accounts",
        },
      ],
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  sessionData: Session | null;
}
export function AppSidebar({ sessionData, ...props }: AppSidebarProps) {
  const user = {
    name: `${sessionData?.user?.firstname ?? "User"}${
      sessionData?.user?.middlename
        ? " " + sessionData.user.middlename[0] + "."
        : ""
    } ${sessionData?.user?.lastname ?? ""}${
      sessionData?.user?.extension ? " " + sessionData.user.extension : ""
    }`.trim(),
    group:
      sessionData?.user?.group3name ||
      sessionData?.user?.group2name ||
      sessionData?.user?.group1name ||
      "Group Name",
    avatar: "/avatar.png  ", // Add a default avatar if necessary
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} /> {/* Pass user instead of sessionData */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
