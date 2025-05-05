import { api } from "../apis/index";

export const positionApi = api.injectEndpoints({
  tagTypes: ['Postion'], // <-- ADD THIS LINE

  endpoints: (builder) => ({
    getPositions: builder.query({
      query: ({ page = 1, searchText = "", position = "" }) => 
        `getPositions?page=${page}&per_page=${10}&search=${searchText}&status=${position}`,
      providesTags: ['Postion'],

    }),

    addPosition: builder.mutation({
      query: (data) => ({
        url: "addPositions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Postion'],

    }),

    deletePositionById: builder.mutation({
      query: (id) => ({
        url: `removePosition/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Postion'],
    }),

    updatePositionById: builder.mutation({
      query: ({ id, data }) => ({
        url: `updatePosition/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Postion'],

    }),

    checkPositionDelete: builder.query({
      query: (data) => `getPositionAlreadyInUse/${data}`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPositionsQuery,
  useAddPositionMutation,
  useDeletePositionByIdMutation,
  useUpdatePositionByIdMutation,
  useLazyCheckPositionDeleteQuery,
} = positionApi;
