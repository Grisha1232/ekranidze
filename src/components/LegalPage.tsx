import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen max-w-3xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="mb-6 inline-block text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        ← На сайт
      </Link>

      <h1 className="font-display text-3xl text-foreground">{title}</h1>
      <p className="mt-1 text-xs text-muted-foreground">Обновлено: {updated}</p>

      <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground [&_h2]:font-display [&_h2]:text-lg [&_h2]:text-foreground [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1">
        {children}
      </div>
    </div>
  );
}
