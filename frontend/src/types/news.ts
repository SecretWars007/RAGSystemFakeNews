export interface News {
  id: string;

  title: string;

  content: string;

  source: string;

  author?: string;

  url?: string;

  language?: string;

  country?: string;

  published_at?: string;

  is_fake?: boolean;
}
