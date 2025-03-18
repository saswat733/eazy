import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery,
  tagTypes: ["Companies", "Employees"],
  endpoints: (builder) => ({
    // Companies endpoints
    getAllCompanies: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/organization?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["Companies"],
    }),
    getSingleOrganization: builder.query({
      query: ({ companyId }) => `/organization/${companyId}`,
      providesTags: ["Companies"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdateCompanies: builder.mutation({
      query(body) {
        return {
          url: `/organization`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Companies"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteOrganization: builder.mutation({
      query({ companyId }) {
        return {
          url: `/organization/${companyId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Companies"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    createUpdateInvoicePayment: builder.mutation({
      query({ id }) {
        return {
          url: `/payment/create-payment/${id}`,
          method: "POST",
        };
      },
      invalidatesTags: ["Companies"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // Employees endpoints
    getAllEmployees: builder.query({
      query: () => `/employees`,
      providesTags: ["Employees"],
    }),
    getSingleEmployee: builder.query({
      query: ({ userId }) => `/employees/${userId}`,
      providesTags: ["Employees"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdateEmployee: builder.mutation({
      query(body) {
        return {
          url: `/employees`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Employees"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteEmployee: builder.mutation({
      query({ userId }) {
        return {
          url: `/employees/${userId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Employees"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useGetSingleOrganizationQuery,
  useCreateUpdateCompaniesMutation,
  useCreateUpdateInvoicePaymentMutation,
  useDeleteOrganizationMutation,

  useGetAllEmployeesQuery,
  useGetSingleEmployeeQuery,
  useCreateUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = companyApi;
