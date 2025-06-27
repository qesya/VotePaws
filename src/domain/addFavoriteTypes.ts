export interface AddFavoritePayload {
  image_id: string;
  sub_id?: string;
}

export interface IAddFavoriteResponse {
  message: string;
  id: number;
}
