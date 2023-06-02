import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const websiteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateWebsite: builder.mutation({
      query: (payload) => ({
        url: `${config.api.url.updateWebsite}?id=${payload.id}`,
        method: "PUT",
        body: payload.editedData,
      }),
      invalidatesTags: ['WEBSITE'],
    }),
    addWebsite: builder.mutation({
      query: (payload) => ({
        url: config.api.url.addWebsite,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ['WEBSITE'], 
    }),
    getWebsite: builder.query({
      query: () => ({
        url: config.api.url.getWebsite,
        method: "GET",
      }),
      providesTags: ['WEBSITE'], 
    }),
    // getCustomerById: builder.mutation({
    //   query: (id) => ({
    //     url: `${config.api.url.getCustomerById}/${id}`,
    //     method: "GET",
    //   }),
    // }),
    // deleteCustomer: builder.mutation({
    //   query: (id) => ({
    //     url: `${config.api.url.deleteCustomer}?id=${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ['Customers'],
    // }),
  }),
});

export const {
  useAddWebsiteMutation,
  useGetWebsiteQuery,
//   useGetCustomerByIdMutation,
  useUpdateWebsiteMutation,
//   useDeleteCustomerMutation,
} = websiteApiSlice;
