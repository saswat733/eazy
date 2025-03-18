import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query(body) {
        return {
          url: `/users/login`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: `/users/forgot-password`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    verifyOtp: builder.mutation({
      query(body) {
        return {
          url: `/users/forgot-password-otp-verify`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    resetPassword: builder.mutation({
      query(body) {
        return {
          url: `/users/password-change`,
          method: "POST",
          body,
        };
      },
      transformErrorResponse: (error) => {
        return error?.data?.message || "something went wrong";
      },
    }),
    createUpdateCredential: builder.mutation({
      query(body) {
        return {
          url: `/users/password-change`,
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
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useCreateUpdateCredentialMutation,
} = authApi;
