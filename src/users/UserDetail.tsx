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
import { useNavigate, useParams } from "react-router";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SEOHead from "@/utils/SEOHead";
import Loading from "@/utils/Loading";
import { Button } from "@/components/ui/button";

const UserDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  if (id === "2") {
    throw new Error("Ocorreu um erro na renderização do componente");
  }

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
      <Button
        className="ml-12"
        variant={"outline"}
        onClick={() => navigate(-1)}
      >
        Voltar
      </Button>
    </>
  );
};

export default UserDetail;
