"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Car, Calendar, Users, Settings, LayoutDashboard, CreditCard, ChevronRight } from "lucide-react"

interface NavProps {
  isCollapsed?: boolean
}

export function DashboardNav({ isCollapsed }: NavProps) {
  const pathname = usePathname()

  const routes = [
    {
      title: "대시보드",
      icon: LayoutDashboard,
      href: "/dashboard",
      variant: "default",
    },
    {
      title: "차량 관리",
      icon: Car,
      href: "/dashboard/vehicles",
      variant: "ghost",
    },
    {
      title: "예약 관리",
      icon: Calendar,
      href: "/dashboard/reservations",
      variant: "ghost",
    },
    {
      title: "직원 관리",
      icon: Users,
      href: "/dashboard/employees",
      variant: "ghost",
    },
    {
      title: "정산 관리",
      icon: CreditCard,
      href: "/dashboard/accounting",
      variant: "ghost",
    },
    {
      title: "설정",
      icon: Settings,
      href: "/dashboard/settings",
      variant: "ghost",
    },
  ]

  return (
    <div data-collapsed={isCollapsed} className="group border-r bg-background py-2 data-[collapsed=true]:py-2">
      <ScrollArea className="h-[calc(100vh-64px)] px-3">
        <div className="flex flex-col gap-2 py-2">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start",
                isCollapsed && "flex h-9 w-9 shrink-0 items-center justify-center p-0",
              )}
              asChild
            >
              <Link href={route.href}>
                <route.icon className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                {!isCollapsed && <span>{route.title}</span>}
                {!isCollapsed && pathname.startsWith(route.href) && route.href !== "/dashboard" && (
                  <ChevronRight className="ml-auto h-4 w-4" />
                )}
              </Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

