import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "./providers";
import Header from "@/components/header";


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content="#EEEEF5" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#191923" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: '%s | Convert image',
    default: 'Convert image',
  },
  description: "Convert images between different formats like PNG, JPG, JPEG, WEBP, AVIF.",
};
