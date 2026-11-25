export type NavSection = 'home' | 'work' | 'about' | 'journal' | 'contact' | 'none';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
  navSection: NavSection;
  ogType?: 'website' | 'article';
}

export type KiteDemoStep = 1 | 2 | 3 | 'complete';

export interface KiteDemoModalProps {
  open: boolean;
  onClose: () => void;
  initialStep?: KiteDemoStep;
}

export type GlassButtonState = 'Default' | 'Hover' | 'Active' | 'Focus' | 'Loading' | 'Disabled';
