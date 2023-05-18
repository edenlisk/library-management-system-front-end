import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-system-7uoz.onrender.com/api/v1/",
    prepareHeaders: (headers, {getState}) => {
      const token = getState().auth.token;
      if (token) {
        headers.append('Authorization', `Bearer ${token}`)
      }
      return headers;
    }
  }),
  tagTypes: ["classes", "students", "rentals", "academicYear", "classreport"],
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
      query: ({academicYear, formData}) => ({
        url: `/classes/upload/${academicYear}`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['classes']
    }),
    generateClassReport: builder.mutation({
      query: (classId) => ({
        url: `/classes/report/${classId}`,
        method: 'POST',
        // headers: {
        //   'Content-Type': 'application/pdf'
        // },
        responseHandler: (response) => {
          return response.blob()
        }
      }),
      invalidatesTags: ['classreport']
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
      query: ({name,registrationNumber, academicYear, classId}) => ({
        url: `/students/${academicYear}/${classId}`,
        method: 'POST',
        body:{name,registrationNumber}
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
    generateStudentReport: builder.mutation({
      query: (studentId) => ({
        url: `/students/report/${studentId}`,
        method: 'POST',
        responseHandler: (response) => response.blob()
      }),
      invalidatesTags: ['students']
    }),
    // USE MULTI-PART FORM DATA TO BE ABLE TO PUT FILE INTO REQ BODY
    uploadStudents: builder.mutation({
      query: ({classId, formData}) => ({
        url: `/students/upload/${classId}`,
        method: 'POST',
        body: formData
      }),
      invalidatesTags: ['students', 'classes']
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
    // body: { nameOfBook, bookId, dueDate, category ,status}
    updateRental: builder.mutation({
      query: ({ body, rentalId }) => ({
        url: `/rentals/${rentalId}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: ['rentals']
    }),
    login: builder.mutation({
      query: ({body}) => ({
        url: '/librarians/login',
        method: 'POST',
        body
      })
    }),
    signup: builder.mutation({
      query: ({body}) => ({
        url: '/librarians/signup',
        method: 'POST',
        body
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/librarians/logout',
        method: 'POST'
      })
    }),
    adminLogin: builder.mutation({
      query: () => ({
        url: `/admin/login`,
        method: 'POST'
      })
    }),
    adminSignup: builder.mutation({
      query: () => ({
        url: `/admin/signup`,
        method: 'METHOD'
      })
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
  useCreateRentalMutation,
  useDeleteRentalMutation,
  useUpdateRentalMutation,
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useAdminLoginMutation,
  useAdminSignupMutation } = apiSlice;
