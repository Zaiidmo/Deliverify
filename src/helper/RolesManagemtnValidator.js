export const validateField = (field, value) => {
  let error = "";

  switch (field) {
    case "name":
      if (value.trim() === "") {
        error = "RoleName cannot be empty";
      } else if (value.trim().length < 2) {
        error = "RoleName must be at least 2 characters long";
      }
      break;
  }
};

export const validateRole = (formData) => {
  let errors = {};
  errors[field] = validateField("name", formData[field]);
  return errors;
};

export const hasFormErrors = (errors) => {
  return Object.values(errors).some((error) => error !== "");
};
