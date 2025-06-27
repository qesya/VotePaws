// FAVORITES
import { AddFavoritePayload, IAddFavoriteResponse } from "./addFavoriteTypes";
import { FavoriteCatInfo, IGetFavoriteResponse } from "./getFavoriteTypes";

// CATS
import { IAddCatResponse } from "./addCatTypes";
import {
  CatDisplayInfo,
  CatFormat,
  CatImageSize,
  CatMimeTypes,
  CatOrder,
  GetCatsQueryParams,
  IGetCatResponse,
} from "./getCatTypes";

// CAT DETAILS
import { IGetCatDetailsResponse } from "./getCatDetailsTypes";

// VOTES
import {
  IGetVoteResponse,
  IUpdateVotingResponse,
  UpdateVotingPayload,
  VotingImage,
} from "./voteTypes";

export type {
  AddFavoritePayload,
  CatDisplayInfo,
  CatFormat,
  CatImageSize,
  CatMimeTypes,
  CatOrder,
  FavoriteCatInfo,
  GetCatsQueryParams,
  IAddCatResponse,
  IAddFavoriteResponse,
  IGetCatDetailsResponse,
  IGetCatResponse,
  IGetFavoriteResponse,
  IGetVoteResponse,
  IUpdateVotingResponse,
  UpdateVotingPayload,
  VotingImage,
};
