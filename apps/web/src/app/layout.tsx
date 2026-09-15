import type { Metadata } from "next";
import { connection } from "next/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Gestor de tareas y tableros",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await connection();
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
