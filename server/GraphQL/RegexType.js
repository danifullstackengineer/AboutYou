/* eslint-disable security/detect-unsafe-regex */
import { GraphQLScalarType } from "graphql";

const patterns = {
  firstName: /^([ ]?[a-z]{1,100}([ ]?)){1,5}$/i,
  lastName: /^([ ]?[a-z]{1,100}([ ]?)){1,5}$/i,
  email: /^([ ]?)([a-z\d.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?([ ]?)$/i,
  password: /^([ ]?)[\w@-]{6,}([ ]?)$/i,
};

const FirstNameRegex = new GraphQLScalarType({
  name: "FirstNameRegexType",
  parseValue(value) {
    if (patterns.firstName.test(value)) return value;
    else throw new Error("Please use a valid first name.");
  },
});
const LastNameRegex = new GraphQLScalarType({
  name: "LastNameRegexType",
  parseValue(value) {
    if (patterns.lastName.test(value)) return value;
    else throw new Error("Please use a valid last name.");
  },
});
const EmailRegex = new GraphQLScalarType({
  name: "EmailRegexType",
  parseValue(value) {
    if (patterns.email.test(value)) return value;
    else throw new Error("Please use a valid email address.");
  },
});
const PasswordRegex = new GraphQLScalarType({
  name: "PasswordRegexType",
  parseValue(value) {
    if (patterns.password.test(value)) return value;
    else
      throw new Error(
        "Please use a valid password. Only alphanumeric, - and @ are accepted and it must be at least 6 digits long."
      );
  },
});

export { FirstNameRegex, LastNameRegex, EmailRegex, PasswordRegex };
