export const validateField = (field, value) => {
    let error = "";
  
    switch (field) {
      case "fname":
      case "lname":
        if (value.trim() === "") {
          error = "Name cannot be empty";
        } else if (value.trim().length < 2) {
          error = "Name must be at least 2 characters long";
        }
        break;
      case "identifier":
        const identifierPattern = /^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|[0-9]{10}|[a-zA-Z0-9]{3,30})$/;
        if (value.trim() === "") {
          error = "Identifier cannot be empty";
        } if (!identifierPattern.test(value)) {
          error = "Invalid identifier format .. Must be email or phone number or username";
        }
        break
      case "username":
        if (value.trim().length < 3 || value.trim().length > 30) {
          error = "Username must be at least 3 characters long";
        }
        break;
      case "email":
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
          error = "Invalid email format `example@email.com`";
        }
        break;
      case "phoneNumber":
        const phonePattern = /^[0-9]{10}$/;
        if (value.trim().length < 10 || isNaN(value) || value.trim().length > 10 || !phonePattern.test(value)) {
          error = "Phone number must be 10 digits `06xxxxxxxx`";
        }
        break;
      case "password":
        if (value.trim().length < 8) {
          error = "Password must be at least 8 characters";
        }
        break;
      default:
        break;
    }
  
    return error;
  };
  
  // Function to validate all fields at once
  export const validateForm = (formData) => {
    const errors = {};
  
    for (const field in formData) {
      if (field === "fullname") {
        errors.fname = validateField("fname", formData.fullname.fname);
        errors.lname = validateField("lname", formData.fullname.lname);
      } else {
        errors[field] = validateField(field, formData[field]);
      }
    }
  
    return errors;
  };
  
  // Function to check if any error exists in the error object
  export const hasFormErrors = (formErrors) => {
    return Object.values(formErrors).some((error) => error !== "");
  };
  