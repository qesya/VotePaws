import { GetCatsQueryParams } from "@/src/domain";
import { buildQueryString } from "@/src/utils/buildQueryString";

export type CatEndpoints = {
  getCats: (params?: GetCatsQueryParams) => string;
  addCat: () => string;
  getCatDetails: (slug: string) => string;
};

const catsEndpoints: CatEndpoints = {
  // GET /images/search
  getCats: (params) => `/images/search${buildQueryString(params ?? {})}`,

  // POST /images/upload
  addCat: () => "/images/upload",

  // GET /images/:slug
  getCatDetails: (slug) => `images/${slug}`,
};

export default catsEndpoints;
