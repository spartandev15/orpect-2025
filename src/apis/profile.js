import { api } from "../apis/index";

export const userApi = api.injectEndpoints({
  tagTypes: ['Profile'], // <-- ADD THIS LINE

  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: ({  formData }) => {
        
        return {
          url: "updateProfile",
          method: "POST",
          body: formData,
        }
      },
      invalidatesTags:['Profile']
    }),

    updatePassword: builder.mutation({
      query: (data) => ({
        url: "updatePassword",
        method: "POST",
        body: data,
      }),
    }),

    getUser: builder.query({
      query: () => "getUser",
      providesTags: ['Profile'],

    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetUserQuery,
} = userApi;
