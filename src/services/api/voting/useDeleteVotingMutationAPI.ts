import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { formatApiErrors } from "@/src/utils/formatApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import endpoints from "../../endpoints";

const deleteVoting = async (voteId: string): Promise<void> => {
  try {
    await authAxios.delete(endpoints.votings.deleteVote(voteId));
  } catch (error: any) {
    console.error("DELETE ERROR", error);
    if (error.response) {
      throw error;
    }
    throw new Error("No response received from the server");
  }
};

export const useDeleteVotingMutationAPI = () => {
  const queryClient = useQueryClient();

  const onDeleteVotingMutation = useMutation({
    mutationFn: (voteId: string) => deleteVoting(voteId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.GET_VOTINGS],
      });
    },
    onError: (error) => {
      const message = formatApiErrors(error);
      Alert.alert("Failed to delete vote", message);
    },
  });

  return {
    onDeleteVotingMutation,
  };
};
