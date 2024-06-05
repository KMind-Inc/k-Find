import { ReactNode } from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title = process.env.TITLE || "kfind";
const description = process.env.DESCRIPTION || "基于kOS的智能搜索";

export const metadata: Metadata = { title: title, description: description, };

export default function RootLayout({ children }: { children: ReactNode }) {
  
  return (
    <html lang="en" >
      <body className={inter.className}>{children}</body>
    </html>
  );
}
