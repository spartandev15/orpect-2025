import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

export const signupSchema = yup.object().shape({
  companyName: yup.string().required("Company Name is required"),
  companyType: yup.string().required("Company Type is required"),

  fullName: yup.string().required("Full Name is required"),
  designation: yup.string().required("Designation is required"),

  domainName: yup
    .string()
    .matches(
      /^(?!:\/\/)([a-zA-Z0-9-]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.com$/,
      "Invalid Url"
    )
    .required("Domain name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .test("email-domain-match", "Domain name not matching", function (value) {
      return (
        !value || value.split("@")[1] === this.resolve(yup.ref("domainName"))
      );
    }),

  otp: yup.string().required("Otp is required"),
  // termsNconditions: yup
  //   .string()
  //   .required("Please accept the term and conditions"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Use 6 or more characters with a mix of letters, numbers & symbols"
    ),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"), // Validate password confirmation
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/,
      "Use 6 or more characters with a mix of letters, numbers & symbols"
    ),
  password_confirmation: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const addEmployeeSchema = yup.object().shape({
  empId: yup.string().required("Employee Id is required"),
  empName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Employee name must contains alphabets only")
    .required("Employee name is required")
    .typeError("Employee name must be a string"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email"
    ),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid Phone number"),
  dateOfJoining: yup
    .date()
    .max(new Date(), "Date of Joining must be a past date")
    .required("Date of Joining is required"),

    linkedIn: yup.string().matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
      'Invalid LinkedIn URL format'
    ).nullable(),
    position: yup.string().required("Position is required"),
    
  pan_number: yup.string().required("Tax Number is required"),

  dateOfBirth: yup
    .date()
    .max(new Date(), "Date of Birth must be a past date")
    .required("Date of Birth is required"),
    postalCode: yup.number()
    .typeError('Postal code must be a number')
    .nullable()
});

export const RateReviewSchema = yup.object().shape({
  dateOfLeaving: yup
    .date()
    .max(new Date(), "Date of Leaving must not be a future date")
    .required("Date of Leaving is required"),
  review: yup.string().required("Review is required"),
  exEmployee: yup.boolean().required("Select only one checkbox"),
  nonJoiner: yup.boolean().required("Select only one checkbox"),
  performanceRating: yup.number().required("Performance Rating is required"),
  attitudeBehaviourRating: yup
    .number()
    .required("Behaviour Rating is required"),
  professionalSkillsRating: yup.number().required("Skills Rating is required"),
  teamworkCommunicationRating: yup
    .number()
    .required("Communication Rating is required"),
    // lastCTC: yup
    // .string()
    // .nullable()
    // .matches(/^\d+$/, "Last CTC must contain only numbers")
    // .typeError("Last CTC must be a string"),
});

export const AddExEmployeeReviewSchema = yup.object().shape({
  empId: yup.string().required("Employer Id is required"),
  empName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Employee name must contains alphabets only")
    .required("Employee name is required")
    .typeError("Employee name must be a string"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email"
    ),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid Phone number"),
  dateOfJoining: yup
    .date()
    .max(new Date(), "Date of Joining must not be a future date")
    .required("Date of Joining is required"),
  dateOfLeaving: yup
    .date()
    .max(new Date(), "Date of Leaving must not be a future date")
    .required("Date of Leaving is required"),
  position: yup.string().required("Position is required"),
  linkedIn: yup.string().matches(
    /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
    'Invalid LinkedIn URL format'
  ),
  postalCode: yup.number()
  .typeError('Postal code must be a number')
  .nullable(),
  performanceRating: yup.number().required("Performance Rating is required"),
  attitudeBehaviourRating: yup
    .number()
    .required("Behaviour Rating is required"),
  professionalSkillsRating: yup.number().required("Skills Rating is required"),
  teamworkCommunicationRating: yup
    .number()
    .required("Communication Rating is required"),
  review: yup.string().required("Review is required"),
  pan_number: yup.string().required("Tax Number is required"),
  lastCTC: yup
    .string()
    .nullable()
    .matches(/^\d+$/, "Last CTC must contain only numbers")
    .typeError("Last CTC must be a string"),
});

export const CsvvalidationSchema = yup.object().shape({
  csvfile: yup
    .mixed()
    .required("Please upload a csv file")
    .test(
      "is-csv",
      "Invalid file format. Please upload a CSV file.",
      (value) => {
        if (!value) return false;
        return value.type === "text/csv";
      }
    ),
  CsvfilePath: yup.string().required("CSV Path is required"),
});

export const editCurrentEmployeeSchema = yup.object().shape({
  empId: yup.string().required("Employer Id is required"),
  empName: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Employee name must contains alphabets only")
    .required("Employee name is required")
    .typeError("Employee name must be a string"),
  email: yup.string().required("Email is required").email("Invalid email"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid Phone number"),
  position: yup.string().required("position is required"),
  pan_number: yup.string().required("Tax Number is required"),
  dateOfBirth: yup
    .date()
    .max(new Date(), "Date of Birth must be a past date")
    .required("Date of Birth is required"),
  dateOfJoining: yup
    .date()
    .max(new Date(), "Date of Joining must be a past date")
    .required("Date of Joining is required"),
    linkedIn: yup.string().matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
      'Invalid LinkedIn URL format'
    ).nullable(),
    
  postalCode: yup.number()
  .typeError('Postal code must be a number')
  .nullable()
});

export const updateProfilSchema = yup.object().shape({
  companyName: yup.string().required("Company name is required"),
  companyType: yup.string().required("Company type is required"),
  fullName: yup.string().required("Full name is required"),
  designation: yup.string().required("Designation is required"),
  company_phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid Phone number"),
    company_social_link:yup.string().url('Invalid URL format').nullable(),
  webmaster_email: yup.string().email("Invalid email format").nullable(false),
});



// super ADMIN SECEH,A

export const adduserSchema = yup.object().shape({
  fullname: yup
    .string()
    .matches(/^[a-zA-Z ]+$/, "Full name must contain alphabets only")
    .required("Full name is required")
    .typeError("Full name must be a string"),
    
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "Invalid email format"
    ),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  address: yup.string().nullable(),

  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Invalid phone number"),

  city: yup.string().nullable(),

  country: yup.string(),

  state: yup.string(),

  postal_code: yup
    .string()
    .matches(/^[0-9]{5,10}$/, "Invalid postal code")
    .nullable(),

  // image: yup.string().nullable()
});


export const addCompanySchema = yup.object().shape({
  companyName: yup.string()
    .required("Company Name is required"),

  companyType: yup.string()
    .required("Company Type is required"),

  fullName: yup.string()
    .required("Full Name is required"),

  designation: yup.string()
    .required("Designation is required"),

  domainName: yup.string()
    // .url("Enter a valid Domain URL")
    .required("Domain Name is required"),

  email: yup.string()
    .email("Invalid email format")
    .required("Email is required"),

    password: yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
  

  companyPhone: yup.string()
    .matches(/^[0-9]+$/, "Only numbers are allowed")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .required("Company Phone is required"),

  registrationNumber: yup.string()
    .required("Registration Number is required"),

  companySocialLink: yup.string()
    .url("Enter a valid Social Link URL"),
    // .required("Company Social Link is required"),

  termsNconditions: yup.number()
    .oneOf([1], "You must accept the terms and conditions")
    .required("Terms and Conditions must be accepted"),

  // image: yup.mixed()
  //   .required("Image is required"),
});