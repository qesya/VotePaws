import { CatImageDetailsMedia } from "@/src/components/organisms/CatImageDetails/CatImageDetails.types";

type RawCatDetails = {
  id: string;
  url: string;
  breeds?: any[];
};

export type TransformedCatDetails = {
  media: CatImageDetailsMedia[];
  title: string;
  origin: string;
  description: string | null;
  temperament?: string;
  lifeSpan?: string;
  wikipediaUrl?: string;
};

export function transformCatDetails(
  data: RawCatDetails | undefined,
): TransformedCatDetails {
  const breed = data?.breeds?.[0];

  return {
    media: data?.url ? [{ id: data.id, src: data.url }] : [],
    title: breed?.name ?? "Unknown",
    origin: breed?.origin ?? "Unknown",
    description: breed?.description ?? null,
    temperament: breed?.temperament,
    lifeSpan: breed?.life_span,
    wikipediaUrl: breed?.wikipedia_url,
  };
}
