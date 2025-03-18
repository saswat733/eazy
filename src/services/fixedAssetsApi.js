import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const fixedAssetsApi = createApi({
  reducerPath: "fixedAssetsApi",
  baseQuery,
  tagTypes: ["AllFixedAssets", "RunDepreciation"],
  endpoints: (builder) => ({
    // All Fixed Assets
    getAllFixedAssets: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/fixedAssets/all?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["AllFixedAssets"],
    }),
    getSingleFixedAsset: builder.query({
      query: ({ fixedAssetId }) => `/fixedAssets/${fixedAssetId}`,
      providesTags: ["AllFixedAssets"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdateFixedAsset: builder.mutation({
      query(body) {
        return {
          url: `/fixedAssets`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllFixedAssets"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteFixedAsset: builder.mutation({
      query({ fixedAssetId }) {
        return {
          url: `/fixedAssets/${fixedAssetId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllFixedAssets"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // All Run Depreciation
    getAllRunDepreciation: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/fixedAssets/run-depreciation?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["RunDepreciation"],
    }),
    createUpdateRunDepreciation: builder.mutation({
      query(body) {
        return {
          url: `/fixedAssets/save`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["RunDepreciation"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
  }),
});

export const {
  useGetAllFixedAssetsQuery,
  useGetSingleFixedAssetQuery,
  useCreateUpdateFixedAssetMutation,
  useDeleteFixedAssetMutation,
  useGetAllRunDepreciationQuery,
  useCreateUpdateRunDepreciationMutation,
} = fixedAssetsApi;
