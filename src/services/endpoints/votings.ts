export type VotingEndpoints = {
  getVotings: () => string;
  getVotingDetails: (voteId: string) => string;
  updateVoting: () => string;
  deleteVote: (voteId: string) => string;
};

const votingEndpoints: VotingEndpoints = {
  // GET /votes
  getVotings: (): string => "/votes",

  // GET /votes/:vote_id
  getVotingDetails: (voteId: string) => `/votes/${voteId}`,

  // POST /votes
  updateVoting: (): string => "/votes",

  // DEL /votes/:vote_id
  deleteVote: (voteId: string) => `/votes/${voteId}`,
};

export default votingEndpoints;
