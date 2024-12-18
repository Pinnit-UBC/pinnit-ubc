import React from "react";

export function Avatar({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-full ${className}`}>{children}</div>;
}

export function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="rounded-full" />;
}

export function AvatarFallback({ children }: { children: React.ReactNode }) {
  return <div className="bg-gray-300 rounded-full">{children}</div>;
}
