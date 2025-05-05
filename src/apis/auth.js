import { api } from "../apis/index";
import { setToLocalStorage } from "../helper";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendVerificationOtp: builder.mutation({
      query: (email) => ({
        url: "sendVerificationOtp",
        method: "POST",
        body: { email },
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => {
        // Debugging: log the credentials being passed
        console.log("Attempting to log in with credentials:", credentials);
    debugger
        return {
          url: "login",
          method: "POST",
          body: credentials,
        };
      },
  
    }),
    

    registerUser: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setToLocalStorage("token", data.token);
          setToLocalStorage("user", data.user);
        } catch (err) {
          // do nothing on failure
        }
      },
    }),

    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    isTokenValidate: builder.mutation({
      query: (token) => ({
        url: "isTokenValid",
        method: "POST",
        body: { token },
      }),
    }),

    resetPasswordUser: builder.mutation({
      query: (data) => ({
        url: "reset-password",
        method: "POST",
        body: data,
      }),
    }),

    logoutUser: builder.mutation({
      query: () => ({
        url: "logout",
        method: "POST",
      }),
    }),

    isDomainValid: builder.query({
      query: (domain) => `checkDomain?domain=${domain}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useSendVerificationOtpMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgetPasswordMutation,
  useIsTokenValidateMutation,
  useResetPasswordUserMutation,
  useLogoutUserMutation,
  useIsDomainValidQuery,
} = authApi;
