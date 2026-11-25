import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import StyledJsxRegistry from "./styled-jsx-registry";
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bimqubator ",
  description: "Engineering Service Consultants for Building Excellence",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col max-w-[1700px] mx-auto">
        <Toaster 
          position="top-right" 
          toastOptions={{
            className: 'border border-gray-200 rounded-xl shadow-lg text-[10px] font-black uppercase tracking-widest bg-white text-gray-900',
            duration: 4000,
          }} 
        />
        <StyledJsxRegistry>
          <Navbar />
          {children}
          <Footer />
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
