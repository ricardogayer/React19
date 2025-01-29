import SEOHead from "@/utils/SEOHead";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/types";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import Loading from "@/utils/Loading";

function UserList() {
  const { data: users = [] as User[], isPending, error } = useUsers();

  if (isPending) {
    return (
      <div className="flex h-full min-h-screen items-center justify-center">
        <Loading ringColor="text-gray-300" spinnerColor="text-foreground" />
      </div>
    );
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <SEOHead title="Lista de Usuários" />
      <div className="p-12">
        <DataTable columns={columns} data={users} />
      </div>
    </>
  );
}

export default UserList;
