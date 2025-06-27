export type CatImageSize = "thumb" | "small" | "med" | "full";
export type CatMimeTypes = "jpg" | "png" | "gif";
export type CatFormat = "json" | "src";
export type CatOrder = "RANDOM" | "ASC" | "DESC";

export type GetCatsQueryParams = {
  size?: CatImageSize;
  mime_types?: string;
  format?: CatFormat;
  has_breeds?: boolean;
  order?: CatOrder;
  page?: number;
  limit?: number;
};

export interface IGetCatResponse {
  breeds: Breed[];
  id: string;
  url: string;
  width: number;
  height: number;
}

interface Breed {
  weight: Weight;
  id: string;
  name: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  temperament: string;
  origin: string;
  country_codes: string;
  country_code: string;
  description: string;
  life_span: string;
  indoor: number;
  lap?: number;
  alt_names: string;
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  wikipedia_url: string;
  hypoallergenic: number;
  reference_image_id: string;
}

interface Weight {
  imperial: string;
  metric: string;
}

export interface CatDisplayInfo {
  id: string;
  name: string;
  origin: string;
  url: string;
}
