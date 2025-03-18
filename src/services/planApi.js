import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const plansApi = createApi({
  reducerPath: "plansApi",
  baseQuery,
  tagTypes: ["AllPlans"],
  endpoints: (builder) => ({
    getAllPlans: builder.query({
      query: () => "/plan",
      providesTags: ["AllPlans"],
    }),
    getSinglePlan: builder.query({
      query: ({ planId }) => `/plan/${planId}`,
      providesTags: ["AllPlans"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    updatePlan: builder.mutation({
      query(body) {
        return {
          url: `/user/plan-upgrade-payment`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllPlans"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    cancelPlan: builder.mutation({
      query({ body, id }) {
        return {
          url: `/plan/cancel-plan?user_id=${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["AllPlans"],
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    getUserSubscription: builder.query({
      query: ({ userId }) => `/userSubscription/${userId}`,
      providesTags: ["AllPlans"],
      transformResponse: (rawResult) => rawResult.data || null,
    }),
    getAllPaymentHistory: builder.query({
      query: () => "/user/payment-history",
      providesTags: ["AllPlans"],
    }),
  }),
});

export const {
  useGetAllPlansQuery,
  useGetSinglePlanQuery,
  useUpdatePlanMutation,
  useCancelPlanMutation,
  useGetUserSubscriptionQuery,
  useGetAllPaymentHistoryQuery,
} = plansApi;
