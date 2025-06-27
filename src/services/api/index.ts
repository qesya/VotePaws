// CATS API
import { useUploadCatMutationAPI } from "./cats/useAddCatMutationAPI";
import { useGetCatDetailsAPI } from "./cats/useGetCatDetailsAPI";
import { useGetCatsAPI } from "./cats/useGetCatsAPI";

// FAVORITES
import { useFavoriteMutationAPI } from "./favorites/useFavoriteMutationAPI";
import { useGetFavoritesAPI } from "./favorites/useGetFavoritesAPI";

// VOTING
import { useDeleteVotingMutationAPI } from "./voting/useDeleteVotingMutationAPI";
import { useGetVotingsAPI } from "./voting/useGetVotingAPI";
import { useUpVotingMutationAPI } from "./voting/useUpVotingMutationAPI";

export {
  useDeleteVotingMutationAPI,
  useFavoriteMutationAPI,
  useGetCatDetailsAPI,
  useGetCatsAPI,
  useGetFavoritesAPI,
  useGetVotingsAPI,
  useUploadCatMutationAPI,
  useUpVotingMutationAPI,
};
