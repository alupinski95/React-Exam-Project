import { useState } from "react";

export const useInput = (initialValue, afterBindCallback) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
        if (afterBindCallback) afterBindCallback(event.target.value);
      }
    }
  };
};