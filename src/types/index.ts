export interface Project {
  id: string;
  title: string;
  slug: string;
  hook: string;
  description: string;
  tags: string[];
  tech_stack: string[];
  thumbnail_url?: string;
  video_embed_url?: string | null;
  live_url?: string;
  featured?: boolean;
  created_at: string;
  client?: string;
  year?: string;
  role?: string;
  challenge?: string;
  solution?: string;
}

export interface Lead {
  id?: string;
  name: string;
  email: string;
  project_type: string;
  message: string;
  created_at?: string;
}

export type ProjectTag = 'All' | 'Client Site' | 'Student Project' | 'Concept Build';
