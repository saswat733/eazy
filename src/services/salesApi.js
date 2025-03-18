import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const salesApi = createApi({
  reducerPath: "salesApi",
  baseQuery,
  tagTypes: ["AllSales", "AllPayee", "ProductServices", "ProductCategory"],
  endpoints: (builder) => ({
    // All Sales
    getAll360View: builder.query({
      query: ({ all = false, filter = "" }) =>
        `/sales-dashboard?all=${all}&filter=${filter}`,
      providesTags: ["AllSales"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    getAllSales: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/sales?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["AllSales"],
    }),
    getSingleSale: builder.query({
      query: ({ saleId }) => `/sales/${saleId}`,
      providesTags: ["AllSales"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createSale: builder.mutation({
      query(body) {
        return {
          url: `/sales`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllSales"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    updateSale: builder.mutation({
      query({ body, saleId }) {
        return {
          url: `/sales/${saleId}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AllSales"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    sendInvoiceEmail: builder.mutation({
      query(body) {
        return {
          url: `/sales/send-invoice-email`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllSales"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    createMulipleSale: builder.mutation({
      query(body) {
        return {
          url: `/sales/multiple-invoices`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllSales"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteSale: builder.mutation({
      query({ saleId }) {
        return {
          url: `/sales/${saleId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllSales"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    // get pending invcoices by customer
    getPendingInvoices: builder.query({
      query: ({ customerId }) => `/sales/open-invoices/${customerId}`,
      providesTags: ["AllSales"],
    }),
    // get pending invcoices by customer
    getClosedInvoices: builder.query({
      query: ({ customerId }) => `/sales/closed-invoices/${customerId}`,
      providesTags: ["AllSales"],
    }),
    // get pending invcoices by customer
    getInvoicePaymentReceivedHistory: builder.query({
      query: ({ id }) => `/sales/invoice-payment-details/${id}`,
      providesTags: ["AllSales"],
    }),
    // get advance balance history by customer
    getAdvancePaymentReceivedHistory: builder.query({
      query: ({
        customerId,
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/paymentReceive/get-advance-money-details/${customerId}?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["AllSales"],
    }),
    // undo payment received for invoice
    undoPaymentReceived: builder.mutation({
      query({ id }) {
        return {
          url: `/paymentReceive/undo-payment/${id}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["AllSales"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    // post payment recevied for invoice
    postPaymentReceived: builder.mutation({
      query({ body }) {
        return {
          url:
            body.payment_status === "payment_received"
              ? `/paymentReceive/create-update-payment-receive`
              : `/paymentReceive/settle-invoice`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllSales"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    // get contact links for invoice email preview
    getContactUs: builder.query({
      query: () => "/maincontact",
      providesTags: ["AllSales"],
    }),

    // All Payee
    getAllPayee: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/payee/get?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["AllPayee"],
    }),
    getSinglePayee: builder.query({
      query: ({ payeeId, filter = "" }) =>
        `/payee/get/${payeeId}?filter=${filter}`,
      providesTags: ["AllPayee"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdatePayee: builder.mutation({
      query(body) {
        return {
          url: `/payee/create-update`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllPayee"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deletePayee: builder.mutation({
      query({ payeeId }) {
        return {
          url: `/payee/delete/${payeeId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllPayee"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    importPayee: builder.mutation({
      query(body) {
        return {
          url: `/payee/import-payee`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllPayee"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // Product & Services
    getAllProductServices: builder.query({
      query: ({ page = 1, pageSize = 100, searchText = "", filter = "" }) =>
        `/product/get-product?page=${page}&pageSize=${pageSize}&search=${searchText}&filter=${filter}`,
      providesTags: ["ProductServices"],
    }),
    getSingleProductService: builder.query({
      query: ({ productId }) => `/product/get-product/${productId}`,
      providesTags: ["ProductServices"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdateProductService: builder.mutation({
      query(body) {
        return {
          url: `/product/create-update-product`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["ProductServices"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteProductService: builder.mutation({
      query({ productId }) {
        return {
          url: `/product/delete-product/${productId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ProductServices"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // Product & Services Categories
    getAllCategories: builder.query({
      query: ({ page = 1, pageSize = 100, searchText = "", filter = "" }) =>
        `/product-category/get-all-product-category?page=${page}&pageSize=${pageSize}&search=${searchText}&filter=${filter}`,
      providesTags: ["ProductCategory"],
    }),
    getSingleCategory: builder.query({
      query: ({ id }) => `/product-category/get-product-category/${id}`,
      providesTags: ["ProductCategory"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdateCategory: builder.mutation({
      query(body) {
        return {
          url: `/product-category/create-update-product-category`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["ProductCategory"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteCategory: builder.mutation({
      query({ categoryId }) {
        return {
          url: `/product-category/delete-product-category/${categoryId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["ProductCategory"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
  }),
});

export const {
  useGetAll360ViewQuery,
  useGetAllSalesQuery,
  useGetSingleSaleQuery,
  useCreateSaleMutation,
  useUpdateSaleMutation,
  useSendInvoiceEmailMutation,
  useCreateMulipleSaleMutation,
  useDeleteSaleMutation,
  useGetPendingInvoicesQuery,
  useGetClosedInvoicesQuery,
  useGetInvoicePaymentReceivedHistoryQuery,
  useGetAdvancePaymentReceivedHistoryQuery,
  useUndoPaymentReceivedMutation,
  usePostPaymentReceivedMutation,

  useGetAllPayeeQuery,
  useGetSinglePayeeQuery,
  useCreateUpdatePayeeMutation,
  useDeletePayeeMutation,
  useImportPayeeMutation,

  useGetAllProductServicesQuery,
  useGetSingleProductServiceQuery,
  useCreateUpdateProductServiceMutation,
  useDeleteProductServiceMutation,

  useGetAllCategoriesQuery,
  useGetSingleCategoryQuery,
  useCreateUpdateCategoryMutation,
  useDeleteCategoryMutation,

  useGetContactUsQuery,
} = salesApi;
