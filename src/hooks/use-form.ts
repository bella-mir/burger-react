import { useState, useCallback, ChangeEvent } from "react";

export function useForm() {
  const [values, setValues] = useState<any>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  return { values, handleChange, setValues, resetForm };
}
