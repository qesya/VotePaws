import {
  useDeleteVotingMutationAPI,
  useGetVotingsAPI,
  useUpVotingMutationAPI,
} from "@/src/services";
import { transformVotingData } from "@/src/utils";
import React, { useMemo } from "react";
import VotingView from "./voting-view";

export default function HomeScreen() {
  const { data, isLoading } = useGetVotingsAPI();
  const { onUpVotingMutation } = useUpVotingMutationAPI();
  const { onDeleteVotingMutation } = useDeleteVotingMutationAPI();

  const images = useMemo(() => {
    if (!data) return [];
    return transformVotingData(data);
  }, [data]);

  return (
    <VotingView
      data={images}
      isLoading={isLoading}
      onLike={(imageId) =>
        onUpVotingMutation.mutate({
          payload: { image_id: imageId, value: 1, sub_id: "my-user-27052025" },
        })
      }
      onDislike={(voteId) => onDeleteVotingMutation.mutate(voteId)}
      isVoting={
        onUpVotingMutation.isPending || onDeleteVotingMutation.isPending
      }
    />
  );
}
