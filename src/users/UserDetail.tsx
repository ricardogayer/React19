import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { useParams } from "react-router";

const UserDetail = () => {
  const { id } = useParams();

  if (!id) {
    return null;
  }

  const { data: user, isPending, error } = useUser(+id);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="w-1/2 p-12">
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.username}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{user.email}</p>
        </CardContent>
        <CardFooter>
          <p>
            {user.address.street} - {user.address.city}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserDetail;
