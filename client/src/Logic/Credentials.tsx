const patterns = {
  firstName: /^([ ]?[a-z]{1,100}([ ]?)){1,5}$/i,
  lastName: /^([ ]?[a-z]{1,100}([ ]?)){1,5}$/i,
  email: /^([ ]?)([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?([ ]?)$/i,
  password: /^([ ]?)[\w@-]{6,}([ ]?)$/i,
};

const checkRegex = (input: string, type: string): boolean => {
  switch (type) {
    case "first":
      return patterns.firstName.test(input);
    case "last":
      return patterns.lastName.test(input);
    case "email":
      return patterns.email.test(input);
    case "password":
      return patterns.password.test(input);
    default:
      return false;
  }
};
export { checkRegex };
