import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juego",
  description: "Maestro Padel App",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}