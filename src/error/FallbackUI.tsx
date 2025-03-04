import { useState } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

const FallbackUI = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigateToHome = () => (window.location.href = "/");

  const handleResetApp = () => {
    // Coloque aqui a limpeza de estado global, cache, etc.
    resetErrorBoundary();
  };

  const handleResetErrorBoundary = () => {
    handleResetApp();
    setShowDetails(false);
  };

  const handleNavigateHome = () => {
    handleResetApp();
    navigateToHome();
    setShowDetails(false);
  };

  return (
    <div className="mx-auto my-8 flex max-w-xl flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-8 shadow-lg">
      <div className="mb-4 flex items-center justify-center rounded-full bg-red-50 p-4 text-red-500">
        <AlertTriangle size={32} />
      </div>

      <h2 className="mb-2 text-center text-2xl font-semibold text-gray-800">
        Ops! Algo deu errado.
      </h2>

      <p className="mb-6 text-center text-gray-600">
        {error.message ||
          "Encontramos um problema ao processar sua solicitação."}
      </p>

      {showDetails && (
        <pre className="mb-6 max-h-40 w-full overflow-x-auto overflow-y-auto rounded-md bg-gray-800 p-4 text-sm text-gray-200">
          {error.stack || JSON.stringify(error, null, 2)}
        </pre>
      )}

      <div className="mb-2 flex gap-3">
        <button
          className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleResetErrorBoundary}
        >
          <RefreshCw size={16} />
          Tentar novamente
        </button>

        <button
          className="flex items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          onClick={handleNavigateHome}
        >
          <Home size={16} />
          Voltar ao início
        </button>
      </div>

      <button
        className="mt-4 text-sm text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails
          ? "Ocultar detalhes técnicos"
          : "Mostrar detalhes técnicos"}
      </button>
    </div>
  );
};

export default FallbackUI;
