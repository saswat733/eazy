import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery,
  tagTypes: ["Menus"],
  endpoints: (builder) => ({
    getAllLoggedInMenus: builder.query({
      query: () => `/sidebar`,
      providesTags: ["Menus"],
      transformResponse: (rawResult) => {
        return rawResult?.data || [];
      },
    }),
  }),
});

export const { useGetAllLoggedInMenusQuery } = menuApi;
