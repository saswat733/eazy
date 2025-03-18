import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery";

export const rolesApi = createApi({
	reducerPath: "rolesApi",
	baseQuery,
	tagTypes: ["AllRoles"],
	endpoints: (builder) => ({
		// All Roles
		getAllRoles: builder.query({
			query: ({
				page = 1,
				pageSize = 100,
				all = false,
				searchText = "",
				filter = "",
			}) =>
				`/role?page=${page}&pageSize=${pageSize}&all=${all}&search=${searchText}&filter=${filter}`,
			providesTags: ["AllRoles"],
		}),
		getSingleRole: builder.query({
			query: ({ roleId }) => `/role/${roleId}`,
			providesTags: ["AllRoles"],
			transformResponse: (rawResult) => rawResult.data || null,
		}),
		createUpdateRole: builder.mutation({
			query(body) {
				return {
					url: `/role`,
					method: "POST",
					body,
				};
			},
			invalidatesTags: ["AllRoles"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
		deleteRole: builder.mutation({
			query({ roleId }) {
				return {
					url: `/role/${roleId}`,
					method: "DELETE",
				};
			},
			invalidatesTags: ["AllRoles"],
			transformErrorResponse: (error) => {
				return error?.data?.message || "something went wrong";
			},
		}),
	}),
});

export const {
	useGetAllRolesQuery,
	useGetSingleRoleQuery,
	useCreateUpdateRoleMutation,
	useDeleteRoleMutation,
} = rolesApi;
