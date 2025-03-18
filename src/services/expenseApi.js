import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const expenseApi = createApi({
	reducerPath: "expenseApi",
	baseQuery,
	tagTypes: ["AllExpenses"],
	endpoints: (builder) => ({
		// Payee Transactions
		getAllTransactionOfPayee: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
				id = "",
			}) =>
				`/expense/expense-by-payee/${id}?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["AllExpenses"],
		}),

		// All Sales
		getAllExpenses: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/expense/get-expense?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["AllExpenses"],
		}),
		getSingleExpense: builder.query({
			query: ({ expenseId }) => `/expense/get-expense/${expenseId}`,
			providesTags: ["AllExpenses"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		createExpense: builder.mutation({
			query(body) {
				return {
					url: `/expense/create-expense`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["AllExpenses"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		updateExpense: builder.mutation({
			query(body) {
				return {
					url: `/expense/update-expense`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["AllExpenses"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		deleteExpense: builder.mutation({
			query({ expenseId }) {
				return {
					url: `/expense/delete-expense/${expenseId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["AllExpenses"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),

		// get pending bills by payee
		getPendingBills: builder.query({
			query: ({ payeeId }) => `/expense/open-bills/${payeeId}`,
			providesTags: ["AllExpenses"],
		}),

		// get closed bills by payee
		getClosedBills: builder.query({
			query: ({ payeeId }) => `/expense/closed-bills/${payeeId}`,
			providesTags: ["AllExpenses"],
		}),

		// get bill payment history
		getBillPaymentHistory: builder.query({
			query: ({ id }) => `/expense/bill-payment-details/${id}`,
			providesTags: ["AllExpenses"],
		}),

		// get advance balance history by customer
		getAdvanceBillPaymentHistory: builder.query({
			query: ({
				customerId,
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/billPayment/get-advance-bill-payment-details/${customerId}?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["AllExpenses"],
		}),

		// post bill payment for bill
		postBillPayment: builder.mutation({
			query({ body }) {
				return {
					url:
						body.payment_status === "bill_payment"
							? `/billPayment/create-update-bill-payment`
							: `/billPayment/settle-bill`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["AllExpenses"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		// undo payment received for invoice
		undoBillPayment: builder.mutation({
			query({ id }) {
				return {
					url: `/billPayment/undo-bill-payment/${id}`,
					method: "PUT",
				};
			},
			invalidatesTags: ["AllExpenses"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
	}),
});

export const {
	useGetAllTransactionOfPayeeQuery,

	useGetAllExpensesQuery,
	useGetSingleExpenseQuery,
	useCreateExpenseMutation,
	useUpdateExpenseMutation,
	useDeleteExpenseMutation,
	useGetPendingBillsQuery,
	useGetClosedBillsQuery,

	usePostBillPaymentMutation,
	useGetBillPaymentHistoryQuery,
	useGetAdvanceBillPaymentHistoryQuery,
	useUndoBillPaymentMutation,
} = expenseApi;
