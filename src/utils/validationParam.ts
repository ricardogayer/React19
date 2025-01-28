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
