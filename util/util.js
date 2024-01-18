export let isBlank = (str) => !str || /^\s*$/.test(str);

// validation for username
export const validatorUsername = (value) => {
  // Modify the regular expression for username validation
  let validUsername = /^[a-zA-Z0-9_-]{3,16}$/;
  return validUsername.test(value);
};
