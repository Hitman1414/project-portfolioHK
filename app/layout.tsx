import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Dr. Harshita Kaushik | Assistant Professor & Academic Researcher',
  description:
    'Academic research portfolio of Dr. Harshita Kaushik — Assistant Professor at Srinivas University. Ph.D. in Management exploring AI, conversational interfaces, consumer behavior, and digital commerce.',
  keywords: [
    'Dr. Harshita Kaushik',
    'Srinivas University',
    'Management Researcher',
    'Artificial Intelligence Marketing',
    'Conversational Interfaces',
    'Consumer Behaviour',
    'Tumkur University PhD',
    'E-Commerce Research',
  ],
  authors: [{ name: 'Dr. Harshita Kaushik' }],
  openGraph: {
    title: 'Dr. Harshita Kaushik | Academic & Research Portfolio',
    description:
      'Exploring the intersection of AI, conversational interfaces, consumer behaviour, and digital commerce.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
