import React from "react";

type PageShellProps = {
  main: React.ReactNode;
  sidebar?: React.ReactNode;
};

export function PageShell({ main, sidebar }: PageShellProps) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 relative z-10 mt-8 mb-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-start">
        <div className="min-w-0">{main}</div>
        {sidebar}
      </div>
    </div>
  );
}
