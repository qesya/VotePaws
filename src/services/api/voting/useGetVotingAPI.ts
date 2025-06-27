import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { extractErrorMessage } from "@/src/utils/errorUtils";
import { useQuery } from "@tanstack/react-query";
import endpoints from "../../endpoints";

const getVotings = async () => {
  try {
    const { data } = await authAxios.get(endpoints.votings.getVotings());

    return data;
  } catch (error: any) {
    if (error.response) {
      const message = extractErrorMessage(error.response.data);
      throw new Error(message);
    }
    console.error("ERROR REQUEST:", error.request);

    throw new Error("No response received from the server");
  }
};

export const useGetVotingsAPI = () => {
  return useQuery({
    queryKey: [REACT_QUERY_KEYS.GET_VOTINGS],
    queryFn: () => getVotings(),
  });
};
