import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-7uoz.onrender.com/api/v1/",
  }),
  tagTypes: ["classes", "students", "rentals", "academicYear"],
  endpoints: (builder) => ({
    // GET CLASSES
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
    // DELETE CLASS
    deleteClass: builder.mutation({
      query: (classId) => ({
        url: `/classes/${classId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['classes']
    }),
    updateClass: builder.mutation({
      query: ({name, category, classId}) => ({
        url: `/classes/${classId}`,
        method: 'PATCH',
        body: { name, category }
      }),
      invalidatesTags: ['classes']
    }),
    // USE MULTI-PART FORM DATA TO BE ABLE TO PUT FILE INTO REQ BODY
    uploadClasses: builder.mutation({
      query: (academicYear) => ({
        url: `/classes/upload/${academicYear}`,
        method: 'POST',
        body: {}
      }),
      invalidatesTags: ['classes']
    }),
    generateClassReport: builder.mutation({
      query: (classId) => `/classes/report/${classId}`
    }),
    getAcademicYears: builder.query({
      query: () => `/academic-year`,
      providesTags: ['academicYear', 'classes', 'students']
    }),
    createAcademicYear: builder.mutation({
      query: (academicYear) => ({
        url: `/academic-year`,
        method: 'POST',
        body: { academicYear }
      }),
      invalidatesTags: ['academicYear']
    }),
    getStudents: builder.query({
      query: ({ academicYear, classId }) => `/students/${academicYear}/${classId}`,
      providesTags: ['students']
    }),
    createStudent: builder.mutation({
      query: ({body, academicYear, classId}) => ({
        url: `/students/${academicYear}/${classId}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['students']
    }),
    updateStudent: builder.mutation({
      query: ({ body, studentId}) => ({
        url: `/students/${studentId}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['students']
    }),
    deleteStudent: builder.mutation({
      query: ({ academicYear, classId, studentId }) => ({
        url: `/students/${academicYear}/${classId}/${studentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['students']
    }),
    generateStudentReport: builder.query({
      query: ({studentId}) => `/students/${studentId}`,
      providesTags: ['students']
    }),
    // USE MULTI-PART FORM DATA TO BE ABLE TO PUT FILE INTO REQ BODY
    uploadStudents: builder.mutation({
      query: (classId) => ({
        url: `/students/upload/${classId}`,
        method: 'POST'
      }),
      invalidatesTags: ['students']
    }),
    getRentals: builder.query({
      query: ({ academicYear, studentId }) => `/rentals/${academicYear}/${studentId}`,
      providesTags: ['rentals']
    }),
    // body: { nameOfBook, bookId, issueDate, dueDate, nameOfLender }
    createRental: builder.mutation({
      query: ({ body, academicYear, studentId }) => ({
        url: `/rentals/${academicYear}/${studentId}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['rentals']
    }),
    deleteRental: builder.mutation({
      query: (rentalId) => ({
        url: `/rentals/${rentalId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['rentals']
    }),
    // body: { nameOfBook, bookId, dueDate, nameOfLender }
    updateRental: builder.mutation({
      query: ({ body, rentalId }) => ({
        url: `/rentals/${rentalId}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['rentals']
    })


    // GET STUDENTS BY CLASSID  TO GET: STUNT-ID,NAME CLASS-ID,REG-NBR,FINE

    // CREATE NEW RENTAL PASS IN STUNT-ID AS PARAM
    // VALUESIN RENTALS BODY:BOOKNAME,STUNT-ID,BOOK-ID,ISSUE-DATE,DUE-DATE,RENDER'S-NAME
  }),
});

export const {
  useGetClassesQuery,
  useCreateClassMutation,
  useUpdateClassMutation,
  useDeleteClassMutation,
  useUploadClassesMutation,
  useGenerateClassReportMutation,
  useGetAcademicYearsQuery,
  useCreateAcademicYearMutation,
  useGetStudentsQuery,
  useCreateStudentMutation,
  useUpdateStudentMutation,
  useUploadStudentsMutation,
  useDeleteStudentMutation,
  useGenerateStudentReportMutation,
  useGetRentalsQuery,
  useCreateRentalQuery,
  useUpdateRentalMutation } = apiSlice;
