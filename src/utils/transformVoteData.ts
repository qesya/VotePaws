import { VotingImage } from "../domain";

type RawVote = {
  id: number;
  image_id: string;
  value: number;
  image?: { url: string };
  created_at?: string;
};

export function transformVotingData(data: RawVote[]): VotingImage[] {
  // Group all votes by image_id
  const groupedVotes = new Map<string, RawVote[]>();

  for (const vote of data) {
    const { image_id, image } = vote;
    if (!image?.url) continue;

    if (!groupedVotes.has(image_id)) {
      groupedVotes.set(image_id, [vote]);
    } else {
      groupedVotes.get(image_id)!.push(vote);
    }
  }

  const result: VotingImage[] = [];

  for (const [image_id, votes] of groupedVotes.entries()) {
    const sortedVotes = votes.sort((a, b) => {
      const aTime = a.created_at ? new Date(a.created_at).getTime() : a.id;
      const bTime = b.created_at ? new Date(b.created_at).getTime() : b.id;
      return bTime - aTime;
    });

    const latestVote = sortedVotes[0];
    result.push({
      id: image_id,
      url: latestVote.image!.url,
      voteId: latestVote.id.toString(),
      totalVotes: votes.length,
    });
  }

  return result;
}
