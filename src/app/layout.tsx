import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Next-Light-DND",
  description: "Light weight & easy to use DND solution for your project!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
