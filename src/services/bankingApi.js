import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const bankingApi = createApi({
  reducerPath: "bankingApi",
  baseQuery,
  tagTypes: ["MyAccounts", "Banks", "Rules", "Transactions", "Reconcile"],
  endpoints: (builder) => ({
    // All Banks
    getAllBanks: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/bank?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["Banks"],
    }),
    getSingleBank: builder.query({
      query: ({ bankId }) => `/bank/${bankId}`,
      providesTags: ["Banks"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdateBank: builder.mutation({
      query(body) {
        return {
          url: `/bank`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Banks"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteBank: builder.mutation({
      query({ bankId }) {
        return {
          url: `/bank/${bankId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Banks"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // My Bank accounts
    // getAllMyAccounts: builder.query({
    //   query: ({
    //     page = 1,
    //     pageSize = 100,
    //     all = false,
    //     searchText = "",
    //     filter = "",
    //   }) =>
    //     `/bankAccount/get-bank-account?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
    //   providesTags: ["MyAccounts"],
    // }),
    getAllMyAccounts: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/bankAccount/uncategorized-transaction?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["MyAccounts"],
    }),
    getSingleMyAccount: builder.query({
      query: ({ accountId }) => `/bankAccount/get-bank-account/${accountId}`,
      providesTags: ["MyAccounts"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createUpdateMyAccount: builder.mutation({
      query(body) {
        return {
          url: `/bankAccount/create-update-bank-account`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["MyAccounts"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteMyAccount: builder.mutation({
      query({ accountId }) {
        return {
          url: `/bankAccount/delete-bank-account/${accountId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["MyAccounts"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // Rules
    getAllRules: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/bankRules/all?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["Rules"],
    }),
    getSingleRule: builder.query({
      query: ({ ruleId }) => `/bankRules/${ruleId}`,
      providesTags: ["Rules"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    createRule: builder.mutation({
      query(body) {
        return {
          url: `/bankRules`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Rules", "Transactions"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    updateRule: builder.mutation({
      query({ id, body }) {
        return {
          url: `/bankRules/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Rules", "Transactions"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    deleteRule: builder.mutation({
      query({ ruleId }) {
        return {
          url: `/bankRules/${ruleId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Rules", "Transactions"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    updateRuleStatus: builder.mutation({
      query({ id, body }) {
        return {
          url: `/bankRules/status/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Rules"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // Transactions
    getAllTransactions: builder.query({
      query: ({
        page = 1,
        pageSize = 100,
        all = false,
        searchText = "",
        filter = "",
      }) =>
        `/transaction/all?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
      providesTags: ["Transactions"],
    }),
    getSingleTransaction: builder.query({
      query: ({ transactionId }) => `/transaction/${transactionId}`,
      providesTags: ["Transactions"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    importTransactions: builder.mutation({
      query(body) {
        return {
          url: `/transaction/import`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Transactions"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    categorizedTransaction: builder.mutation({
      query(body) {
        const statusType = body?.statusType || "";
        return {
          url: statusType
            ? `/transaction/semi-categorized`
            : `/transaction/categorized`,
          method: "put",
          body,
        };
      },
      invalidatesTags: ["Transactions"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    changeTransactionStatus: builder.mutation({
      query(body) {
        return {
          url: `/transaction/undo`,
          method: "put",
          body,
        };
      },
      invalidatesTags: ["Transactions"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    excludedTransaction: builder.mutation({
      query(body) {
        return {
          url: `/transaction/exclude`,
          method: "put",
          body,
        };
      },
      invalidatesTags: ["Transactions"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    //  connect plaid
    createLinkToken: builder.mutation({
      query: () => {
        return {
          url: `/plaid/get-linkToken`,
          method: "POST",
        };
      },
    }),
    //  get access token
    getAccessToken: builder.mutation({
      query: (body) => {
        return {
          url: `/plaid/get-access-token`,
          method: "POST",
          body,
        };
      },
    }),
    //  add plaid bank account
    postPlaidBank: builder.mutation({
      query: (body) => {
        return {
          url: `/plaid/authBank`,
          method: "POST",
          body,
        };
      },
      invalidateTags: ["MyAccounts"],
    }),
    //  get plaid transactions
    postPlaidTransactions: builder.mutation({
      query: (body) => {
        return {
          url: `/plaid/getTransactions`,
          method: "POST",
          body,
        };
      },
    }),

    // get reconcile transactions
    getReconcileTransactions: builder.mutation({
      query: (body) => {
        return {
          url: `/bankReconcile/reconcile`,
          method: "POST",
          body,
        };
      },
      providesTags: ["Reconcile"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),

    // post reconcile transactions
    postReconcileTransactions: builder.mutation({
      query: (body) => {
        return {
          url: `/bankReconcile/submit`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
  }),
});

export const {
  useGetAllBanksQuery,
  useGetSingleBankQuery,
  useCreateUpdateBankMutation,
  useDeleteBankMutation,

  useGetAllMyAccountsQuery,
  useGetSingleMyAccountQuery,
  useCreateUpdateMyAccountMutation,
  useDeleteMyAccountMutation,

  useGetAllRulesQuery,
  useGetSingleRuleQuery,
  useCreateRuleMutation,
  useUpdateRuleMutation,
  useDeleteRuleMutation,
  useUpdateRuleStatusMutation,

  useGetAllTransactionsQuery,
  useGetSingleTransactionQuery,
  useImportTransactionsMutation,
  useCategorizedTransactionMutation,
  useChangeTransactionStatusMutation,
  useExcludedTransactionMutation,

  useCreateLinkTokenMutation,
  useGetAccessTokenMutation,
  usePostPlaidBankMutation,
  usePostPlaidTransactionsMutation,

  useGetReconcileTransactionsMutation,
  usePostReconcileTransactionsMutation,
} = bankingApi;
