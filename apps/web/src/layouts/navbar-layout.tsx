"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input } from "@/ui";

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

interface Section {
  title: string;
  cards: string[];
}

const SECTIONS_BY_VIEW: Record<string, Section[]> = {
  Inicio: [
    { title: "Tableros marcados", cards: ["Tablero 1", "Tablero 2", "Tablero 3", "Tablero 4"] },
    { title: "Vistos recientemente", cards: ["Tablero 1", "Tablero 2", "Tablero 3", "Tablero 4"] },
    { title: "Espacios de trabajo", cards: ["Espacio 1", "Espacio 2", "Espacio 3", "Espacio 4"] },
    { title: "Espacios de trabajo como invitado", cards: ["Espacio 1", "Espacio 2", "Espacio 3", "Espacio 4"] },
  ],
  Tableros: [
    { title: "Tableros marcados", cards: ["Tablero 1", "Tablero 2", "Tablero 3", "Tablero 4"] },
    { title: "Vistos recientemente", cards: ["Tablero 1", "Tablero 2", "Tablero 3", "Tablero 4"] },
  ],
  Plantilla: [
    { title: "Plantillas recientes", cards: ["Plantilla 1", "Plantilla 2", "Plantilla 3", "Plantilla 4"] },
    { title: "Plantillas populares", cards: ["Plantilla 1", "Plantilla 2", "Plantilla 3", "Plantilla 4"] },
  ],
  Proyectos: [
    { title: "Proyectos activos", cards: ["Proyecto 1", "Proyecto 2", "Proyecto 3", "Proyecto 4"] },
    { title: "Proyectos archivados", cards: ["Proyecto 1", "Proyecto 2", "Proyecto 3", "Proyecto 4"] },
  ],
  Tareas: [
    { title: "Mis tareas", cards: ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4"] },
    { title: "Tareas pendientes", cards: ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4"] },
  ],
  Diseño: [
    { title: "Diseños recientes", cards: ["Diseño 1", "Diseño 2", "Diseño 3", "Diseño 4"] },
    { title: "Borradores", cards: ["Diseño 1", "Diseño 2", "Diseño 3", "Diseño 4"] },
  ],
  Marketing: [
    { title: "Campañas activas", cards: ["Campaña 1", "Campaña 2", "Campaña 3", "Campaña 4"] },
    { title: "Campañas programadas", cards: ["Campaña 1", "Campaña 2", "Campaña 3", "Campaña 4"] },
  ],
  Educación: [
    { title: "Cursos en progreso", cards: ["Curso 1", "Curso 2", "Curso 3", "Curso 4"] },
    { title: "Cursos completados", cards: ["Curso 1", "Curso 2", "Curso 3", "Curso 4"] },
  ],
  Productividad: [
    { title: "Herramientas favoritas", cards: ["Plantilla 1", "Plantilla 2", "Plantilla 3", "Plantilla 4"] },
    { title: "Recientes", cards: ["Plantilla 1", "Plantilla 2", "Plantilla 3", "Plantilla 4"] },
  ],
  "Asuntos Privados": [
    { title: "Documentos privados", cards: ["Privado 1", "Privado 2", "Privado 3", "Privado 4"] },
    { title: "Borradores", cards: ["Privado 1", "Privado 2", "Privado 3", "Privado 4"] },
  ],
  "Espacio de trabajo": [
    { title: "Mi espacio", cards: ["Espacio 1", "Espacio 2", "Espacio 3", "Espacio 4"] },
    { title: "Compartidos", cards: ["Espacio 1", "Espacio 2", "Espacio 3", "Espacio 4"] },
  ],
};

function SectionsView({ sections }: { sections: Section[] }) {
  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.title}>
          <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-4 py-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-card-foreground">
              {section.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {section.cards.map((card) => (
              <div
                key={card}
                className="flex h-32 cursor-pointer items-center justify-center rounded-xl border border-border bg-card text-sm font-medium text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:bg-accent/10"
              >
                {card}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function NavbarLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Inicio");

  const sections = SECTIONS_BY_VIEW[activeSection];

  return (
    <div className="flex h-screen flex-col">
      <header className="shrink-0 bg-background">
        <div className="relative flex items-center justify-between px-4 pt-2">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-xs font-bold text-white">
                T
              </span>
              <span className="text-base font-semibold text-card-foreground">
                TaskFlow
              </span>
            </Link>
          </div>

          <div className="flex flex-1 justify-center px-4">
            <Input
              type="search"
              placeholder="Buscar..."
              className="h-8 w-full max-w-md rounded-lg border-border bg-card px-3 text-sm placeholder:text-muted-foreground"
              aria-label="Buscar"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              className="relative flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-card hover:text-card-foreground"
              aria-label="Notificaciones"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-accent" />
            </Button>

            <Button
              type="button"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white transition-opacity hover:opacity-90"
              aria-label="Menú de usuario"
            >
              U
            </Button>
          </div>
        </div>

        <div className="relative flex items-center px-4 pb-2">
          <Button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-card hover:text-card-foreground"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <div className="relative flex flex-1">
        {menuOpen && (
          <nav className="absolute left-4 top-4 z-40 flex w-56 flex-col gap-0.5 rounded-lg border border-border bg-background p-2 shadow-lg">
            {NAV_LINKS.map((link) => (
              <Button
                key={link.href}
                type="button"
                onClick={() => setActiveSection(link.label)}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors ${
                  activeSection === link.label
                    ? "bg-accent text-white"
                    : "text-muted hover:bg-card hover:text-card-foreground"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={link.icon} />
                </svg>
                {link.label}
              </Button>
            ))}
          </nav>
        )}

        <main
          className={`flex-1 overflow-y-auto p-6 transition-all duration-300 ${
            menuOpen ? "ml-60" : ""
          }`}
        >
          <div className="mb-4">
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {activeSection}
            </span>
          </div>
          {sections ? (
            <SectionsView sections={sections} />
          ) : (
            <div className="flex h-64 items-center justify-center">
              <p className="text-muted-foreground">Selecciona una opción del menú</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
