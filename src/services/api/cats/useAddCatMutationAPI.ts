import { authUploadAxios } from "@/src/config/axios-config";
import { IAddCatResponse } from "@/src/domain";
import { formatApiErrors } from "@/src/utils/formatApiErrors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Alert } from "react-native";
import endpoints from "../../endpoints";

const uploadCat = async (payload: FormData): Promise<IAddCatResponse> => {
  try {
    const { data } = await authUploadAxios.post(
      endpoints.cats.addCat(),
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

export const useUploadCatMutationAPI = () => {
  const queryClient = useQueryClient();

  const onUploadCatMutationAPI = useMutation({
    mutationFn: ({ payload }: { payload: FormData }) => uploadCat(payload),
    onSuccess: () => {},
    onError: (error: any) => {
      console.log("error", JSON.stringify(error));
      const message = formatApiErrors(error);
      Alert.alert("Oops!", message);
    },
  });

  return {
    onUploadCatMutationAPI,
  };
};
