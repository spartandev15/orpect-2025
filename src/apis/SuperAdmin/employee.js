import { api } from "../../apis/index";

export const employeeApi = api.injectEndpoints({
  tagTypes: ['CurrentEmployee','ExEmployee','NonJoiner'], // <-- ADD THIS LINE

  endpoints: (builder) => ({
    getCurrentEmployeesById: builder.query({
        query: ({ id, page, searchText, position }) => {
          let url = `admin/getCurrentEmployees?id_data=${id}`;
      
          if (page) url += `&page=${page}`;
          if (searchText) url += `&searchText=${searchText}`;
          if (position) url += `&position=${position}`;
        debugger
          return url;
        },
        providesTags: ['CurrentEmployee'],
      }),
      

    getExEmployeeById: builder.query({
      query: ({ page = 1, searchText = "", position = "" ,id}) =>
        `admin/getExEmployees?id_data=${id}&page=${page}&searchText=${searchText}&position=${position}`,
      providesTags: ['ExEmployee'],
    }),
    getNonJoinerEmployeeById: builder.query({
        query: ({ page = 1, searchText = "", position = "" ,id}) =>
          `admin/getNonJoiners?id_data=${id}&page=${page}&searchText=${searchText}&position=${position}`,
        providesTags: ['NonJoiner'],
      }),
      // getNonJoinerEmployee: builder.query({
    //   query: () => "getNonJoiners",
    // }),

    // getCurrentEmployee: builder.query({
    //   query: ({ page = 1, searchText = "", position = "" }) =>
    //     `getCurrentEmployees?page=${page}&searchText=${searchText}&position=${position}`,
    //   providesTags: ['Employee'],
    // }),

    // getNonJoinerEmployee: builder.query({
    //   query: () => "getNonJoiners",
    // }),

    // deleteEmployeeById: builder.mutation({
    //   query: (id) => ({
    //     url: `deleteEmployee/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ['Employee','Previous_Review'],

    // }),

    // getEmployeeBySearch: builder.query({
    //   query: ({ text = "", empType = "" }) =>
    //     `searchEmployeeGlobally?searchText=${text}&emp=${empType}`,
    // }),
    
    // addEmployee: builder.mutation({
    //   query: ({  formData }) => {
    //     return{
    //       url: `addEmployee`,
    //       method: "POST",
    //       body: formData,
    //     } 
    //   },
    //   invalidatesTags: ['Employee'],
    // }),
    
    
    // addExEmployeeReview: builder.mutation({
    //   query: ({  formData }) => {
    //     return{
    //       url: `addReview`,
    //       method: "POST",
    //       body: formData,
    //     } 
    //   },
    //   invalidatesTags: ['EX_Employee'],
    // }),
    // updateEmployeeImage: builder.mutation({
    //   query: ({ id, formData }) => {
        
    //     return{
    //       url: `updateEmployeeImage/${id}`,
    //       method: "POST",
    //       body: formData,
    //     }
       
        
    //   },
    //   invalidatesTags: ['Employee'],
    // }),
    // updateEmployeeById: builder.mutation({
    //   query: ({ id, formData }) => {
        
    //     return{
    //       url: `updateEmployee/${id}`,
    //       method: "POST",
    //       body: formData,
    //     }
       
        
    //   },
    //   invalidatesTags: ['Employee'],
    // }),
    
    // // nON JOINER 
    // getExEmployeeAndNonJoiner: builder.query({
    //   query: ({ page = 1, searchText = "", position = "",emp="" }) =>
    //     `getExEmployeesAndNonJoiners?page=${page}&searchText=${searchText}&position=${position}&emp=${emp}`,
    //   providesTags:['Previous_Review']
    // }),
   
   
  }),
  overrideExisting: false,
});

export const {
  useGetCurrentEmployeesByIdQuery,
  useGetExEmployeeByIdQuery,
    useGetNonJoinerEmployeeByIdQuery,
//   useGetCurrentEmployeeQuery,
//   useGetNonJoinerEmployeeQuery,
//   useDeleteEmployeeByIdMutation,
//   useLazyGetEmployeeBySearchQuery,
//   useUpdateEmployeeByIdMutation,
//   useAddEmployeeMutation,
//   useAddExEmployeeReviewMutation,
//   useGetExEmployeeAndNonJoinerQuery,
//   useUpdateEmployeeImageMutation

  
} = employeeApi;
