import { Metadata } from 'next';
import { Inter, Lora} from 'next/font/google'

import './globals.css'
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lora = Lora({ 
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Ioan-Alexandru Scheusan | Student.Researcher.Builder.',
    template: "%s | Ioan-Alexandru Scheusan",
  },
  description: 'I enjoy researching AI/ML and building things that solve real problems. Exploring the intersection of computer science, physics, and philosophy.',
  keywords: ["AI", "Machine Learning", "Developer", "Researcher", "Student", "Computer Science", "Physics", "Philosophy"],
  authors: [{ name: "Ioan-Alexandru Scheusan"}],
  creator: "Ioan-Alexandru Scheusan",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // TODO: GET URL
    url: 'https://www.anduscheusan.com',
    siteName: 'Ioan-Alexandru Scheusan',
    title: 'Ioan-Alexandru Scheusan | Student.Researcher.Builder.',
    description: 'I enjoy researching AI/ML and building things that solve real problems. Exploring the intersection of computer science, physics, and philosophy.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${lora.variable}`}>
      {/* <body className="min-h-screen bg-[#fafafa] text-[#1a1a1a] dark:bg-[#1a1a1a] dark:text-[#fafafa] transition-colors duration-300" suppressHydrationWarning> */}
      <body className="min-h-screen bg-background text-foreground transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          <div className="mx-auto max-w-3xl px-6 py-12 md:py-20">
            <Navbar />
            <main className="page-fade">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}