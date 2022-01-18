const Validation = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Username is required";
  } else if (values.name.length < 4) {
    errors.name = "Username should be atleast 4 characters";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password should be atleast 6 characters";
  }
  if (!values.rePassword) {
    errors.rePassword = "Re-enter Password is required";
  } else if (values.password !== values.rePassword) {
    errors.rePassword = "Password did't match";
  }
  return errors;
};

export default Validation;
