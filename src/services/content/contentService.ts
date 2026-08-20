// src/services/content/contentService.ts
import contentData from '../../data/content/content-research-pack-0.2.json';
import { ContentItem, ContentData } from '@/types/content';

// The imported JSON is of type ContentData
const data: ContentData = contentData;

export function getAllContent(): ContentItem[] {
  return data.content;
}

export function getContentById(id: string): ContentItem | undefined {
  return data.content.find(item => item.id === id);
}

export function getContentByAge(ageInMonths: number): ContentItem[] {
  return data.content.filter(item => 
    ageInMonths >= item.age_months[0] && ageInMonths <= item.age_months[1]
  );
}

export function getContentByCategory(category: string): ContentItem[] {
  // The JSON uses 'area' for category
  return data.content.filter(item => 
    item.area.toLowerCase() === category.toLowerCase()
  );
}

export function getContentByType(type: string): ContentItem[] {
  // The JSON uses 'format' for type
  return data.content.filter(item => 
    item.format.toLowerCase() === type.toLowerCase()
  );
}

export function getFeaturedContent(): ContentItem[] {
  // We'll define featured as the first 3 items for now
  // In a real app, there might be a featured flag
  return data.content.slice(0, 3);
}