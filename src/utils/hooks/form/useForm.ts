import React from 'react';

interface UseFormParams<Values extends object> {
  initialValues: Values;
  validateSchema?: {
    [K in keyof Values]?: (value: Values[K]) => string | null;
  };
  validateOnChange?: boolean;
  onSubmit?: (values: Values) => void;
}

export const useForm = <Values extends object>({
  initialValues,
  validateSchema,
  validateOnChange = true,
  onSubmit
}: UseFormParams<Values>) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState<{ [K in keyof Values]?: string } | null>(null);

  const setFieldValue = <K extends keyof Values>(field: K, value: Values[K]) => {
    setValues({ ...values, [field]: value });

    const validateSchemaExistForField = !!validateSchema && !!validateSchema[field];
    if (!validateSchemaExistForField || !validateOnChange) return;

    // @ts-expect-error: поле может быть undefined, проверка выше гарантирует вызов функции
    const error = validateSchema[field](value);
    setErrors({ ...errors, [field]: error });
  };

  const setFieldsError = <K extends keyof Values>(field: K, error: Values[K]) => {
    setErrors({ ...errors, [field]: error });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (onSubmit) onSubmit(values);
  };

  return {
    values,
    errors,
    setFieldValue,
    setFieldsError,
    handleSubmit,
    isSubmitting,
    setIsSubmitting
  };
};
