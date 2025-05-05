import { api } from "../../apis/index";

export const userApi = api.injectEndpoints({
  tagTypes: ['User'], // <-- ADD THIS LINE

  endpoints: (builder) => ({
    getAllAdmins: builder.query({
      query: ({page= 1}) => ({
        url: `admin/getAllAdmins?page=${page}`,
        method: "GET",

      }),
      providesTags:['User']
    }),

    addUser: builder.mutation({
      query: ({  formData }) => {
        return{
          url: `admin/addAdmin`,
          method: "POST",
          body: formData,
        } 
      },
      invalidatesTags: ['User'],
    }),

    getUserById: builder.query({
      query: (id) => `admin/getAdminById/${id}`,
      providesTags: ['User'],
    }),
    updateUserById: builder.mutation({
      query: ({ id, formData }) => {
        
        return{
          url: `admin/updateAdmin/${id}`,
          method: "POST",
          body: formData,
        }
       
        
      },
      invalidatesTags: ['User'],
    }),
    updateUserImage: builder.mutation({
      query: ({ id, formData }) => {
        
        return{
          url: `admin/updateAdmin/${id}`,
          method: "POST",
          body: formData,
        }
       
        
      },
      invalidatesTags: ['User'],
    }),
    deleteUserById: builder.mutation({
      query: (id) => ({
        url: `admin/deleteAdmin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['User'],

    }),

  }),
  overrideExisting: false,
});

export const {
 useGetAllAdminsQuery,
 useAddUserMutation,
 useGetUserByIdQuery,
 useUpdateUserByIdMutation,
 useDeleteUserByIdMutation,
 useUpdateUserImageMutation
} = userApi;
