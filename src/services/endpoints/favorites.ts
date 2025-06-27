export type FavoriteEndpoints = {
  getFavorites: () => string;
  getFavoritesDetails: (favoriteId: string) => string;
  unfavorite: (favoriteId: string) => string;
  favorite: () => string;
};

const favoriteEndpoints: FavoriteEndpoints = {
  // GET /favourites
  getFavorites: (): string => "/favourites",

  // GET /favourites/:favourite_id
  getFavoritesDetails: (favoriteId) => `/favourites/${favoriteId}`,

  // DEL /favourites/:favourite_id
  unfavorite: (favoriteId: string): string => `/favourites/${favoriteId}`,

  // POST /favourites
  favorite: () => "/favourites",
};

export default favoriteEndpoints;
