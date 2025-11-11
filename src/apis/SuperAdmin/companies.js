import { api } from "../../apis/index";

export const companiesApi = api.injectEndpoints({
  tagTypes: ['Companies'], // <-- ADD THIS LINE

  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: ({ page = 1, search = ""}) => ({
        url: `admin/getCompanies?page=${page}&search=${search}`,
        method: "GET",

      }),
      providesTags:['Companies']
    }),
    getCompaniesById: builder.query({
        query: (id) => `admin/getCompanyById/${id}`,
        providesTags: ['Companies'],
      }),
      deleteCompanyById: builder.mutation({
        query: (id) => ({
          url: `admin/deleteCompany/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Companies'],
  
      }),
      accountVerified: builder.mutation({
        query: (id) => {
          return{
            url: `admin/verifyCompany/${id}`,
            method: "POST",
           
          } 
        },
        invalidatesTags: ['Companies'],
      }),
      addCompany: builder.mutation({
        query: ({  formData }) => {
          return{
            url: `admin/addCompanyregister`,
            method: "POST",
            body: formData,
          } 
        },
        invalidatesTags: ['Companies'],
      }),
      updateCompany: builder.mutation({
        query: ({ id, formData }) => {
          return {
            url: `admin/updateCompany/${id}`,
            method: "PUT",
            body: formData,
          };
        },
        invalidatesTags: ['Companies'],
      }),
      getCompanyReviews: builder.query({
        query: ({ page = 1, search = "" }) => ({
          url: `admin/getCompanyReviews?page=${page}&search=${search}`,
          method: "GET",
        }),
        providesTags: ['Companies'],
      }),
  
  }),
  overrideExisting: false,
});

export const {
 useGetAllCompaniesQuery,
 useGetCompaniesByIdQuery,
 useDeleteCompanyByIdMutation,
 useAccountVerifiedMutation,
 useAddCompanyMutation,
 useUpdateCompanyMutation,
 useGetCompanyReviewsQuery
} = companiesApi;
