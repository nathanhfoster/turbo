const passwordRegex =
  /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/;

const validatePassword = (password: string) => {
  return passwordRegex.test(password);
};

export default validatePassword;
