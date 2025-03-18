import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";
import { filter } from "lodash";

export const reportsApi = createApi({
  reducerPath: "reportsApi",
  baseQuery,
  tagTypes: [
    "ActivityLogs",
    "SalesByCustomer",
    "BalanceSheet",
    "BalanceSheetComparison",
    "ProfitAndLoss",
    "TransactionDetailReport",
    "TransactionByVendorAndCustomer",
    "ExpenseByVendorSummary",
    "Transaction",
    "SalesByProduct",
    "TransactionReport"
  ],
  endpoints: (builder) => ({
    getActivityLogs: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/reports/activity-logs?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["ActivityLogs"],
    }),
    getSalesByCustomer: builder.query({
      query: ({ filter = "" }) => `/reports/sales-by-customer?filter=${filter}`,
      providesTags: ["SalesByCustomer"],
    }),
    getBalanceSheet: builder.query({
      query: ({ filter = "" }) => `/reports/balance-sheet?filter=${filter}`,
      providesTags: ["BalanceSheet"],
    }),
    getBalanceSheetComparison: builder.mutation({
      query: (body) => ({
        url: `reports/compare/balance-sheet`,
        method: "POST",
        body, // expected shape: { periods: [ { start_date, end_date }, { start_date, end_date } ] }
      }),
      providesTags: ["BalanceSheetComparison"],
    }),
    getProfitAndLossComparison: builder.mutation({
      query: (body) => ({
        url: `/reports/compare/income-statement`,
        method: "POST",
        body, // expected shape: { periods: [ { start_date, end_date }, { start_date, end_date } ] }
      }),
      providesTags: ["ProfitAndLossComparison"],
    }),
    getProfitAndLoss: builder.query({
      query: ({ filter = "" }) =>
        `/reports/income-statement?filter=${filter}`,
      providesTags: ["ProfitAndLoss"],
    }),
    getTransactionByDate: builder.query({
      query: ({ filter = "" }) => `/reports/transaction-report?filter=${filter}`,
      providesTags: ["TransactionByDate"],
    }),
    getTransactionByAccount: builder.query({
      query: ({ filter = "" }) => `/reports/account-transaction-report?filter=${filter}`,
      providesTags: ["TransactionByAccount"],
    }),
    getTransactionDetailReport: builder.query({
      query: ({ filter = "" }) =>
        `/reports/track-payment-for-report?filter=${filter}`,
      providesTags: ["TransactionDetailReport"],
    }),
    getTransactionByVendorAndCustomer: builder.query({
      query: ({ filter = "" }) =>
        `/reports/transaction-vendor-customer?filter=${filter}`,
      providesTags: ["TransactionByVendorAndCustomer"],
    }),
    getExpenseByVendorSummary: builder.query({
      query: ({ filter = "" }) => `/reports/expense-vendor?filter=${filter}`,
      providesTags: ["ExpenseByVendorSummary"],
    }),
    getTransactionListByVendor: builder.query({
      query: ({ filter = "" }) =>
        `/reports/transaction-vendor-customer?filter=${filter}`,
      providesTags: ["Transaction"],
    }),
    getSalesByProduct: builder.query({
      query: () => `/reports/sales-by-product`,
      providesTags: ["SalesByProduct"],
    }),
    getTransactionReport: builder.query({
      query: ({ id, filter }) => ({
        url: `/reports/transaction-report/glAccount/${id}`,
        params: { filter: JSON.stringify(filter) },
      }),
      providesTags: ["TransactionReport"],
    }),
  }),
});

export const {
  useGetActivityLogsQuery,
  useGetSalesByCustomerQuery,
  useGetBalanceSheetQuery,
  useGetBalanceSheetComparisonMutation,
  useGetProfitAndLossComparisonMutation,
  useGetProfitAndLossQuery,
  useGetTransactionByDateQuery,
  useGetTransactionByAccountQuery,
  useGetTransactionDetailReportQuery,
  useGetTransactionByVendorAndCustomerQuery,
  useGetExpenseByVendorSummaryQuery,
  useGetTransactionListByVendorQuery,
  useGetSalesByProductQuery,
  useGetTransactionReportQuery,
} = reportsApi;
