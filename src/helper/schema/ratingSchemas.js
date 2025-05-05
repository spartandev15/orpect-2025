import * as yup from "yup";


// export const editExNonjoiner = yup.object().shape({
//     empName: yup
//       .string()
//       .matches(/^[a-zA-Z ]+$/, "Employee name must contains alphabets only")
//       .required("Employee name is required")
//       .typeError("Employee name must be a string"),
//     email: yup.string().required("Email is required").email("Invalid email"),
//     phone: yup
//       .string()
//       .required("Mobile number is required")
//       .matches(/^[0-9]{10}$/, "Invalid mobile number"),
//     dateOfJoining: yup.string().required("Date of Joining is required"),
//     position: yup.string().required("position is required"),
//   });
  
  export const updateProfilSchema = yup.object().shape({
    companyName: yup.string().required("Company name is required"),
    companyType: yup.string().required("Company type is required"),
    fullName: yup.string().required("Full name is required"),
    designation: yup.string().required("Designation is required"),
    company_phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^[0-9]{10}$/, "Invalid Phone number"),
      company_social_link: yup.string().url('Invalid URL').nullable(false),
      webmaster_email: yup.string().email('Invalid email format').nullable(false)
    // logoImage: yup.string().required("Designation is required"),
    // oldLogoImage: yup.string().required("Designation is required"),
  });
  

  export const editNonjoinerSchema = yup.object().shape({
    empName: yup
      .string()
      .matches(/^[a-zA-Z ]+$/, "Employee name must contains alphabets only")
      .required("Employee name is required")
      .typeError("Employee name must be a string"),
    email: yup.string().required("Email is required").email("Invalid email"),
    phone: yup
      .string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Invalid mobile number"),
    position: yup.string().required("position is required"),
    linkedIn: yup.string().matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
      'Invalid LinkedIn URL format'
    ).nullable(),
    
    postalCode: yup.number()
  .typeError('Postal code must be a number')
  .nullable()
  });
  

  export const editExEmployeeSchema = yup.object().shape({
    empId: yup.string().required("Employer Id is required"),
    empName: yup
      .string()
      .matches(/^[a-zA-Z ]+$/, "Employee name must contains alphabets only")
      .required("Employee name is required")
      .typeError("Employee name must be a string"),
    email: yup.string().required("Email is required").email("Invalid email"),
    phone: yup
      .string()
      .required("Mobile number is required")
      .matches(/^[0-9]{10}$/, "Invalid mobile number"),
    position: yup.string().required("position is required"),
    pan_number: yup.string().required("Tax Number is required"),
    linkedIn: yup.string().matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
      'Invalid LinkedIn URL format'
    ).nullable(),
    
  dateOfJoining: yup
  .date()
  .max(new Date(), 'Date of Joining must be a past date')
  .required('Date of Joining is required'),
  postalCode: yup.number()
  .typeError('Postal code must be a number')
  .nullable()
  });
  