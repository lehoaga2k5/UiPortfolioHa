import React, { useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router';
import type { NavSection } from './types/portfolio';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { KiteCasePage } from './pages/KiteCasePage';
import { BudgetCasePage } from './pages/BudgetCasePage';
import { ReminderCasePage } from './pages/ReminderCasePage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { NoteSpacingPage } from './pages/NoteSpacingPage';
import { NoteStatesPage } from './pages/NoteStatesPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ButtonStatesPlayground } from './features/states/ButtonStatesPlayground';
import { usePageMeta } from './seo/routeMeta';

const WORK_PATHS = new Set(['/work', '/work/kite', '/work/budget-overview', '/work/reminder-flow']);
const JOURNAL_PATHS = new Set([
  '/journal',
  '/journal/spacing-and-hierarchy',
  '/journal/component-states',
]);

function resolveActiveSection(pathname: string): NavSection {
  const clean = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (clean === '/') return 'home';
  if (WORK_PATHS.has(clean)) return 'work';
  if (clean === '/about') return 'about';
  if (JOURNAL_PATHS.has(clean)) return 'journal';
  if (clean === '/contact') return 'contact';
  return 'none';
}

function ScrollAndMetaManager() {
  const { pathname, hash } = useLocation();
  usePageMeta(pathname);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export function App() {
  const { pathname } = useLocation();
  const activeSection = resolveActiveSection(pathname);

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col bg-[#F7F6F3] text-[#111111]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-[#111111] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <ScrollAndMetaManager />
        <SiteHeader activeSection={activeSection} />
        <main id="main-content" className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/kite" element={<KiteCasePage />} />
            <Route path="/work/budget-overview" element={<BudgetCasePage />} />
            <Route path="/work/reminder-flow" element={<ReminderCasePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/journal/spacing-and-hierarchy" element={<NoteSpacingPage />} />
            <Route
              path="/journal/component-states"
              element={
                <NoteStatesPage>
                  <ButtonStatesPlayground />
                </NoteStatesPage>
              }
            />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  );
}

export default App;
