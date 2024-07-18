import { useEffect, useState } from "react";

const getStateFromLocalStorage = <K>(key: string, defaultValue: K) => {
  const storedValue = localStorage.getItem(key);

  let parsedValue: K | undefined;
  try {
    parsedValue = storedValue ? (JSON.parse(storedValue) as K) : undefined;
  } catch (err) {
    return defaultValue;
  }

  return parsedValue;
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [state, setState] = useState(
    () => getStateFromLocalStorage(key, defaultValue) || defaultValue
  );

  const setLocalStorageState = (value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    setLocalStorageState(state);
  }, [state]);

  return [state, setState];
};
