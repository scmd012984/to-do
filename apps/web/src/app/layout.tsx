import type { Metadata } from "next";
import { NavbarLayout } from "@/layouts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base Repo",
  description: "Next.js base repository",
};

export default function RootLayout() {
  return (
    <html lang="es">
      <body>
        <NavbarLayout />
      </body>
    </html>
  );
}
