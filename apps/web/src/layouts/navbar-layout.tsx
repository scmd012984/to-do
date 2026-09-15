"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { Button, Icon, Input } from "@/ui";

const NAV_LINKS = [
  { label: "Inicio", href: "/", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { label: "Tareas", href: "/tasks", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { label: "Diseño", href: "/design", icon: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" },
  { label: "Plantilla", href: "/templates", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { label: "Tableros", href: "/boards", icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" },
  { label: "Proyectos", href: "/projects", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { label: "Educación", href: "/education", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
  { label: "Marketing", href: "/marketing", icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" },
  { label: "Productividad", href: "/productivity", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { label: "Asuntos Privados", href: "/private", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
  { label: "Espacio de trabajo", href: "/workspace", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const MENU_ICON = "M4 6h16M4 12h16M4 18h16";

export function NavbarLayout({
  children,
  activeSection,
  onNavigate,
}: {
  children: ReactNode;
  activeSection: string;
  onNavigate: (label: string) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  function chooseSection(label: string) {
    onNavigate(label);
    if (window.matchMedia("(max-width: 767px)").matches) setMenuOpen(false);
  }

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-background">
      <header className="z-20 shrink-0 bg-background">
        <div className="flex items-center gap-3 px-3 py-2 sm:px-4">
          <Link href="/" className="flex min-h-11 min-w-11 shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-accent text-sm font-bold text-accent-foreground">
              T
            </span>
            <span className="hidden text-base font-semibold text-card-foreground sm:inline">
              TaskFlow
            </span>
          </Link>

          <div className="min-w-0 flex-1 px-2 sm:px-4">
            <Input
              type="search"
              placeholder="Buscar..."
              className="h-11 w-full min-w-0 rounded-lg border border-border bg-card px-3 text-base placeholder:text-muted-foreground"
              aria-label="Buscar"
            />
          </div>

          <Button
            type="button"
            className="relative flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-muted hover:bg-card hover:text-card-foreground"
            aria-label="Notificaciones"
          >
            <Icon path="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9 M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
          </Button>

          <Button
            type="button"
            className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-0 bg-accent text-sm font-semibold text-accent-foreground hover:opacity-90"
            aria-label="Menú de usuario"
          >
            U
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <div className="z-10 flex shrink-0 flex-col items-start self-start p-3">
          <Button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-muted hover:bg-card hover:text-card-foreground"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="sidebar-navigation"
          >
            <Icon path={MENU_ICON} />
          </Button>

          <aside
            id="sidebar-navigation"
            data-open={menuOpen ? "true" : "false"}
            className={`mt-2 overflow-hidden rounded-xl bg-card ${
              menuOpen ? "w-64 max-h-dvh border border-border shadow-md" : "w-0 max-h-0 border-0 shadow-none"
            }`}
            aria-hidden={!menuOpen}
            inert={!menuOpen ? true : undefined}
          >
            <nav className="nav-cascade flex w-64 flex-col gap-1 p-3">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.label;
                return (
                  <Button
                    key={link.href}
                    type="button"
                    onClick={() => chooseSection(link.label)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex min-h-11 w-full cursor-pointer items-center justify-start gap-3 rounded-md border-0 px-3 text-left text-base font-medium transition-colors ${
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "bg-transparent text-muted hover:bg-background hover:text-card-foreground"
                    }`}
                  >
                    <Icon path={link.icon} />
                    {link.label}
                  </Button>
                );
              })}
            </nav>
          </aside>
        </div>

        <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
