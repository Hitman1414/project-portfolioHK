import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SmoothScroll } from '@/components/SmoothScroll';

export const metadata: Metadata = {
  metadataBase: new URL('https://project-portfolio-hk.vercel.app'),
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
    url: 'https://project-portfolio-hk.vercel.app',
    siteName: 'Dr. Harshita Kaushik Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 675,
        alt: 'Dr. Harshita Kaushik — Assistant Professor & Academic Researcher',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Harshita Kaushik | Academic & Research Portfolio',
    description:
      'Exploring the intersection of AI, conversational interfaces, consumer behaviour, and digital commerce.',
    images: ['/og-image.jpg'],
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScroll>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
