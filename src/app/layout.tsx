import { Inter, Lora} from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable}`}>
      {/* Adding suppressHydrationWarning fixes the Grammarly/Extension conflict */}
      <body className="bg-[#fafafa]" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}