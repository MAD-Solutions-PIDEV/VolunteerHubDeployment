const isEmpty = require("./isEmpty")
const validator = require('validator')


module.exports = function ValidateRegister(data) {
    let errors = {};

    data.firstName = !isEmpty(data.firstName) ? data.firstName : ""
    data.lastName = !isEmpty(data.lastName) ? data.lastName : ""
    data.email = !isEmpty(data.email) ? data.email : ""
    data.password = !isEmpty(data.password) ? data.password : ""
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : ""
    data.location = !isEmpty(data.location) ? data.location : ""
    data.phone = !isEmpty(data.phone) ? data.phone : ""

    if (!validator.isEmpty(data.firstName)) {
        if (!validator.isLength(data.firstName, { min: 3 })) {
            errors.location = "first Name must be a minimum of 3 characters long."
        }
        
    }else
    {
        errors.firstName = "Required firstName"
    }
    if (!validator.isEmpty(data.lastName)) {
        if (!validator.isLength(data.lastName, { min: 3 })) {
            errors.location = "last Name must be a minimum of 3 characters long."
        }
        
    }else
    {
        errors.lastNameme = "Required lastName"
    }


    if (!validator.isEmpty(data.email)) {
        if (!validator.isEmail(data.email)) {
            errors.email = " forma email"
        }
    } else {
        errors.email = "Required email"

    }


  //  !validator.isAlphanumeric(myString)
    const passwordPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$/;
    if (!validator.isEmpty(data.password)) {
        if (!validator.isLength(data.password, { min: 8 })) {
            errors.password = "password must be a minimum of 8 characters long."
        }
        else
        {
            if (!validator.matches(data.password,passwordPattern)) {
                errors.password = "Password must contain at least one uppercase letter, one lowercase letter, one digit."
            }

        }

    } else {
        errors.password = "Required password"
    }




    if (!validator.isEmpty(data.confirmPassword)) {
        if (!validator.equals(data.confirmPassword, data.password)) {
            errors.confirmPassword = "password non confirmPassword"
        }
    } else {
        errors.confirmPassword = "Required confirmPassword"

    }




    if (!validator.isEmpty(data.location)) {
        if (!validator.isLength(data.location, { min: 3 })) {
            errors.location = "Location must be a minimum of 3 characters long."
        }
    }

    if (!validator.isEmpty(data.phone)) {
        if (!validator.isLength(data.phone, { min: 8 })) {
            errors.phone = "Phone Number must be a minimum of 8 characters long."
        }
    }

    return {
        errors,
        isValid: isEmpty(errors) //hedhi tkoun valid wa9et ma3anech 7atta error
    }
}
