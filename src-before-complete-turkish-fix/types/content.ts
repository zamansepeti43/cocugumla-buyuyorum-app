// src/types/content.ts
export interface ContentItem {
  id: string;
  age_months: [number, number];
  age_label: string;
  area: string;
  title: string;
  format: string;
  interaction: string;
  learning_goal: string;
  source_basis: string;
  asset_status: string;
}

export interface ResearchSource {
  name: string;
  url: string;
  role: string;
}

export interface ProductionModel {
  lesson: string;
  game: string;
  story: string;
  explore: string;
  parent_layer: string;
}

export interface ContentData {
  project: string;
  version: string;
  age_range_months: [number, number];
  content_count: number;
  important_note: string;
  content: ContentItem[];
  research_sources: ResearchSource[];
  production_model: ProductionModel;
}