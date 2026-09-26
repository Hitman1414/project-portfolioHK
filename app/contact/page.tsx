import { getProfile } from '@/lib/content';
import { Mail, Phone, MapPin, Linkedin, ArrowUpRight, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'Contact & Collaboration | Dr. Harshita Kaushik',
  description: 'Academic contact information for scholarly collaboration, conference invitations, and university enquiries.',
};

export default function ContactPage() {
  const profile = getProfile();

  return (
    <div className="pt-32 pb-24 px-6 max-w-5xl mx-auto space-y-16">
      <div className="space-y-4 border-b border-border/60 pb-10">
        <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 border border-accent/20 inline-block">
          ACADEMIC INQUIRIES
        </span>
        <h1 className="font-serif text-4xl sm:text-7xl font-normal text-foreground">
          Let&apos;s Talk Research.
        </h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          Open for scholarly research collaborations, doctoral discussions, guest lectures, peer reviewing, and academic conferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Verified Direct Contact Channels */}
        <div className="md:col-span-6 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-border space-y-6">
            <h2 className="font-serif text-2xl font-normal text-foreground">
              Direct Contact
            </h2>

            <div className="space-y-6 font-mono text-xs">
              <div className="space-y-1">
                <div className="text-muted-foreground flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>PRIMARY EMAIL</span>
                </div>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-foreground text-base font-semibold hover:text-accent underline block"
                >
                  {profile.email}
                </a>
              </div>

              <div className="space-y-1">
                <div className="text-muted-foreground flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>PHONE NUMBER</span>
                </div>
                <div className="text-foreground text-sm font-semibold">+91 {profile.phone}</div>
              </div>

              <div className="space-y-1">
                <div className="text-muted-foreground flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>ACADEMIC AFFILIATION</span>
                </div>
                <div className="text-foreground text-sm font-semibold">{profile.institution}</div>
                <div className="text-muted-foreground text-[11px]">{profile.location}</div>
              </div>

              <div className="space-y-1 pt-2 border-t border-border/40">
                <div className="text-muted-foreground flex items-center space-x-2">
                  <Linkedin className="w-4 h-4 text-accent" />
                  <span>LINKEDIN PROFILE</span>
                </div>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline inline-flex items-center space-x-1 font-semibold"
                >
                  <span>dr-harshita-kaushik-897210240</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Collaboration Topics */}
        <div className="md:col-span-6 space-y-6">
          <div className="glass-panel p-8 rounded-3xl border border-border space-y-6 bg-tech-grid">
            <h2 className="font-serif text-2xl font-normal text-foreground flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-accent" />
              <span>Areas of Academic Interest</span>
            </h2>

            <ul className="space-y-3 font-sans text-sm text-foreground/90">
              <li className="flex items-start space-x-2">
                <span className="text-accent font-mono font-bold">•</span>
                <span>Artificial Intelligence & Conversational UI in E-Commerce</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent font-mono font-bold">•</span>
                <span>Personalized Marketing & Consumer Data Privacy</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent font-mono font-bold">•</span>
                <span>Mobile App Gamification & Retail Customer Loyalty</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent font-mono font-bold">•</span>
                <span>Generation Z Financial Literacy & Women Entrepreneurship</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-accent font-mono font-bold">•</span>
                <span>Augmented Reality & Voice Assistants in Online Shopping</span>
              </li>
            </ul>

            <div className="pt-4 border-t border-border/40 font-mono text-[11px] text-muted-foreground">
              Response time for academic and research correspondence is typically within 24-48 hours.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
