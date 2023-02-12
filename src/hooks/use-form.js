import { useState, useCallback } from "react";

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [disabled, setDisabled] = useState();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleDisabled = (event) => {
    const { value, name } = event.target;
    setDisabled({ ...disabled, [name]: !value });
  };

  const resetForm = useCallback(
    (newValues = {}) => {
      setValues(newValues);
    },
    [setValues]
  );

  return { values, handleChange, setValues, resetForm, handleDisabled  };
}
