export interface IGetVoteResponse {
  id: number;
  image_id: string;
  value: number;
}

export interface UpdateVotingPayload {
  image_id: string;
  sub_id?: string;
  value: number;
}

export interface IUpdateVotingResponse {
  message: string;
  id: number;
  image_id: string;
  sub_id: string;
  value: number;
  country_code: string;
}

export type VotingImage = {
  id: string;
  url: string;
  voteId: string;
  totalVotes: number;
};
