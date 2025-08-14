"use client";

import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  PercentDiamond,
  RollerCoasterIcon,
  User2Icon,
  UserCheckIcon,
} from "lucide-react";

import { IUser } from "@/app/interface/IUser";
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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export function NavUser() {
  const { isMobile } = useSidebar();
  const Deconnexion = async () => {
    const res = await fetch("/api/deconnexion", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();
    toast(response.message);
    if (response.status === 200) {
      window.location.replace("/login");
    }
  };

  const [user, setUser] = React.useState<IUser | null>(null);
  const loadingUser = async () => {
    try {
      const reponse = await fetch("/api/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await reponse.json();
      if (response.status === 200) {
        setUser(response.data);
      }
      if (response.status === 201) {
        window.location.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    const initialize = async () => {
      await loadingUser();
    };
    initialize();
  }, []);

  const donner = [
    { title: "Agents", icon: <User2Icon />, link: "/agents" },
    { title: "Agents admin", icon: <UserCheckIcon />, link: "/agents_admin" },
    {
      title: "Regions and shops",
      icon: <CreditCard />,
      link: "/regions_and_shops",
    },
    { title: "Manage feedbacks", icon: <Bell />, link: "/manage_feedbacks" },
    {
      title: "Role and department",
      icon: <RollerCoasterIcon />,
      link: "/role_and_department",
    },
    { title: "Permissions", icon: <PercentDiamond />, link: "/permissions" },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user && user.filename ? user.filename : "/bboxx.png"}
                  alt="Bboxx"
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Bboxx-DRC</span>
                {user && (
                  <span className="truncate text-xs">
                    {user?.poste[0].title}
                  </span>
                )}
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user && user.filename ? user.filename : "/bboxx.png"}
                    alt="Bboxx"
                  />
                  <AvatarFallback className="rounded-lg">B</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Bboxx-DRC</span>
                  {user && (
                    <span className="truncate text-xs">
                      {user?.poste[0].title}
                    </span>
                  )}
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              {donner.map((item, key) => {
                return (
                  <Link href={item.link} key={key}>
                    <DropdownMenuItem>
                      {item.icon}
                      {item.title}
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => Deconnexion()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
