import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const accountApi = createApi({
	reducerPath: "accountApi",
	baseQuery,
	tagTypes: [
		"AccountTypes",
		"SubAccountTypes",
		"DetailTypes",
		"SubDetailTypes",
		"ChartsOfAccount",
		"GeneralEntries",
	],
	endpoints: (builder) => ({
		// account type endpoints
		getAllAccountTypes: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/accountType?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["AccountTypes"],
		}),
		getSingleAccountType: builder.query({
			query: ({ accountTypeId }) => `/accountType/${accountTypeId}`,
			providesTags: ["AccountTypes"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		createUpdateAccountType: builder.mutation({
			query(body) {
				return {
					url: `/accountType`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["AccountTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		deleteAccountType: builder.mutation({
			query({ accountTypeId }) {
				return {
					url: `/accountType/${accountTypeId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["AccountTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),

		// sub account type endpoints
		getAllSubAccountTypes: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/subAccountType?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["SubAccountTypes"],
		}),
		getSingleSubAccountType: builder.query({
			query: ({ subAccountTypeId }) => `/subAccountType/${subAccountTypeId}`,
			providesTags: ["SubAccountTypes"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		createUpdateSubAccountType: builder.mutation({
			query(body) {
				return {
					url: `/subAccountType`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["SubAccountTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		deleteSubAccountType: builder.mutation({
			query({ subAccountTypeId }) {
				return {
					url: `/subAccountType/${subAccountTypeId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["SubAccountTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),

		// detail type endpoints
		getAllDetailTypes: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/detailsType?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["DetailTypes"],
		}),
		getSingleDetailType: builder.query({
			query: ({ detailTypeId }) => `/detailsType/${detailTypeId}`,
			providesTags: ["DetailTypes"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		createUpdateDetailType: builder.mutation({
			query(body) {
				return {
					url: `/detailsType`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["DetailTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		deleteDetailType: builder.mutation({
			query({ detailTypeId }) {
				return {
					url: `/detailsType/${detailTypeId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["DetailTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),

		// sub detail type endpoints
		getAllSubDetailTypes: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/subDetailType?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["SubDetailTypes"],
		}),
		getSingleSubDetailType: builder.query({
			query: ({ subDetailTypeId }) => `/subDetailType/${subDetailTypeId}`,
			providesTags: ["SubDetailTypes"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		createUpdateSubDetailType: builder.mutation({
			query(body) {
				return {
					url: `/subDetailType`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["SubDetailTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		deleteSubDetailType: builder.mutation({
			query({ subDetailTypeId }) {
				return {
					url: `/subDetailType/${subDetailTypeId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["SubDetailTypes"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),

		// charts of account endpoints
		// getAllChartsOfAccount: builder.query({
		// 	query: ({ page = 1, pageSize = 100, searchText = "", filter = "" }) =>
		// 		`/categories?page=${page}&pageSize=${pageSize}&search=${searchText}&filter=${filter}`,
		// 	providesTags: ["ChartsOfAccount"],
		// }),
		getAllChartsOfAccount: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/categories?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["ChartsOfAccount"],
		}),
		getSingleChartsOfAccount: builder.query({
			query: ({ chartOfAccountId }) => `/categories/${chartOfAccountId}`,
			providesTags: ["ChartsOfAccount"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		getChartsOfAccountDetail: builder.query({
			query: ({
				accountId,
				page = 1,
				pageSize = 500,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/chartOfAccounts/account-detail/${accountId}?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["ChartsOfAccount"],
		}),
		createUpdateChartsOfAccount: builder.mutation({
			query(body) {
				return {
					url: `/categories`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["ChartsOfAccount"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		changeStatusChartsOfAccount: builder.mutation({
			query({ chartOfAccountId, body }) {
				return {
					url: `/categories/change-status/${chartOfAccountId}`,
					method: "PUT",
					body,
				};
			},
			invalidatesTags: ["ChartsOfAccount"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		getLastAccountCode: builder.mutation({
			query({ account_code }) {
				return {
					url: `categories/account-code/${account_code}`,
					method: "GET",
				};
			},
			invalidatesTags: ["ChartsOfAccount"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),

		// accounting api
		getAllGeneralEntries: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/generalEntries/get-general-entries?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["GeneralEntries"],
		}),
		getSingleGeneralEntries: builder.query({
			query: ({ entriesId }) =>
				`/generalEntries/get-general-entries/${entriesId}`,
			providesTags: ["GeneralEntries"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		createUpdateGeneralEntries: builder.mutation({
			query(body) {
				return {
					url: `/generalEntries/create-update-general-entries`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["GeneralEntries"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		deleteGeneralEntries: builder.mutation({
			query({ entriesId }) {
				return {
					url: `/generalEntries/delete-general-entries/${entriesId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["GeneralEntries"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
	}),
});

export const {
	useGetAllAccountTypesQuery,
	useGetSingleAccountTypeQuery,
	useCreateUpdateAccountTypeMutation,
	useDeleteAccountTypeMutation,

	useGetAllSubAccountTypesQuery,
	useGetSingleSubAccountTypeQuery,
	useCreateUpdateSubAccountTypeMutation,
	useDeleteSubAccountTypeMutation,

	useGetAllDetailTypesQuery,
	useGetSingleDetailTypeQuery,
	useCreateUpdateDetailTypeMutation,
	useDeleteDetailTypeMutation,

	useGetAllSubDetailTypesQuery,
	useGetSingleSubDetailTypeQuery,
	useCreateUpdateSubDetailTypeMutation,
	useDeleteSubDetailTypeMutation,

	useGetAllChartsOfAccountQuery,
	useGetSingleChartsOfAccountQuery,
	useGetChartsOfAccountDetailQuery,
	useCreateUpdateChartsOfAccountMutation,
	useChangeStatusChartsOfAccountMutation,
	useGetLastAccountCodeMutation,

	useGetAllGeneralEntriesQuery,
	useGetSingleGeneralEntriesQuery,
	useCreateUpdateGeneralEntriesMutation,
	useDeleteGeneralEntriesMutation,
} = accountApi;
