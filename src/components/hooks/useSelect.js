import { useState } from "react";

export const useSelect = (initialValue, afterBindCallback) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(initialValue),
    bind: {
      value,
      onChange: event => {
        setValue(event.currentTarget.value);
        if (afterBindCallback) afterBindCallback(event.target.value);
      }
    }
  };
};