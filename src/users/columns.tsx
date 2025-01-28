import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <Link
          to={`/users/${user.id}`}
          className="text-sky-700 hover:text-sky-500"
        >
          {user.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "username",
    header: "User Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "website",
    header: "Web Site",
  },
  {
    accessorKey: "address.street",
    header: "Street",
  },
  {
    accessorKey: "address.city",
    header: "City",
  },
];
