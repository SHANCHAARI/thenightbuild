import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Project, Lead } from '@/types';
import { MOCK_PROJECTS } from '@/data/mock-projects';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project.supabase.co' && 
  !supabaseUrl.includes('placeholder')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Fetch all published projects.
 * Falls back to MOCK_PROJECTS if Supabase is unconfigured or returns an error.
 */
export async function getProjects(): Promise<Project[]> {
  if (!supabase) {
    return MOCK_PROJECTS;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn('Supabase fetch returned empty or error, falling back to mock data:', error?.message);
      return MOCK_PROJECTS;
    }

    return data as Project[];
  } catch (err) {
    console.error('Failed to query Supabase projects:', err);
    return MOCK_PROJECTS;
  }
}

/**
 * Fetch a single project by slug.
 */
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!supabase) {
    return MOCK_PROJECTS.find((p) => p.slug === slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      return MOCK_PROJECTS.find((p) => p.slug === slug) || null;
    }

    return data as Project;
  } catch (err) {
    console.error('Error fetching project by slug from Supabase:', err);
    return MOCK_PROJECTS.find((p) => p.slug === slug) || null;
  }
}

/**
 * Submit an inquiry lead to Supabase leads table.
 */
export async function submitLead(lead: Lead): Promise<{ success: boolean; error?: string; leadId?: string }> {
  if (!supabase) {
    // In mock mode: simulate a realistic network delay and return success
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      leadId: 'demo-' + Math.random().toString(36).substring(2, 9),
    };
  }

  try {
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          name: lead.name,
          email: lead.email,
          project_type: lead.project_type,
          message: lead.message,
        },
      ])
      .select('id')
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, leadId: data?.id };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Network error submitting inquiry.' };
  }
}
