//this was edited on usb mac

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/written/theme-provider";


export const metadata: Metadata = {
  title: "React Slot",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
