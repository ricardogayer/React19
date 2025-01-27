import { User } from "@/types";
import { useQuery } from "@tanstack/react-query";
import api from "@/api/apiClient";

const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>(`/users`);
  return response.data;
};

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });
};
