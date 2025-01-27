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
<body class="antialiased">
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

No arquivo index.html adicione as linhas abaixo no head:

```html
<link rel="preconnect" href="https://rsms.me/" />
<link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
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

Criar a pasta hooks

Crie um tipo na nova pasta types no arquivo index.ts:

Para criar o tipo correto, utilize o site [JSON to Typescript](https://transform.tools/json-to-typescript),
copie a resposta da API no formato JSON e cole no site!

Altere root para o nome correto...

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

## Aplicação para testar o hook useUsers que incapsula o React Query

```tsx
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
```
