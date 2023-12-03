import joi from "joi";

const signupSchema = joi.object({
  username: joi.string().min(5).max(15).alphanum().required(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .min(11)
    .required(),
  password: joi
    .string()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain lowercase letter, uppercase letter, digit, special character and be between 8 and 30 characters long.",
    }),
});

const loginSchema = joi.object({
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .min(11)
    .required(),
  password: joi.string().required(),
});

const resetPasswordSchema = joi.object({
  newPassword: joi
    .string()
    .min(8)
    .max(30)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "The password must contain lowercase letter, uppercase letter, digit, special character and be between 8 and 30 characters long.",
    }),
  confirmPassword: joi.valid(joi.ref("newPassword")).required(),
});

const forgotPasswordSchema = joi.object({
  receiverEmail: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .lowercase()
    .min(11)
    .required(),
});

//to check if the schema is created for the given validator
const globalValidationObject = {
  login: loginSchema,
  signup: signupSchema,
  reset: resetPasswordSchema,
  forgot: forgotPasswordSchema,
};

// main function for validation
function Validator(obj) {
  if (!globalValidationObject.hasOwnProperty(obj)) {
    throw new Error(`validator does not exist!`);
  }
  return async function (req, res, next) {
    try {
      await globalValidationObject[obj].validateAsync(req.body);
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  };
}

export default Validator;
