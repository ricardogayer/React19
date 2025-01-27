import { useUsers } from "./hooks/useUsers";
import { User } from "./types";
import { columns } from "./users/columns";
import { DataTable } from "./users/data-table";

function App() {
  const { data: users = [] as User[], isPending, error } = useUsers();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="p-12">
      <DataTable columns={columns} data={users} />
    </div>
  );
}

export default App;
