"use client";

import {
  Database,
  DecimalsArrowLeftIcon,
  HistoryIcon,
  LayoutDashboard,
  Target,
  Upload,
  UploadCloud,
  Users,
} from "lucide-react";
import * as React from "react";

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
import { NavProjects } from "./nav-projects";

// This is sample data.
const data = {
  projects: [
    {
      name: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
  ],
  navMain: [
    {
      title: "My tracker",
      url: "#",
      icon: Target,
      items: [
        {
          title: "All customers to track",
          url: "/customers",
        },
        {
          title: "To be track by field",
          url: "/awaiting_field",
        },
        {
          title: "To be tracked by PO",
          url: "/fraude_verification",
        },
        {
          title: "To be tracked by agent",
          url: "/track_by_agent",
        },
        // {
        //   title: "Individually",
        //   url: "/individually",
        // },

        // {
        //   title: "Conf. field",
        //   url: "/confirmed_field",
        // },
        // {
        //   title: "Conf fraud",
        //   url: "/confirmed_fraude",
        // },
        {
          title: "All staffs visits in PAR30+",
          url: "/all_visits",
        },
        {
          title: "To be tracked by Agent",
          url: "/to_be_tracked_by_Agent",
        },
      ],
    },

    {
      title: "Validation",
      url: "#",
      icon: Database,
      items: [
        {
          title: "Actions",
          url: "/actions",
        },
        {
          title: "Arbitration",
          url: "/arbitration_call_center",
        },
      ],
    },
    {
      title: "Decisions",
      url: "#",
      icon: DecimalsArrowLeftIcon,
      items: [
        {
          title: "Fraud",
          url: "/decision_fraude",
          valeur: "decision_fraude",
        },
        {
          title: "Field",
          url: "/decision_field",
          valeur: "decision_field",
        },
        {
          title: "Portfolio",
          url: "/decision_portfolio",
          valeur: "decision_portfolio",
        },
      ],
    },
    {
      title: "Upload",
      url: "#",
      icon: Upload,
      items: [
        {
          title: "Payements",
          url: "/payements",
        },
        {
          title: "Customer to track",
          url: "/upload_customer",
        },
        {
          title: "Upload PAR 120+",
          url: "/par120",
        },
        {
          title: "Obj PAR 120+",
          url: "/actualisation_par",
        },
      ],
    },
  ],
  navpar120: [
    {
      title: "Tracking Par 120+",
      url: "#",
      icon: Target,
      items: [
        {
          title: "Customer to track",
          url: "/customer_par120",
        },
        {
          title: "Report PAR 120+",
          url: "/par120_dash",
        },
      ],
    },
  ],
  status: [
    {
      name: "Historical status",
      url: "/historical_status",
      icon: HistoryIcon,
    },
  ],
  accountManager: [
    {
      name: "Customers",
      url: "/account_manager_customer",
      icon: Users,
    },

    {
      name: "Upload",
      url: "/account_manager_upload",
      icon: UploadCloud,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="pl-3">
              Default tracker
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance"></AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="pl-3">
              Account Manager
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <NavProjects projects={data.accountManager} />
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
        <NavProjects projects={data.projects} />
        <NavMain items={data.navMain} />
        <NavMain items={data.navpar120} />
        <NavProjects projects={data.status} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
