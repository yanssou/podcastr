import { useEffect, useState } from "react";

// fonction qui permet de ne pas faire un appel API à chaque entrée du user mais une fois qu'il a terminé d'écrire son mot (attend 500ms avant d'update la valeur)
export const useDebounce = <T>(value: T, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};
