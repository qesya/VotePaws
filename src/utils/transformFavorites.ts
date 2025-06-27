import { FavoriteCatInfo } from "../domain";
import { formatRelativeTime } from "../utils";

type FavoriteItem = {
  id: number;
  image_id: string;
  image: {
    id: string;
    url: string;
  };
  created_at: string;
};

export function transformFavorites(
  data: FavoriteItem[] | undefined,
): FavoriteCatInfo[] {
  if (!data) return [];

  return data.map((item) => ({
    id: item.image_id,
    image: {
      id: item.image.id,
      url: item.image.url,
    },
    favoritedAt: formatRelativeTime(item.created_at),
    favoriteId: item.id.toString(),
  }));
}
