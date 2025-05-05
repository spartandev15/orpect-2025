import { api } from "../../apis/index";

export const notificationApi = api.injectEndpoints({
    tagTypes: ['Notification'], // <-- ADD THIS LINE
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ page = 1, searchText = ""}) => ({
        url: `notification/list?page=${page}&searchText=${searchText}`,
        method: "GET",

      }),
      providesTags:['Notification']
    }),
    deleteNotificationById: builder.mutation({
        query: (id) => ({
          url: `notification/delete/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ['Notification'],
  
      }),
      isReadNotification: builder.mutation({
        query: () => {
          return{
            url: `notification/isread/update`,
            method: "POST"
            
          } 
        },
        invalidatesTags: ['Notification'],
      }),
      isReadNotificationById: builder.mutation({
        query: (data) => {
          return{
            url: `notification/isread`,
            method: "POST",
            body:data
          } 
        },
        invalidatesTags: ['Notification'],
      }),
   
  }),
  overrideExisting: false,
});

export const {
 useGetNotificationsQuery,
 useDeleteNotificationByIdMutation,
 useIsReadNotificationMutation,
 useIsReadNotificationByIdMutation
} = notificationApi;
