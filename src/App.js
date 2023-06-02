import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./components/theme";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dashboard from "./components/Dashboard";
import Layout from "./layout/Layout";
// import FileUploadStudents from "./components/FileUploadStudents";
// import GenerateClassReport from "./components/GenerateClassReport";
import GenerateStudentReport from "./components/GenerateStudentReport";
import Notification from "./components/Notification";
import Settings from "./components/Settings";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'


// import AddForm from './components/AddForm';
import LoginPage from "./components/userAuthentication/LoginPage";
import PasswordRecoverPage from "./components/userAuthentication/PasswordRecoverPage";
import SignUpPage from "./components/userAuthentication/SignupPage";
import StudentsRentalsPage from "./Pages/StudentsRentalsPage";
import ClassListPage from "./Pages/ClassListPage";
// import Tests from "./components/Tests";
import EditStudentPage from "./Pages/EditStudentPage";
import ClassNamesPage from "./Pages/ClassNamesPage";
// import ClassList from "./components/students tables components/ClassListComponent";
// import StudentsRentalsComponent from "./components/students tables components/StudentsRentalsComponent";
import EditRentalPage from "./Pages/EditRentalPage";
import FileUploadStudents from "./components/FileUploadStudents";
import CustomButtuonUpload from "./components/CustomButtuonUpload";
import TeacherListPage from "./Pages/TeachersListPage";
import EditTeacherPage from "./Pages/EditTeacherPage";
import TeachersRentalsPage from "./Pages/TeachersRentalPage";
import AddBook from "./components/books components/AddBook";
import BooksPage from "./components/books components/BooksPage";
import AddStudentBookRentalPage from "./components/books components/AddStudentBookRentalPage";
import BooksList from "./components/books components/BooksList";
import LostBooks from "./components/books components/LostBooks";
import EditBookPage from "./components/books components/EditBookPage";
import EditTeacherRentalPage from "./Pages/EditTeacherRental";
import AddTeacherBookRentalPage from "./components/books components/AddTeacherBookRentalPage";
import Tests from "./components/Tests";
import LibrarianModal from "./components/LibrarianModal";
function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ToastContainer
                pauseOnHover
                autoClose={3000}
            />
            <Routes>
              <Route element={<Layout />}>
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                    path="/passwordrecover"
                    element={<PasswordRecoverPage />}
                />
                {/* <Route path="/classes" element={<ClassListPage />} /> */}
                <Route path="/classes" element={<ClassNamesPage />} />
                <Route path="/students/:classId" element={<ClassListPage />} />
                <Route path="/transactions" element={<LoginPage />} />
                <Route path="/rentals/:studentId" element={<StudentsRentalsPage/>} />
                <Route path="/overview" element={<SignUpPage />} />
                <Route path="/edit/student/:studentId" element={<EditStudentPage />} />
                <Route path="/edit/rental/:rentalId" element={<EditRentalPage />} />
                {/* TEST OF RTK QUERY DATAS IN THE TEST FILE */}
                <Route path="/history" element={<CustomButtuonUpload />} />
                <Route path="/teachers/:teacherId" element={<EditTeacherPage />} />
                <Route path="/teachers/teachers-rentals/:teacherId" element={<TeachersRentalsPage />} />
                <Route path="/edit/teachers-rental/:rentalId" element={<EditTeacherRentalPage />} />
                <Route path="/daily" element={<TeacherListPage/>} />
                <Route path='/breakdown' element={<GenerateStudentReport/>}/>
                {/* <Route path='/book' element={<AddBook/>}/> */}
                <Route path='/edit-book/:bookId' element={<EditBookPage/>}/>
                <Route path='/bookspage' element={<BooksPage/>}/>
                <Route path='/add/student-rental/:studentId' element={<AddStudentBookRentalPage/>}/>
                <Route path='/add/teacher-rental/:teacherId' element={<AddTeacherBookRentalPage/>}/>
                <Route path="/monthly" element={<BooksList />} />
                <Route path="/lost-books" element={<LostBooks />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/load-button" element={<LibrarianModal/>} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
