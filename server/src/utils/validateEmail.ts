export const ValidateEmail = (mail: string): boolean => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g;
  if (regex.test(mail)) {
    return true;
  }
  return false;
};
