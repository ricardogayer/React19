// // Uso básico - usa as cores padrão do tema
// <Loading />

// // Customizando as cores
// <Loading ringColor="text-gray-300" spinnerColor="text-foreground" />

// // Com diferentes tamanhos
// <Loading size="lg" />
// <Loading size="sm" />

// // Não centralizado
// <Loading centered={false} />

// // Usando className para customização adicional
// <Loading className="mt-8" />

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
