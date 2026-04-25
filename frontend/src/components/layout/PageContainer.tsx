import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

export function PageContainer({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <AppShell>
      <div className="max-w-5xl">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </AppShell>
  );
}
