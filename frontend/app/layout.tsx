import { Inter, Cinzel } from 'next/font/google';
import './globals.css';
import Footer from './components/Footer'; // 1. Import your new Footer component

// Your font setup...
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cinzel = Cinzel({ subsets: ['latin'], variable: '--font-cinzel' });

export const metadata = {
  title: 'The Hieroglyphs Explorer',
  description: 'An interactive journey into Ancient Egypt.',
};

import { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzel.variable} bg-pharaoh-dark`}>
        <main>{children}</main>
        <Footer /> {/* 2. Place the Footer component right before the closing </body> tag */}
      </body>
    </html>
  );
}


