import { api } from "../../apis/index";

export const authSuperAdminApi = api.injectEndpoints({
  endpoints: (builder) => ({
  
    loginSuperAdmin: builder.mutation({
      query: (credentials) => {
        // Debugging: log the credentials being passed
        console.log("Attempting to log in with credentials:", credentials);
     
        return {
          url: "admin/loginAdmin",
          method: "POST",
          body: credentials,
        };
      },
  
    }),
    storeDeviceToken: builder.mutation({
      query: (data) => {
        // Debugging: log the data being passed
        console.log("Attempting to log in with data:", data);
     
        return {
          url: "store/devicetoken",
          method: "POST",
          body: data,
        };
      },
  
    }),
  }),
  overrideExisting: false,
});

export const {
useLoginSuperAdminMutation,
useStoreDeviceTokenMutation
} = authSuperAdminApi;
