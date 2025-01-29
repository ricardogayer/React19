# Projeto React 19 com Vite

## Criação de um projeto React 18 com Typescript

```sh
npm create vite@latest projeto -- --template react-ts
cd projeto
npm install
```

## Upgrade de React 18 para React 19

```sh
npm install --save-exact react@^19.0.0 react-dom@^19.0.0
npm install --save-exact @types/react@^19.0.0 @types/react-dom@^19.0.0
```

## Instalação do Tailwind 3 (a versão 4 ainda tem alguns problemas com o shadcn/ui)

```sh
npm install -D tailwindcss@3.x.x postcss autoprefixer
npx tailwindcss init -p
```

No arquivo tailwind.config.js atualiza a sessão content:

```js
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
```

No arquivo index.css substituir todo o conteúdo por:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

No arquivo index.html adicionar o diretiva antialiased para deixar a renderização da font melhor:

```html
<body class="bg-gray-50 antialiased">
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>
```

Altere o arquivo App.tsx para testar o TailwindCSS 3.x.x:

```tsx
function App() {
  return (
    <>
      <div className="m-4 text-indigo-500">Hello World</div>
    </>
  );
}

export default App;
```

Para evitar erros no arquivo CSS devido a importação do Tailwind "@tailwind", crie o arquivo .vscode/settings.json

```sh
touch .vscode/settings.json
```

E adicione a seguintes linhas:

```json
{
  "files.associations": {
    "*.css": "tailwindcss"
  }
}
```

Para correta formação das diretivas do Tailwind CSS, instale o Prettier:

```sh
npm install -D prettier prettier-plugin-tailwindcss
touch .prettierrc
```

E adicione ao arquivo o conteúdo abaixo:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

### Instalação da font Inter 4.0

No arquivo index.html adicione as linhas abaixo no head para utilização on-line.

```html
<link rel="preconnect" href="https://rsms.me/" />
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
```

Para efetuar a utilização local, faça o donwload da font Inter em [Inter Download](https://rsms.me/inter/download/)
Copie o conteúdo da pasta web para "/public/fonts/inter" do projeto React.

```html
<!-- <link rel="preconnect" href="https://rsms.me/" />
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" /> -->
<link rel="stylesheet" href="/fonts/inter/inter.css" />
```

Em produção, o NGINX deve ser configurado para "servir" as fontes:

```json
# Exemplo de configuração no servidor (nginx)
location /fonts/ {
    add_header Cache-Control "public, max-age=31536000";
    add_header Access-Control-Allow-Origin "*";
    gzip_static on;
    gzip_types application/x-font-ttf application/x-font-opentype application/font-woff application/font-woff2;
}
```

No arquivo tailwind.config.js adicione a font Inter:

```js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
```

Para configuração de **_Tabular Numbers_**, adicione a configuração abaixo no TailwindCSS 3:

```js
/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      addBase({
        html: { fontFeatureSettings: '"tnum" on' },
      });
    },
  ],
};
```

Para validação da configuração do Tailwind CSS, use o exemplo abaixo:

```tsx
<>
  <div className="m-4 text-gray-500">0123456789</div>
  <div className="m-4 text-gray-500">1111111111</div>
  <div className="m-4 text-gray-500">8888800025</div>
  <div className="m-4 text-gray-500">3*9 12:34 3–8 +8+x</div>
  <div className="m-4 font-medium text-gray-500">S@N s@n :-) •Smile</div>
  <div className="m-4 font-light text-gray-500">Hello World</div>
  <div className="m-4 text-sm text-gray-500">Hello World</div>
  <div className="m-4 text-lg font-medium text-gray-500">Hello World</div>
  <div className="m-4 text-xl font-light text-gray-500">Hello World</div>
</>
```

## Instalação do Shadcn/UI

No arquivo tsconfig.json adicionar as seguintes opções:

```json
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
```

No arquivo tsconfig.app.json adicionar as seguintes opções:

```json
    "baseUrl": ".",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
```

Instalar o pacote @types/node:

```sh
npm install -D @types/node
```

No arquivo vite.config.ts adicionar as linhas abaixo:

```ts
import path from "path"

resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
```

Execute o shadcn-ui init:

```sh
npx shadcn@latest init
```

Opções:

- Default
- Gray
- CSS variables: Yes

Escolha "Use --legacy-peer-deps"

## Configuração do Tanstack Query

Instalação do Tanstack Query

```sh
npm install axios
npm install @tanstack/react-query
npm install @tanstack/react-query-devtools
```

Configuração do QueryClientProvider e ReactQueryDevtools no arquivo main.tsx:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
```

### Configuração do Axios

Crie uma pasta chamada api e um arquivo chamado api.ts

```ts
import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api",
  withCredentials: true,
});
```

Defina um arquivo .env para definição das variáveis de ambiente:

```txt
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
```

Faça uma cópia e remova os dados sensíveis

```sh
cp .env .env.local
```

Adicione .env no .gitignore:

```txt
...
# Arquivo de Configuração
.env
...
```

### Criação de um hook para consumo de dados da API (para teste)

Crie um arquivo index.ts na pasta types:

Para criar o tipo correto, utilize o site [JSON to Typescript](https://transform.tools/json-to-typescript),
basta copia e colar a resposta da API no formato JSON e o site gera o tipo correto!

Altere root para o nome correto... Neste exemplo é User!

```ts
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
```

Hook useUsers.tsx criado na pasta hooks:

```ts
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
```

## Componente Loading padronizado

```tsx
// @/utils/Loading.tsx
import React from "react";

interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  centered?: boolean;
  ringColor?: string;
  spinnerColor?: string;
}

const sizeMap = {
  sm: "h-8 w-8",
  md: "h-16 w-16",
  lg: "h-24 w-24",
};

const joinClassNames = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  (
    {
      size = "md",
      centered = true,
      className = "",
      ringColor = "text-gray-200",
      spinnerColor = "text-foreground",
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Carregando"
        className={joinClassNames(
          "transition-all duration-200",
          centered ? "flex items-center justify-center" : "",
          className,
        )}
        {...props}
      >
        <div className={joinClassNames("animate-spin", sizeMap[size])}>
          <svg
            className="h-full w-full"
            viewBox="0 0 94 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="47"
              cy="47"
              r="45"
              className={ringColor}
              strokeWidth="3"
              stroke="currentColor"
            />
            <path
              d="M92 46C92 22.5 71.5 2 48 2"
              className={spinnerColor}
              strokeWidth="3"
              stroke="currentColor"
            />
          </svg>
        </div>
        <span className="sr-only">Carregando...</span>
      </div>
    );
  },
);

Loading.displayName = "Loading";

export default Loading;
```

## Aplicação para testar o hook useUsers que incapsula o React Query

```tsx
import { useUsers } from "./hooks/useUsers";
import { User } from "./types";

function App() {
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
```

## Criação de um Data Table (shadcn/ui) utilizando os dados do useUsers

Instalação dos componentes necessários:

```sh
npx shadcn@latest add table
npm install @tanstack/react-table
```

Crie uma pasta chamada users para colocarmos 2 arquivos.
Em projetos maiores, crie mais um arquivo para fazer a renderização da tabela.

Crie um arquivo chamado columns.tsx para definição das colunas da tabela:

```tsx
import { User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Nome",
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
```

Crie um arquivo chamado data-table.tsx para definição da tabela.
Alteração do background color para white (única customização)

```tsx
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
```

Altere o arquivo App.tsx para renderizar a tabela:

```tsx
import { useUsers } from "./hooks/useUsers";
import { User } from "./types";
import { columns } from "./users/columns";
import { DataTable } from "./users/data-table";

function App() {
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
    <div className="p-12">
      <DataTable columns={columns} data={users} />
    </div>
  );
}

export default App;
```

## Instação do React Router v7 (como Library)

```sh
npm install react-router
```

Definição das rotas em main.tsx:

```tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/users" element={<UserList />} />
    <Route path="/users/:id" element={<UserDetail />} />
  </Routes>
</BrowserRouter>
```

Utilização de lazy load das páginas seguintes em main.tsx

```tsx
const UserList = lazy(() => import("./users/UserList.tsx"));
const UserDetail = lazy(() => import("./users/UserDetail.tsx"));
```

Nova página App de entrada na aplicação:

```tsx
import { Link } from "react-router";

export default function App() {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50"></header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
              React 19 com Vite App Template
            </h1>
            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
              TailwindCSS, Shadcn/UI, Inter Font, Tanstack Query & React Router
              v7
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/users"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Users
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
```

Página UserList

```tsx
import { useUsers } from "../hooks/useUsers";
import { User } from "../types";
import { columns } from "./columns";
import { DataTable } from "./data-table";

function UserList() {
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

export default UserList;
```

Novo useUser hook para consulta de apenas um usuário:

```ts
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
```

Instalação do Card e Alert do Shadcn/UI para mostrar o detalhe do usuário e tratar parâmetro inválido.

```sh
npx shadcn@latest add card
npx shadcn@latest add alert
```

Página para visualizar o detalhe do usuários.
Nesta página temos a recuperação do id do usuário através do useParams do React Router v7:

```tsx
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
```

Para validação do ID usuário, parâmetro passado pela URL, utilizamos uma função para validar se o parâmetro é numérico.
Esta validação é importante para não quebrar a navegação...

```ts
// @/utils/validationParam.ts
type ValidationResult<T> = {
  isValid: boolean;
  value: T | null;
  error?: string;
};

export const validateParam = (
  rawId: string | undefined,
  options: {
    min?: number;
    max?: number;
    allowZero?: boolean;
  } = {},
): ValidationResult<number> => {
  const { min = 1, max = Number.MAX_SAFE_INTEGER, allowZero = false } = options;

  if (!rawId) {
    return {
      isValid: false,
      value: null,
      error: "Um parâmetro numérico é obrigatório",
    };
  }

  const parsedId = parseInt(rawId, 10);

  if (isNaN(parsedId)) {
    return {
      isValid: false,
      value: null,
      error: "O parâmetro deve ser um número válido",
    };
  }

  if (!allowZero && parsedId === 0) {
    return {
      isValid: false,
      value: null,
      error: "O parâmetro não pode ser zero",
    };
  }

  if (parsedId < min) {
    return {
      isValid: false,
      value: null,
      error: `O parâmetro deve ser maior ou igual a ${min}`,
    };
  }

  if (parsedId > max) {
    return {
      isValid: false,
      value: null,
      error: `O parâmetro deve ser menor ou igual a ${max}`,
    };
  }

  return {
    isValid: true,
    value: parsedId,
  };
};
```

## Implementação de SEO básico para 100% de Lighthouse

```sh
npm install react-helmet-async --legacy-peer-deps
```

Configure o Helmet Provider no main.tsx:

```tsx
// @/main.tsx
import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import { HelmetProvider } from "react-helmet-async";

const UserList = lazy(() => import("./users/UserList.tsx"));
const UserDetail = lazy(() => import("./users/UserDetail.tsx"));

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </BrowserRouter>
      </HelmetProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>,
);
```

Criamos um componente chamado SEOHead reutilização do SEO em todas as páginas.
Ele deve ser configurado com as mensagens padrão e ter suas propriedades sobreescritas em cada página.

```tsx
// @/utils/SEOHead.tsx
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}

const SEOHead = ({
  title = "React 19 Boilerplate",
  description = "Boilerplate para projetos React 19",
  image = "/og-image.jpg", // Imagem padrão
  url = window.location.href,
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Ricardo Ribeirto Gayer",
  keywords = [
    "react",
    "boilerplate",
    "typescript",
    "tailwindcss",
    "eslint",
    "prettier",
  ],
}: SEOHeadProps) => {
  const siteName = "React19 Boilerplate";
  const twitterHandle = "@ricardogayer";

  return (
    <Helmet>
      {/* Tags básicas */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />

      {/* Metadados adicionais para artigos */}
      {type === "article" && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === "article" && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === "article" && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Favicons e ícones */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />

      {/* Metadados específicos para PWA */}
      <meta name="application-name" content={siteName} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#004F92" />
    </Helmet>
  );
};

export default SEOHead;
```

```tsx
// @/App.tsx
import { Link } from "react-router";
import SEOHead from "./utils/SEOHead";

export default function App() {
  return (
    <>
      <SEOHead />
      <div className="bg-white">// Conteúdo</div>
    </>
  );
}
```

Nas páginas internas os SEOs podem ser customizados!

```tsx
// @/users/UserDetails/tsx
<>
  <>
    <SEOHead title={`Usuário ${user.name}`} />
    <div className="w-1/2 p-12"></div>
  </>
</>
```

Crie o arquivo public\robots.txt com o conteúdo abaixo:

```txt
# https://www.robotstxt.org/robotstxt.html
# Robots.txt file for React application

# Allow all crawlers (default)
User-agent: *
Allow: /

# Protect sensitive directories
Disallow: /admin/
Disallow: /private/
Disallow: /api/

# Development and build files
Disallow: /node_modules/
Disallow: /build/
Disallow: /coverage/

# Sitemap location
Sitemap: https://www.seusite.com/sitemap.xml

# Specific crawler settings
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1
```

Execute o Lighthouse no Google Chrome e SEO precisa dar 100%!
