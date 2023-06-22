import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

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
    tagTypes: ["classes", "students", "rentals", "librarians", "academicYear", "classreport", "statistics", "teachers", "teachersRentals", "books", 'books-categories', 'settings'],
    endpoints: (builder) => ({
        // GET CLASSES
        getClasses: builder.query({
            query: (academicYear) => `classes/${academicYear}`,
            providesTags: ["classes"],
        }),
        getOneClass: builder.query({
            query: (classId) => `/classes/class/${classId}`,
            providesTags: ["classes"],
        }),
        // CREATE NEW CLASS
        createClass: builder.mutation({
            query: ({name, category, academicYear}) => ({
                url: `/classes/${academicYear}`,
                method: "POST",
                body: {name, category},
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
                body: {name, category}
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
                body: {academicYear}
            }),
            invalidatesTags: ['academicYear']
        }),
        getStudents: builder.query({
            query: ({academicYear, classId}) => ({
                url: `students/${academicYear}/${classId}`,
            }),
            providesTags: ['students']

        }),
        getOneStudent: builder.query({
            query: (studentId) => `/students/${studentId}`,
            providesTags: ['students']
        }),
        createStudent: builder.mutation({
            query: ({name, registrationNumber, academicYear, classId}) => ({
                url: `/students/${academicYear}/${classId}`,
                method: 'POST',
                body: {name, registrationNumber}
            }),
            invalidatesTags: ['students', 'classes']
        }),
        updateStudent: builder.mutation({
            query: ({body, studentId}) => ({
                url: `/students/${studentId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['students']
        }),
        deleteStudent: builder.mutation({
            query: ({academicYear, classId, studentId}) => ({
                url: `/students/${academicYear}/${classId}/${studentId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['students', 'classes']
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
        studentLogin: builder.mutation({
            query: ({registrationNumber, password}) => ({
                url: `/students/login`,
                method: 'POST',
                body: {registrationNumber, password}
            }),
        }),
        getStudentRentals: builder.query({
            query: (studentId) => `/rentals/student/${studentId}`,
            providesTags: ['rentals', 'students', 'classes', 'books']
        }),
        getRentals: builder.query({
            query: ({academicYear, studentId}) => ({
                url: `/rentals/${academicYear}/${studentId}`,
            }),
            providesTags: ['rentals']
        }),
        getOneRental: builder.query({
            query: (rentalId) => `/rentals/${rentalId}`,
            providesTags: ['rentals']
        }),
        // body: { nameOfBook, bookId, issueDate, dueDate, nameOfLender }
        createRental: builder.mutation({
            query: ({body, academicYear, studentId}) => ({
                url: `/rentals/${academicYear}/${studentId}`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['rentals', 'students', "books", "statistics"]
        }),
        deleteRental: builder.mutation({
            query: (rentalId) => ({
                url: `/rentals/${rentalId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['rentals', 'students', "books", "statistics"]
        }),
        // body: { nameOfBook, bookId, dueDate, category ,status}
        updateRental: builder.mutation({
            query: ({body, rentalId}) => ({
                url: `/rentals/${rentalId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['rentals', 'teachersRentals', 'statistics', "books"]
        }),
        getAllRentals: builder.mutation({
            query: ({startDate, endDate}) => ({
                url:  `/rentals/all-rentals/${startDate}/${endDate}`,
                method: 'POST'
            }),
            providesTags: ['rentals', 'teachersRental', 'statistics']
        }),
        lostBooks: builder.query({
            query: () => `/rentals/inactive-rentals`,
            providesTags: ['rentals']
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
            }),
            invalidatesTags: ['librarians']
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/librarians/logout',
                method: 'POST'
            }),
            invalidatesTags: ['librarians']
        }),
        getLibrarians: builder.query({
            query: () => `/librarians`,
            providesTags: ['librarians']
        }),
        getLibrarian: builder.query({
            query: (librarianId) => `/librarians/${librarianId}`,
            providesTags: ['librarians']
        }),
        deleteLibrarian: builder.mutation({
           query: (librarianId) => ({
               url: `/librarians/delete/${librarianId}`,
               method: 'DELETE'
           }),
            invalidatesTags: ['librarians']
        }),
        updateLibrarian: builder.mutation({
           query: ({body, librarianId}) => ({
               url: `/librarians/${librarianId}`,
               method: 'PATCH',
               body
           }),
            invalidatesTags: ['librarians']
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
                method: 'POST'
            })
        }),
        topStudents: builder.query({
            query: (academicYear) => ({
                url: `/statistics/top-students/${academicYear}`
            }),
            providesTags: ['statistics']
        }),
        lastCreated: builder.query({
            query: () => `/statistics/last-created`,
            providesTags: ['statistics', 'rentals', 'teachersRentals', 'books', 'students']
        }),
        getTeachers: builder.query({
            query: () => `/teachers`,
            providesTags: ['teachers']
        }),
        getTeacher: builder.query({
            query: (teacherId) => `/teachers/${teacherId}`,
            providesTags: ['teachers']
        }),
        updateTeacher: builder.mutation({
            query: ({body, teacherId}) => ({
                url: `/teachers/${teacherId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['teachers', "books", "teachersRentals", "statistics"]
        }),
        createTeacher: builder.mutation({
            query: ({body}) => ({
                url: `/teachers`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['teachers']
        }),
        deleteTeacher: builder.mutation({
            query: (teacherId) => ({
                url: `/teachers/${teacherId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['teachers', "teachersRentals", "books", "statistics"]
        }),
        teacherLogin: builder.mutation({
            query: ({registrationNumber, password}) => ({
                url: `/teachers/login`,
                method: 'POST',
                body: {registrationNumber, password}
            })
        }),
        getTeacherRentals: builder.query({
            query: (teacherId) => ({
                url: `/teachers/teachers-rentals/${teacherId}`
            }),
            providesTags: ["teachersRentals"]
        }),
        getSingleTeacherRental: builder.query({
           query: (rentalId) => `/teachers-rental/${rentalId}`,
           providesTags: ['teachersRentals']
        }),
        // getAllTeacherRentals: builder.query({
        //     query: () => ({
        //         url: `/teachers/teachers-rentals`
        //     }),
        //     providesTags: ["teachersRentals"]
        // }),
        createTeacherRental: builder.mutation({
            query: ({body}) => ({
                url: `/teachers-rental`,
                method: 'POST',
                body
            }),
            invalidatesTags: ["teachersRentals", 'books', "statistics", "rentals", "teachers"]
        }),
        updateTeacherRental: builder.mutation({
            query: ({body, rentalId}) => ({
                url: `/teachers-rental/${rentalId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['teachersRentals', 'rentals', "statistics", "books"]
        }),
        deleteTeacherRental: builder.mutation({
            query: (rentalId) => ({
                url: `/teachers-rental/${rentalId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['teachersRentals', 'books', "statistics", "teachers"]
        }),
        weeklyStats: builder.query({
            query: () => `/statistics/weekly-stats`,
            providesTags: ['statistics']
        }),
        getAllBooks: builder.query({
            query: () => `/books`,
            providesTags: ['books']
        }),
        createBook: builder.mutation({
            query: (body) => ({
                url: `/books`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['books', 'books-categories', 'statistics']
        }),
        getBook: builder.query({
            query: (bookId) => `/books/${bookId}`,
            providesTags: ['books']
        }),
        updateBook: builder.mutation({
            query: ({body, bookId}) => ({
                url: `/books/${bookId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['books', 'books-categories', "statistics"]
        }),
        topBooks: builder.query({
            query: () => `/statistics/top-books`,
            providesTags: ['rentals', 'statistics']
        }),
        uploadBooks: builder.mutation({
            query: ({formData}) => ({
                url: `/books/upload`,
                method: 'POST',
                body: formData
            }),
            invalidatesTags: ['books', 'books-categories', "statistics"]
        }),
        getAllCategories: builder.query({
            query: () => `/book-category`,
            providesTags: ['books-categories', 'statistics', 'books']
        }),
        createBookCategory: builder.mutation({
            query: (categoryName) => ({
                url: `/book-category`,
                method: 'POST',
                body: {categoryName}
            }),
            invalidatesTags: ['book-categories', 'statistics', 'books']
        }),
        getCategory: builder.query({
            query: (categoryId) => `/book-category/${categoryId}`,
            providesTags: ['book-categories']
        }),
        totalStats: builder.query({
            query: () => `/statistics/total-revenue`,
            providesTags: ['students', 'rentals', "teachersRentals", 'statistics', 'books']
        }),
        notification: builder.query({
            query: () => `/statistics/notification`,
            providesTags: ['rentals', 'teachersRentals', 'books', 'statistics']
        }),
        notificationReport: builder.mutation({
            query: () => ({
                url: `/statistics/notification-report`,
                method: 'POST',
                responseHandler: (response) => response.blob()
            })
        }),
        getSettings: builder.query({
            query: () => `/settings`,
            providesTags: ['settings']
        }),
        updateSettings: builder.mutation({
            query: ({body}) => ({
                url: `/settings`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: ['settings']
        }),
        overallStats: builder.query({
            query: () => `/statistics/stats-categories`,
            providesTags: ['statistics', 'rentals', 'teachersRentals', 'books']
        }),
        issuedBooks: builder.query({
            query: (academicYear) => `/statistics/all-rentals/${academicYear}`,
            providesTags: ['statistics', 'rentals', 'teachersRentals', 'books']
        }),
        lessBooks: builder.query({
            query: () => `/books/less-books`,
            providesTags: ['rentals', 'books', 'teachersRentals', 'settings', 'statistics']
        }),
        subCategoriesStats: builder.query({
            query: () => `/statistics/stats-subcategories`,
            providesTags: ["rentals", "books", "teachersRentals", "statistics", "books-categories"]
        })

        // GET STUDENTS BY CLASSID  TO GET: STUNT-ID,NAME CLASS-ID,REG-NBR,FINE

        // CREATE NEW RENTAL PASS IN STUNT-ID AS PARAM
        // VALUESIN RENTALS BODY:BOOKNAME,STUNT-ID,BOOK-ID,ISSUE-DATE,DUE-DATE,RENDER'S-NAME
    }),
});

export const {
    useGetClassesQuery,
    useGetOneClassQuery,
    useCreateClassMutation,
    useUpdateClassMutation,
    useDeleteClassMutation,
    useUploadClassesMutation,
    useGenerateClassReportMutation,
    useGetAcademicYearsQuery,
    useCreateAcademicYearMutation,
    useGetStudentsQuery,
    useGetOneStudentQuery,
    useCreateStudentMutation,
    useUpdateStudentMutation,
    useUploadStudentsMutation,
    useDeleteStudentMutation,
    useGenerateStudentReportMutation,
    useGetRentalsQuery,
    useGetOneRentalQuery,
    useCreateRentalMutation,
    useDeleteRentalMutation,
    useUpdateRentalMutation,
    useLoginMutation,
    useSignupMutation,
    useLogoutMutation,
    useAdminLoginMutation,
    useAdminSignupMutation,
    useGetTeachersQuery,
    useGetTeacherQuery,
    useCreateTeacherMutation,
    useDeleteTeacherMutation,
    useUpdateTeacherMutation,
    useGetTeacherRentalsQuery,
    useGetSingleTeacherRentalQuery,
    useCreateTeacherRentalMutation,
    useDeleteTeacherRentalMutation,
    useUpdateTeacherRentalMutation,
    useTopStudentsQuery,
    useWeeklyStatsQuery,
    useBookStatsQuery,
    useGetAllBooksQuery,
    useCreateBookMutation,
    useGetBookQuery,
    useUpdateBookMutation,
    useUploadBooksMutation,
    useGetAllCategoriesQuery,
    useCreateBookCategoryMutation,
    useGetCategoryQuery,
    useLostBooksQuery,
    useTopBooksQuery,
    useTotalStatsQuery,
    useNotificationQuery,
    useNotificationReportMutation,
    useGetSettingsQuery,
    useUpdateSettingsMutation,
    useLastCreatedQuery,
    useOverallStatsQuery,
    useUpdateLibrarianMutation,
    useDeleteLibrarianMutation,
    useGetLibrariansQuery,
    useGetLibrarianQuery,
    useIssuedBooksQuery,
    useGetAllRentalsMutation,
    useLessBooksQuery,
    useStudentLoginMutation,
    useGetStudentRentalsQuery,
    useSubCategoriesStatsQuery,
    useTeacherLoginMutation
} = apiSlice;
