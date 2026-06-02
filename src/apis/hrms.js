import { api } from "../apis/index";

export const hrmsApi = api.injectEndpoints({
  endpoints: (builder) => ({
   
    hrmsAccess: builder.mutation({
      query: () => {
        return{
          url: `third/party/Data/store`,
          method: "POST",
        //   body: formData,
        } 
      },
    //   invalidatesTags: ['EX_Employee'],
    }),
 
  }),

  overrideExisting: false,
});

export const {
  
  useHrmsAccessMutation,
 
} = hrmsApi;