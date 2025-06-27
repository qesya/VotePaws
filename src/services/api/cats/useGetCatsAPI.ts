import { authAxios } from "@/src/config/axios-config";
import { REACT_QUERY_KEYS } from "@/src/config/react-query-keys";
import { GetCatsQueryParams, IGetCatResponse } from "@/src/domain";
import { extractErrorMessage } from "@/src/utils/errorUtils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import endpoints from "../../endpoints";

const getCats = async (
  params: GetCatsQueryParams = {},
): Promise<IGetCatResponse[]> => {
  try {
    const url = endpoints.cats.getCats(params);
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

export const useGetCatsAPI = (params: GetCatsQueryParams = {}) => {
  return useQuery<IGetCatResponse[], Error>({
    queryKey: [REACT_QUERY_KEYS.GET_CATS, params],
    queryFn: () => getCats(params),
    placeholderData: keepPreviousData,
  });
};
