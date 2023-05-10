function validateOrganizationInput(input) {
  const errors = {};

  //Name validation
  if (!input.name) {
    errors.name = "Name is required";
  } else if (input.name.length < 3 || input.name.length > 50) {
    errors.name = "Name must be between 3 and 50 characters";
  }

  // Email validation
  if (!input.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Invalid email address";
  }

  // Description validation
  if (!input.description) {
    errors.description = "Description is required";
  } else if (input.description.length < 10 || input.description.length > 500) {
    errors.description = "Description must be between 10 and 500 characters";
  }

  //Phone validation
  if (!input.phone) {
    errors.phone = "Phone is required";
  } else if (input.phone.length < 7 || input.phone.length > 20) {
    errors.phone = "Invalid phone number";
  }

  // Issues validation
  if (!input.issues || input.issues.length < 1) {
    errors.issues = "At least one issue is required";
  }

  // Website validation
  if (!input.website) {
    errors.website = "Website is required";
  } else if (!/^https?:\/\//i.test(input.website)) {
    errors.website = "Invalid website URL";
  }

  // Category validation
  if (!input.category) {
    errors.category = "Category is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

function validateAddressInput(data) {
  let errors = {};

  if (!data.firstAddress) {
    errors.firstAddress = "First address field is required";
  }

  if (!data.country) {
    errors.country = "Country field is required";
  }

  if (!data.zipCode) {
    errors.zipCode = "Zip code field is required";
  }

  if (!data.state) {
    errors.state = "State field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

function validateLogo(logo) {
  let errors = {};

  // Logo validation
  if (!logo) {
    errors.logo = "Logo is required";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

function validateIssues(issues) {
  let errors = {};

  // Logo validation
  if (issues == [] || !issues) {
    errors.issues = "Issues are required";
  }
  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}
module.exports = {
  validateAddressInput,
  validateOrganizationInput,
  validateLogo,
  validateIssues,
};
