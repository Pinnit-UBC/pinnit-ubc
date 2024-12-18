import React from "react";

export function Sidebar({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`h-full ${className}`}>{children}</div>;
}

export function SidebarContent({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function SidebarHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function SidebarFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function SidebarMenu({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function SidebarMenuItem({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}

export function SidebarMenuButton({
  children,
  isActive,
  asChild,
  onClick,
  tooltip,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  asChild?: boolean;
  onClick?: () => void;
  tooltip?: string;
}) {
  return (
    <button onClick={onClick} title={tooltip} className={`${isActive ? "bg-gray-200" : ""}`}>
      {children}
    </button>
  );
}

export function SidebarRail() {
  return <div className="hidden lg:block w-16 bg-gray-100"></div>;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
