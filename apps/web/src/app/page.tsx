"use client";

import { useState } from "react";
import { NavbarLayout } from "@/layouts";

type Section = {
  title: string;
  cards: string[];
};

const INICIO_SECTIONS: Section[] = [
  { title: "Tableros marcados", cards: ["Producto", "Diseño web", "Lanzamiento", "Personal"] },
  { title: "Vistos recientemente", cards: ["Sprint 14", "Roadmap", "Incidencias", "Ideas"] },
  { title: "Espacios de trabajo", cards: ["Equipo core", "Diseño", "Marketing", "Escuela"] },
  { title: "Espacios de trabajo como invitado", cards: ["Cliente A", "Cliente B", "Partner", "Comunidad"] },
];

const SECTIONS_BY_VIEW: Record<string, Section[]> = {
  Inicio: INICIO_SECTIONS,
  Tableros: [
    { title: "Tableros marcados", cards: ["Producto", "Diseño web", "Lanzamiento", "Personal"] },
    { title: "Vistos recientemente", cards: ["Sprint 14", "Roadmap", "Incidencias", "Ideas"] },
  ],
  Plantilla: [
    { title: "Plantillas recientes", cards: ["Kanban semanal", "Objetivos OKR", "Onboarding", "Retrospectiva"] },
    { title: "Plantillas populares", cards: ["Gestión de contenido", "Sprint agile", "Reunión 1:1", "Lanzamiento"] },
  ],
  Proyectos: [
    { title: "Proyectos activos", cards: ["TaskFlow web", "App móvil", "Sitio público", "Investigación"] },
    { title: "Proyectos archivados", cards: ["Beta interna", "Piloto Q1", "Rediseño 2025", "Migración"] },
  ],
  Tareas: [
    { title: "Mis tareas", cards: ["Revisar diseño", "Escribir copy", "Preparar demo", "Cerrar bugs"] },
    { title: "Tareas pendientes", cards: ["Aprobar tablero", "Invitar equipo", "Definir columnas", "Publicar enlace"] },
  ],
  Diseño: [
    { title: "Diseños recientes", cards: ["Home TaskFlow", "Panel lateral", "Tarjetas", "Tipografía"] },
    { title: "Borradores", cards: ["Iconos", "Estados vacíos", "Modo oscuro", "Mobile"] },
  ],
  Marketing: [
    { title: "Campañas activas", cards: ["Lanzamiento", "Newsletter", "Redes", "Referidos"] },
    { title: "Campañas programadas", cards: ["Webinar", "Demo día", "Caso de éxito", "Ads Q4"] },
  ],
  Educación: [
    { title: "Cursos en progreso", cards: ["Clean Architecture", "Next.js", "Accesibilidad", "TypeScript"] },
    { title: "Cursos completados", cards: ["Fundamentos UI", "Git avanzado", "Pruebas", "Seguridad"] },
  ],
  Productividad: [
    { title: "Herramientas favoritas", cards: ["Inbox zero", "Hábitos", "Foco 25", "Semana"] },
    { title: "Recientes", cards: ["Daily", "Weekly review", "Prioridades", "Notas"] },
  ],
  "Asuntos Privados": [
    { title: "Documentos privados", cards: ["Contrato", "Notas personales", "Presupuesto", "Viaje"] },
    { title: "Borradores", cards: ["Diario", "Ideas sueltas", "Lista compra", "Salud"] },
  ],
  "Espacio de trabajo": [
    { title: "Mi espacio", cards: ["General", "Archivos", "Calendario", "Equipo"] },
    { title: "Compartidos", cards: ["Diseño", "Producto", "QA", "Dirección"] },
  ],
};

function sectionsFor(view: string): Section[] {
  const found = SECTIONS_BY_VIEW[view];
  if (found !== undefined) return found;
  return INICIO_SECTIONS;
}

function BoardView({ section, sections }: { section: string; sections: Section[] }) {
  return (
    <>
      <div className="mb-6">
        <span className="inline-flex min-h-11 items-center rounded-full bg-accent/10 px-4 text-sm font-medium text-accent">
          {section}
        </span>
      </div>
      <div className="space-y-8">
        {sections.map((item) => (
          <section key={item.title} aria-labelledby={`section-${item.title}`}>
            <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-4 py-2">
              <h2
                id={`section-${item.title}`}
                className="text-sm font-semibold uppercase tracking-wide text-card-foreground"
              >
                {item.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {item.cards.map((card) => (
                <div
                  key={`${item.title}-${card}`}
                  className="flex min-h-32 cursor-pointer items-center justify-center rounded-xl border border-border bg-card px-4 text-center text-base font-medium text-card-foreground shadow-sm transition-all duration-200 hover:-translate-y-1 hover:bg-accent/10 hover:shadow-md"
                >
                  {card}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("Inicio");
  const sections = sectionsFor(activeSection);

  return (
    <NavbarLayout activeSection={activeSection} onNavigate={setActiveSection}>
      <BoardView section={activeSection} sections={sections} />
    </NavbarLayout>
  );
}
