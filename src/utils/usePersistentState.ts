import { useState } from 'react';

function usePersistentState(key: string, defaultValue: string) {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key) || defaultValue;
  });

  const setAndStore = (val: string) => {
    setValue(val);
    localStorage.setItem(key, val);
  };

  return [value, setAndStore] as const;
}

export default usePersistentState;
