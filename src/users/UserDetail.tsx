import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@/hooks/useUser";
import { validateParam } from "@/utils/validationParam";
import { useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SEOHead from "@/utils/SEOHead";

const UserDetail = () => {
  const { id } = useParams<{ id: string }>();

  const idValidation = validateParam(id, { min: 1 });

  if (!idValidation.isValid) {
    return (
      <div className="w-1/2 p-8">
        <Alert variant="destructive">
          <AlertTitle>ID do usuário inválido</AlertTitle>
          <AlertDescription>
            {idValidation.error || "Parâmetro inválido"}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const { data: user, isPending, error } = useUser(idValidation.value!);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <SEOHead title={`Usuário ${user.name}`} />
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
    </>
  );
};

export default UserDetail;
