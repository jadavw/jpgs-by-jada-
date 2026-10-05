import type {Metadata} from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'JPGs By Jada',
  description: 'Minimalist photography portfolio',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[#fafafa] text-[#111111] antialiased selection:bg-[#111111] selection:text-[#fafafa]`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
