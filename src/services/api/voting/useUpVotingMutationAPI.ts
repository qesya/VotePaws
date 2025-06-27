import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { IUpdateVotingResponse, UpdateVotingPayload } from "@/src/domain";
import { formatApiErrors } from "@/src/utils/formatApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import endpoints from "../../endpoints";

const updateVoting = async (
  payload: UpdateVotingPayload,
): Promise<IUpdateVotingResponse> => {
  try {
    const { data } = await authAxios.post(
      endpoints.votings.updateVoting(),
      payload,
    );

    return data;
  } catch (error: any) {
    console.error("ERROR", error);
    if (error.response) {
      throw error;
    }
    throw new Error("No response received from the server");
  }
};

export const useUpVotingMutationAPI = () => {
  const queryClient = useQueryClient();

  const onUpVotingMutation = useMutation({
    mutationFn: ({ payload }: { payload: UpdateVotingPayload }) =>
      updateVoting(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [REACT_QUERY_KEYS.GET_VOTINGS],
      });
    },
    onError: (error) => {
      const message = formatApiErrors(error);
      Alert.alert("Oops!", message);
    },
  });

  return {
    onUpVotingMutation,
  };
};
