import type { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/ui";

const NAV_LINKS = [
  { label: "Tableros", href: "/boards" },
  { label: "Plantillas", href: "/templates" },
  { label: "Inicio", href: "/" },
];

export function NavbarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
              T
            </span>
            <span className="text-lg font-semibold text-card-foreground">
              TaskFlow
            </span>
          </Link>

          <ul className="hidden items-center gap-1 sm:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-card hover:text-card-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white transition-opacity hover:opacity-90"
              aria-label="Menú de usuario"
            >
              U
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  );
}
