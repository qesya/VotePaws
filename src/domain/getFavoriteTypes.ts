export interface IGetFavoriteResponse {
  id: number;
  user_id: string;
  image_id: string;
  sub_id: null;
  created_at: string;
  image: Image;
}

interface Image {
  id: string;
  url: string;
}

export type FavoriteCatInfo = {
  id: string;
  image: {
    id: string;
    url: string;
  };
  favoritedAt: string;
  favoriteId: string;
};
