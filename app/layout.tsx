import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "vCard Generator",
  description: "Secure client-side vCard generator with QR code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
