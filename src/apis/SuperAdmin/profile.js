import { api } from "../../apis/index";

export const superAdminProfileApi = api.injectEndpoints({
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

    getSuperAdminDetails: builder.query({
      query: () => "admin/getAdmin",
      providesTags: ['Profile'],

    }),

    
    updateAdminPassword: builder.mutation({
      query: (data) => ({
        url: "admin/updateAdminPassword",
        method: "POST",
        body: data,
      }),
    }),
    updateAdminImage: builder.mutation({
      query: ({ id, formData }) => {
        
        return{
          url: `admin/updateAdmin/${id}`,
          method: "POST",
          body: formData,
        }
       
        
      },
      invalidatesTags: ['Profile'],
    }),
    updateProfileById: builder.mutation({
      query: ({ id, formData }) => {
        
        return{
          url: `admin/updateAdmin/${id}`,
          method: "POST",
          body: formData,
        }
       
        
      },
      invalidatesTags: ['Profile'],
    }),

     deleteAdminProfileImage: builder.mutation({
      query: (id) => ({
        url: `admin/delete-superadmin-image/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:['Profile']

    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useGetSuperAdminDetailsQuery,
  useUpdateAdminPasswordMutation,
  useUpdateAdminImageMutation,
  useUpdateProfileByIdMutation,
  useDeleteAdminProfileImageMutation
}= superAdminProfileApi;
