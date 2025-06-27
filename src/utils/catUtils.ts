import { CatDisplayInfo, IGetCatResponse } from "@/src/domain";

export const transformCatsToDisplayInfo = (
  rawCats: IGetCatResponse[],
): CatDisplayInfo[] => {
  return rawCats
    .filter((item) => item.breeds?.length > 0)
    .map((item) => {
      const breed = item.breeds[0];
      return {
        id: item.id,
        name: breed.name,
        origin: breed.origin,
        url: item.url,
      };
    });
};
