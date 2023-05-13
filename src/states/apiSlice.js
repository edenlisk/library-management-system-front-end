import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-7uoz.onrender.com/api/v1/",
  }),
  tagTypes: ["classes,students"],
  endpoints: (builder) => ({
    getClasses: builder.query({
      query: (academicYear) => `classes/${academicYear}`,
      providesTags: ["classes"],
    }),
    // CREATE NEW CLASS

    createClass: builder.mutation({
      query: ({ name, category,academicYear }) => ({
        url: `/classes/${academicYear}`,
        method: "POST",
        body: { name, category },
      }),
      invalidatesTags: ["classes"],
    }),
    // GET STUDENTS BY CLASSID  TO GET: STUNT-ID,NAME CLASS-ID,REG-NBR,FINE

    // CREATE NEW RENTAL PASS IN STUNT-ID AS PARAM
    // VALUESIN RENTALS BODY:BOOKNAME,STUNT-ID,BOOK-ID,ISSUE-DATE,DUE-DATE,RENDER'S-NAME
  }),
});

export const { useGetClassesQuery, useCreateClassMutation } = apiSlice;
