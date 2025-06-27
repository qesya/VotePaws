import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import {
  AddFavoritePayload,
  IAddFavoriteResponse,
} from "@/src/domain/addFavoriteTypes";
import { formatApiErrors } from "@/src/utils/formatApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import endpoints from "../../endpoints";

const addFavorite = async (
  payload: AddFavoritePayload,
): Promise<IAddFavoriteResponse> => {
  const { data } = await authAxios.post(
    endpoints.favorites.favorite(),
    payload,
  );
  return data;
};

const removeFavorite = async (
  favoriteId: string,
): Promise<IAddFavoriteResponse> => {
  const { data } = await authAxios.delete(
    endpoints.favorites.unfavorite(favoriteId),
  );
  return data;
};

export const useFavoriteMutationAPI = () => {
  const queryClient = useQueryClient();

  const handleError = (error: unknown) => {
    console.log("error", error);
    const message = formatApiErrors(error);
    Alert.alert("Oops!", message);
  };

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [REACT_QUERY_KEYS.GET_FAVORITES],
    });
  };

  const onFavoriteMutationAPI = useMutation<
    IAddFavoriteResponse,
    unknown,
    { payload: AddFavoritePayload }
  >({
    mutationFn: ({ payload }) => addFavorite(payload),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const onUnfavoriteMutationAPI = useMutation<
    IAddFavoriteResponse,
    unknown,
    { favoriteId: string }
  >({
    mutationFn: ({ favoriteId }) => removeFavorite(favoriteId),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return {
    onFavoriteMutationAPI,
    onUnfavoriteMutationAPI,
  };
};
