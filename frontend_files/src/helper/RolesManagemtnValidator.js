export const validateField = (field, value) => {
    let error = "";
  
    switch (field) {
      case "roleName":
        if (value.trim() === "") {
          error = "RoleName cannot be empty";
        } else if (value.trim().length < 2) {
          error = "RoleName must be at least 2 characters long";
        }
        break;
      default:
        break;
    }
  
    return error; 
  };
  
  export const validateRole = (formData) => {
    let errors = {};
    for (const field in formData) {
      errors[field] = validateField(field, formData[field]);
    }
    return errors;
  };
  
  export const hasFormErrors = (errors) => {
    return Object.values(errors).some((error) => error !== "");
  };
  