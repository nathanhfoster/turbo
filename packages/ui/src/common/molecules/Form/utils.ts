export const getFormData = async (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);

  return Object.fromEntries(formData.entries());
};
