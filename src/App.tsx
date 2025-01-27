import { useUsers } from "./hooks/useUsers";
import { User } from "./types";

function App() {
  const { data: users = [] as User[], isPending, error } = useUsers();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="m-4">
      {users.map((user) => (
        <div key={user.id}>
          <h2 className="font-semibold text-sky-700">{user.name}</h2>
          <p className="mb-4 font-light text-sky-600">{user.email}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
