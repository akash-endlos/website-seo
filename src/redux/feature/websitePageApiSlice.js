import { apiSlice } from "../apiSlice/api";
import config from "../config/config";

export const websitePageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // updateBranchById: builder.mutation({
    //   query: (payload) => ({
    //     url: `${config.api.url.updateBranch}?id=${payload.id}`,
    //     method: "PUT",
    //     body: payload.editedData,
    //   }),
    //   invalidatesTags: ['Branches'],
    // }),
    addPage: builder.mutation({
      query: (payload) => ({
        url: config.api.url.addPage,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ['WebsitePage'],
    }),
    getWebsiteByIdFormat: builder.query({
      query: (id) => ({
        url: `${config.api.url.getWebsiteByIdFormat}?id=${id}&type=allheads`,
        method: "GET",
      }),
      providesTags: ['WebsitePage'],
    }),
    // deleteBranch: builder.mutation({
    //   query: (id) => ({
    //     url: `${config.api.url.deleteBranch}?id=${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ['Branches'],
    // }),
  }),
});

export const {
  useAddPageMutation,
  useGetWebsiteByIdFormatQuery,
  // useDeleteBranchMutation,
  // useUpdateBranchByIdMutation,
} = websitePageApiSlice;
