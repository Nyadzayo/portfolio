import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Providers from "@/components/providers";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import {cn} from '@/lib/utils'
import "./globals.css";


const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair =  Playfair_Display({
  subsets:['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: "Kelvin Nyadzayo",
  description: "My Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        ' font-sans antialiased min-h-full flex flex-col bg-dark bg-opacity-90 text-light',
        inter.variable,
        playfair.variable
      )}
      
      >
        <Providers>
        <Header/>
        <main className="mx-auto mt-40 mb-24 max-w-screen-lg px-8 w-full grow">{children}</main>
        <Footer />
        </Providers>
        
        </body>
    </html>
  );
}
