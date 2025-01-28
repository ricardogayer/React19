import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/apiClient";

const getUser = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  return response.data;
};

export const useUser = (id: number) => {
  return useQuery<User>({
    queryKey: ["users", id],
    queryFn: () => getUser(id),
  });
};
