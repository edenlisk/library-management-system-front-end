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

// import AddForm from './components/AddForm';
import LoginPage from "./components/userAuthentication/LoginPage";
import PasswordRecoverPage from "./components/userAuthentication/PasswordRecoverPage";
import SignUpPage from "./components/userAuthentication/SignupPage";
import StudentsRentalsPage from "./Pages/StudentsRentalsPage";
import ClassListPage from "./Pages/ClassListPage";
import Tests from "./components/Tests";
import EditPage from "./Pages/EditPage";
import ClassNamesPage from "./Pages/ClassNamesPage";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
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
                <Route path="/teachers" element={<StudentsRentalsPage />} />
                <Route path="/overview" element={<SignUpPage />} />
                <Route path="/edit/student/:studentId" element={<EditPage />} />
                {/* TEST OF RTK QUERY DATAS IN THE TEST FILE */}
                <Route path="/history" element={<Tests />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
