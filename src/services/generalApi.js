import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const generalApi = createApi({
  reducerPath: "generalApi",
  baseQuery,
  endpoints: (builder) => ({
    deleteAllData: builder.mutation({
      query(body) {
        return {
          url: `/transaction/bulk-delete`,
          method: "delete",
          body,
        };
      },
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    getAllDashboardData: builder.query({
      query: ({ filter = "" }) => `/dashboard?filter=${filter}`,
      providesTags: ["dashboard"],
    }),
  }),
});

export const { useDeleteAllDataMutation, useGetAllDashboardDataQuery } =
  generalApi;
