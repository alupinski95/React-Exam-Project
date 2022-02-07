import { useState } from "react";

export const useCheckbox = (initialValue, afterBindCallback) => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(false),
    bind: {
      value,
      onChange: event => {
        const boolValue = event.currentTarget.checked;
        setValue(boolValue);
        if (afterBindCallback) afterBindCallback(boolValue);
      }
    }
  };
};