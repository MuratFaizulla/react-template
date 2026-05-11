export const validateIsEmpty = (
  value: string,
  message: string = 'Поле обязательно для заполнения'
): ValidationReturn => {
  if (!value) return message;
  return null;
};
