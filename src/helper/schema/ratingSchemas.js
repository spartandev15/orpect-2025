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
//       .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
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
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
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
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    position: yup.string().required("position is required"),
    linkedIn: yup.string().matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
      'Invalid LinkedIn URL format'
    ).nullable(),
    
    dateOfBirth: yup
      .date()
      .max(new Date(), "Date of Birth must be a past date")
      .required("Date of Birth is required")
      .test(
        "min-age-validation",
        "Employee must be at least 14 years old",
        function (value) {
          if (!value) return true;
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();
          
          // Calculate exact age
          let exactAge = age;
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            exactAge--;
          }
          
          return exactAge >= 14;
        }
      ),
    
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
      .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
    position: yup.string().required("position is required"),
    tax_number: yup.string().required("Tax Number is required"),
    linkedIn: yup.string().matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|company)\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\b/,
      'Invalid LinkedIn URL format'
    ).nullable(),
    
    dateOfBirth: yup
      .date()
      .max(new Date(), "Date of Birth must be a past date")
      .required("Date of Birth is required")
      .test(
        "min-age-validation",
        "Employee must be at least 14 years old",
        function (value) {
          if (!value) return true;
          const birthDate = new Date(value);
          const today = new Date();
          const age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          const dayDiff = today.getDate() - birthDate.getDate();
          
          // Calculate exact age
          let exactAge = age;
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            exactAge--;
          }
          
          return exactAge >= 14;
        }
      )
      .test(
        "age-validation",
        "Employee must be at least 14 years old at the time of joining",
        function (value) {
          const { dateOfJoining } = this.parent;
          if (!dateOfJoining || !value) return true; // Skip if either date is missing
          const birthDate = new Date(value);
          const joiningDate = new Date(dateOfJoining);
          const ageAtJoining = joiningDate.getFullYear() - birthDate.getFullYear();
          const monthDiff = joiningDate.getMonth() - birthDate.getMonth();
          const dayDiff = joiningDate.getDate() - birthDate.getDate();
          
          // Calculate exact age
          let exactAge = ageAtJoining;
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            exactAge--;
          }
          
          return exactAge >= 14;
        }
      )
      .test(
        "birth-before-joining",
        "Date of Birth must be before Date of Joining",
        function (value) {
          const { dateOfJoining } = this.parent;
          if (!dateOfJoining || !value) return true; // Skip if either date is missing
          const birthDate = new Date(value);
          const joiningDate = new Date(dateOfJoining);
          return birthDate < joiningDate;
        }
      ),
    
    dateOfJoining: yup
      .date()
      .max(new Date(), "Date of Joining must be a past date")
      .required("Date of Joining is required")
      .test(
        "age-validation",
        "Employee must be at least 14 years old at the time of joining",
        function (value) {
          const { dateOfBirth } = this.parent;
          if (!dateOfBirth || !value) return true; // Skip if either date is missing
          const birthDate = new Date(dateOfBirth);
          const joiningDate = new Date(value);
          const ageAtJoining = joiningDate.getFullYear() - birthDate.getFullYear();
          const monthDiff = joiningDate.getMonth() - birthDate.getMonth();
          const dayDiff = joiningDate.getDate() - birthDate.getDate();
          
          // Calculate exact age
          let exactAge = ageAtJoining;
          if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            exactAge--;
          }
          
          return exactAge >= 14;
        }
      )
      .test(
        "joining-after-birth",
        "Date of Joining must be after Date of Birth",
        function (value) {
          const { dateOfBirth } = this.parent;
          if (!dateOfBirth || !value) return true; // Skip if either date is missing
          const birthDate = new Date(dateOfBirth);
          const joiningDate = new Date(value);
          return joiningDate > birthDate;
        }
      ),
    postalCode: yup.number()
      .typeError('Postal code must be a number')
      .nullable()
  });
  