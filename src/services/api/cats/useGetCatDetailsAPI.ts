import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { IGetCatDetailsResponse } from "@/src/domain";
import { extractErrorMessage } from "@/src/utils/errorUtils";
import { useQuery } from "@tanstack/react-query";
import endpoints from "../../endpoints";

const getCatDetails = async (slug: string): Promise<IGetCatDetailsResponse> => {
  try {
    const url = endpoints.cats.getCatDetails(slug);
    const { data } = await authAxios.get(url);
    return data;
  } catch (error: any) {
    if (error.response) {
      const message = extractErrorMessage(error.response.data);
      throw new Error(message);
    }

    console.log("ERROR REQUEST:", error.request);
    throw new Error("No response received from the server");
  }
};

export const useGetCatDetailsAPI = (slug: string) => {
  return useQuery<IGetCatDetailsResponse, Error>({
    queryKey: [REACT_QUERY_KEYS.GET_CAT_DETAILS, slug],
    queryFn: () => getCatDetails(slug),
  });
};
