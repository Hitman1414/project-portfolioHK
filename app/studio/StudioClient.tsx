'use client';

import { useState, useEffect } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Save,
  Plus,
  Trash2,
  Eye,
  RefreshCw,
  GitCommit,
  Layers,
  GraduationCap,
  Briefcase,
  Award,
  Settings,
  User,
} from 'lucide-react';

export default function StudioClient() {
  const [activeTab, setActiveTab] = useState<'profile' | 'publications' | 'research' | 'teaching' | 'experience' | 'patents' | 'site'>('publications');
  const [contentData, setContentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [validationStatus, setValidationStatus] = useState<{ status: 'idle' | 'success' | 'error'; msg: string }>({ status: 'idle', msg: '' });
  const [publishStatus, setPublishStatus] = useState<{ status: 'idle' | 'success' | 'error'; msg: string }>({ status: 'idle', msg: '' });

  // Load all content
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/studio/content?type=all');
      const data = await res.json();
      setContentData(data);
    } catch (err) {
      console.error('Failed to load studio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Save current active tab content
  const handleSave = async (type: string, dataToSave: any) => {
    setSaving(true);
    try {
      const res = await fetch('/api/studio/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, content: dataToSave }),
      });
      const result = await res.json();
      if (result.success) {
        setValidationStatus({ status: 'success', msg: `Saved ${type}.json successfully!` });
        loadData();
      } else {
        setValidationStatus({ status: 'error', msg: result.error || 'Save failed' });
      }
    } catch (err: any) {
      setValidationStatus({ status: 'error', msg: err.message || 'Save error' });
    } finally {
      setSaving(false);
    }
  };

  // Run validation
  const handleValidate = async () => {
    setValidationStatus({ status: 'idle', msg: 'Validating...' });
    try {
      const res = await fetch('/api/studio/validate', { method: 'POST' });
      const result = await res.json();
      if (result.success) {
        setValidationStatus({ status: 'success', msg: 'Zod validation passed with 0 errors!' });
      } else {
        setValidationStatus({ status: 'error', msg: result.error || 'Validation failed' });
      }
    } catch (err: any) {
      setValidationStatus({ status: 'error', msg: err.message });
    }
  };

  // Run Publish Workflow
  const handlePublish = async () => {
    setPublishStatus({ status: 'idle', msg: 'Executing Git publish workflow...' });
    try {
      const res = await fetch('/api/studio/publish', { method: 'POST' });
      const result = await res.json();
      if (result.success) {
        setPublishStatus({ status: 'success', msg: 'Published to GitHub & Vercel!' });
      } else {
        setPublishStatus({ status: 'error', msg: result.error || 'Publish failed' });
      }
    } catch (err: any) {
      setPublishStatus({ status: 'error', msg: err.message });
    }
  };

  if (loading || !contentData) {
    return (
      <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto font-mono text-xs text-muted-foreground flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center space-x-3">
          <RefreshCw className="w-5 h-5 text-accent animate-spin" />
          <span>LOADING LOCAL PORTFOLIO STUDIO...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-6 bg-tech-grid">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 font-mono text-xs text-accent font-semibold uppercase">
            <Sparkles className="w-4 h-4" />
            <span>Local Content Management Studio</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
            Portfolio Studio
          </h1>
          <p className="font-mono text-xs text-muted-foreground">
            Version-Controlled Content Engine · Localhost 127.0.0.1 Only
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-muted border border-border text-foreground hover:border-accent transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-accent" />
            <span>Preview Public Site ↗</span>
          </a>

          <button
            onClick={handleValidate}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Validate Schema</span>
          </button>

          <button
            onClick={handlePublish}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground transition-all"
          >
            <GitCommit className="w-3.5 h-3.5" />
            <span>Publish to GitHub / Vercel</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {validationStatus.msg && (
        <div className={`p-4 rounded-2xl font-mono text-xs border flex items-center justify-between ${
          validationStatus.status === 'success' ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          <span>{validationStatus.msg}</span>
          <button onClick={() => setValidationStatus({ status: 'idle', msg: '' })} className="underline">Dismiss</button>
        </div>
      )}

      {publishStatus.msg && (
        <div className={`p-4 rounded-2xl font-mono text-xs border flex items-center justify-between ${
          publishStatus.status === 'success' ? 'bg-teal-500/10 border-teal-500/30 text-teal-400' : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          <span>{publishStatus.msg}</span>
          <button onClick={() => setPublishStatus({ status: 'idle', msg: '' })} className="underline">Dismiss</button>
        </div>
      )}

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          <div className="font-mono text-[11px] text-muted-foreground uppercase px-3 pb-2">
            Content Schemas
          </div>

          {[
            { id: 'profile', label: 'Profile & Bio', icon: User, count: '1 Record' },
            { id: 'publications', label: 'Publications Archive', icon: BookOpen, count: `${contentData.publications?.length || 0} Papers` },
            { id: 'research', label: 'Research Topics', icon: Layers, count: `${contentData.research?.length || 0} Topics` },
            { id: 'teaching', label: 'Teaching Index', icon: GraduationCap, count: `${contentData.teaching?.length || 0} Subjects` },
            { id: 'experience', label: 'Experience History', icon: Briefcase, count: `${contentData.experience?.length || 0} Roles` },
            { id: 'patents', label: 'Patents & Tech', icon: Award, count: `${contentData.patents?.length || 0} Patent` },
            { id: 'site', label: 'Site Settings', icon: Settings, count: 'Config' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-2xl font-mono text-xs transition-all ${
                  isActive
                    ? 'bg-accent text-accent-foreground font-semibold shadow-md'
                    : 'bg-card text-foreground hover:bg-muted border border-border/60'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                <span className="text-[10px] opacity-75">{tab.count}</span>
              </button>
            );
          })}
        </div>

        {/* Content Editor Workspace */}
        <div className="lg:col-span-9 glass-panel p-6 sm:p-8 rounded-3xl border border-border space-y-6">
          {/* TAB: PUBLICATIONS */}
          {activeTab === 'publications' && (
            <PublicationsStudioEditor
              initialPublications={contentData.publications}
              onSave={(updated) => handleSave('publications', updated)}
              saving={saving}
            />
          )}

          {/* TAB: RESEARCH */}
          {activeTab === 'research' && (
            <ResearchStudioEditor
              initialResearch={contentData.research}
              onSave={(updated) => handleSave('research', updated)}
              saving={saving}
            />
          )}

          {/* TAB: PROFILE */}
          {activeTab === 'profile' && (
            <ProfileStudioEditor
              initialProfile={contentData.profile}
              onSave={(updated) => handleSave('profile', updated)}
              saving={saving}
            />
          )}

          {/* TAB: TEACHING */}
          {activeTab === 'teaching' && (
            <TeachingStudioEditor
              initialTeaching={contentData.teaching}
              onSave={(updated) => handleSave('teaching', updated)}
              saving={saving}
            />
          )}

          {/* TAB: EXPERIENCE */}
          {activeTab === 'experience' && (
            <ExperienceStudioEditor
              initialExperience={contentData.experience}
              onSave={(updated) => handleSave('experience', updated)}
              saving={saving}
            />
          )}

          {/* TAB: PATENTS */}
          {activeTab === 'patents' && (
            <PatentsStudioEditor
              initialPatents={contentData.patents}
              onSave={(updated) => handleSave('patents', updated)}
              saving={saving}
            />
          )}

          {/* TAB: SITE */}
          {activeTab === 'site' && (
            <SiteStudioEditor
              initialSite={contentData.site}
              onSave={(updated) => handleSave('site', updated)}
              saving={saving}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* SUB-COMPONENTS FOR STUDIO EDITORS */

function PublicationsStudioEditor({ initialPublications, onSave, saving }: { initialPublications: any[]; onSave: (data: any) => void; saving: boolean }) {
  const [pubs, setPubs] = useState(initialPublications || []);

  const addPub = () => {
    const newId = `pub-${(pubs.length + 1).toString().padStart(2, '0')}`;
    const newPub = {
      id: newId,
      slug: `new-paper-${Date.now()}`,
      title: 'New Publication Title',
      authors: ['Dr. Harshita Kaushik'],
      year: 2026,
      venue: 'Academic Journal Name',
      abstract: 'Enter paper abstract here...',
      keywords: ['AI', 'Marketing'],
      researchAreas: ['Artificial Intelligence'],
      featured: false,
    };
    setPubs([newPub, ...pubs]);
  };

  const deletePub = (id: string) => {
    setPubs(pubs.filter((p) => p.id !== id));
  };

  const updatePub = (id: string, field: string, value: any) => {
    setPubs(pubs.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Publications Editor</h2>
          <p className="font-mono text-xs text-muted-foreground">Edit, add or remove academic publication records</p>
        </div>
        <div className="flex items-center space-x-3 font-mono text-xs">
          <button onClick={addPub} className="px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent font-semibold flex items-center space-x-1">
            <Plus className="w-3.5 h-3.5" /> <span>Add Publication</span>
          </button>
          <button onClick={() => onSave(pubs)} disabled={saving} className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground flex items-center space-x-1">
            <Save className="w-3.5 h-3.5" /> <span>{saving ? 'Saving...' : 'Save Publications'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
        {pubs.map((pub, idx) => (
          <div key={pub.id} className="p-5 rounded-2xl bg-muted/40 border border-border space-y-4 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-border/40 pb-3">
              <span className="text-accent font-semibold">{pub.id} // {pub.year}</span>
              <button onClick={() => deletePub(pub.id)} className="text-red-400 hover:text-red-500 flex items-center space-x-1">
                <Trash2 className="w-3.5 h-3.5" /> <span>Remove</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-8 space-y-1">
                <label className="text-muted-foreground">PAPER TITLE</label>
                <input
                  type="text"
                  value={pub.title}
                  onChange={(e) => updatePub(pub.id, 'title', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div className="md:col-span-4 space-y-1">
                <label className="text-muted-foreground">YEAR</label>
                <input
                  type="number"
                  value={pub.year}
                  onChange={(e) => updatePub(pub.id, 'year', parseInt(e.target.value) || 2026)}
                  className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div className="md:col-span-12 space-y-1">
                <label className="text-muted-foreground">JOURNAL / VENUE</label>
                <input
                  type="text"
                  value={pub.venue}
                  onChange={(e) => updatePub(pub.id, 'venue', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground"
                />
              </div>

              <div className="md:col-span-12 space-y-1">
                <label className="text-muted-foreground">ABSTRACT</label>
                <textarea
                  rows={3}
                  value={pub.abstract}
                  onChange={(e) => updatePub(pub.id, 'abstract', e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground font-sans text-xs"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResearchStudioEditor({ initialResearch, onSave, saving }: { initialResearch: any[]; onSave: (data: any) => void; saving: boolean }) {
  const [research, setResearch] = useState(initialResearch || []);

  const updateTopic = (id: string, field: string, value: any) => {
    setResearch(research.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Research Topics Editor</h2>
          <p className="text-muted-foreground">Edit central research themes and network descriptions</p>
        </div>
        <button onClick={() => onSave(research)} disabled={saving} className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" /> <span>{saving ? 'Saving...' : 'Save Research'}</span>
        </button>
      </div>

      <div className="space-y-6 max-h-[65vh] overflow-y-auto pr-2">
        {research.map((r) => (
          <div key={r.id} className="p-5 rounded-2xl bg-muted/40 border border-border space-y-4">
            <div className="text-accent font-semibold">{r.id} // {r.category}</div>
            <div className="space-y-1">
              <label className="text-muted-foreground">TOPIC TITLE</label>
              <input type="text" value={r.title} onChange={(e) => updateTopic(r.id, 'title', e.target.value)} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground" />
            </div>
            <div className="space-y-1">
              <label className="text-muted-foreground">DESCRIPTION</label>
              <textarea rows={3} value={r.description} onChange={(e) => updateTopic(r.id, 'description', e.target.value)} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground font-sans text-xs" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileStudioEditor({ initialProfile, onSave, saving }: { initialProfile: any; onSave: (data: any) => void; saving: boolean }) {
  const [profile, setProfile] = useState(initialProfile || {});

  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Profile & Bio Editor</h2>
          <p className="text-muted-foreground">Update verified academic background details</p>
        </div>
        <button onClick={() => onSave(profile)} disabled={saving} className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" /> <span>{saving ? 'Saving...' : 'Save Profile'}</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-muted-foreground">FULL NAME</label>
          <input type="text" value={profile.name || ''} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground">INSTITUTION</label>
          <input type="text" value={profile.institution || ''} onChange={(e) => setProfile({ ...profile, institution: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground">SUMMARY</label>
          <textarea rows={4} value={profile.summary || ''} onChange={(e) => setProfile({ ...profile, summary: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground font-sans text-xs" />
        </div>
      </div>
    </div>
  );
}

function TeachingStudioEditor({ initialTeaching, onSave, saving }: { initialTeaching: any[]; onSave: (data: any) => void; saving: boolean }) {
  const [teaching, setTeaching] = useState(initialTeaching || []);
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Teaching Subjects Editor</h2>
          <p className="text-muted-foreground">Manage 10 MBA course subjects</p>
        </div>
        <button onClick={() => onSave(teaching)} disabled={saving} className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" /> <span>{saving ? 'Saving...' : 'Save Teaching'}</span>
        </button>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {teaching.map((sub, i) => (
          <div key={sub.id} className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <div className="text-accent font-semibold">{i + 1}. {sub.code}</div>
            <input type="text" value={sub.title} onChange={(e) => {
              const updated = [...teaching];
              updated[i].title = e.target.value;
              setTeaching(updated);
            }} className="w-full p-2 rounded bg-background border border-border text-foreground font-serif text-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceStudioEditor({ initialExperience, onSave, saving }: { initialExperience: any[]; onSave: (data: any) => void; saving: boolean }) {
  const [exp, setExp] = useState(initialExperience || []);
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Experience History Editor</h2>
          <p className="text-muted-foreground">Verified academic positions & appointments</p>
        </div>
        <button onClick={() => onSave(exp)} disabled={saving} className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" /> <span>{saving ? 'Saving...' : 'Save Experience'}</span>
        </button>
      </div>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {exp.map((item, i) => (
          <div key={item.id} className="p-4 rounded-xl bg-muted/40 border border-border space-y-2">
            <div className="text-accent font-semibold">{item.startDate} – {item.endDate}</div>
            <input type="text" value={item.role} onChange={(e) => {
              const updated = [...exp];
              updated[i].role = e.target.value;
              setExp(updated);
            }} className="w-full p-2 rounded bg-background border border-border font-serif text-base" />
            <input type="text" value={item.organization} onChange={(e) => {
              const updated = [...exp];
              updated[i].organization = e.target.value;
              setExp(updated);
            }} className="w-full p-2 rounded bg-background border border-border" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PatentsStudioEditor({ initialPatents, onSave, saving }: { initialPatents: any[]; onSave: (data: any) => void; saving: boolean }) {
  const [patents, setPatents] = useState(initialPatents || []);
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Patents & Technology Editor</h2>
          <p className="text-muted-foreground">Registered IoT micro-node patent details</p>
        </div>
        <button onClick={() => onSave(patents)} disabled={saving} className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" /> <span>{saving ? 'Saving...' : 'Save Patent'}</span>
        </button>
      </div>
      {patents[0] && (
        <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3">
          <label className="text-muted-foreground">PATENT TITLE</label>
          <textarea rows={3} value={patents[0].title} onChange={(e) => setPatents([{ ...patents[0], title: e.target.value }])} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground font-serif text-lg" />
        </div>
      )}
    </div>
  );
}

function SiteStudioEditor({ initialSite, onSave, saving }: { initialSite: any; onSave: (data: any) => void; saving: boolean }) {
  const [site, setSite] = useState(initialSite || {});
  return (
    <div className="space-y-6 font-mono text-xs">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div>
          <h2 className="font-serif text-2xl font-normal text-foreground">Site Settings Editor</h2>
          <p className="text-muted-foreground">SEO titles and metadata configuration</p>
        </div>
        <button onClick={() => onSave(site)} disabled={saving} className="px-5 py-2 rounded-full bg-foreground text-background font-semibold hover:bg-accent hover:text-accent-foreground flex items-center space-x-1">
          <Save className="w-3.5 h-3.5" /> <span>{saving ? 'Saving...' : 'Save Settings'}</span>
        </button>
      </div>
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-muted-foreground">SITE TITLE</label>
          <input type="text" value={site.siteTitle || ''} onChange={(e) => setSite({ ...site, siteTitle: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground" />
        </div>
        <div className="space-y-1">
          <label className="text-muted-foreground">TAGLINE</label>
          <input type="text" value={site.tagline || ''} onChange={(e) => setSite({ ...site, tagline: e.target.value })} className="w-full p-2.5 rounded-lg bg-background border border-border text-foreground" />
        </div>
      </div>
    </div>
  );
}
