import React, { useState } from "react";
import StudentsRentalsComponent from "../components/students tables components/StudentsRentalsComponent";
import dummyBooks from "../components/dummyBooks";
import { useGetRentalsQuery } from "../states/apiSlice";
import { useSelector } from "react-redux";

const rows = dummyBooks;
const StudentsRentalsPage = () => {
  const academicYear=useSelector((state)=>state.global.academicYear)
  const{data,isLoading,isSuccess,isError,error}=useGetRentalsQuery({academicYear})
  const [rental, setRental] = useState({
    bookName: "",
    bookId: "",
    academicLevel: "",
    bookCategory: "",
    startDate: null,
    endDate: null,
  });

  const handleChange = (e) => {
    setRental({ ...rental, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(rental);
    setRental({
      bookName: "",
      bookId: "",
      academicLevel: "",
      bookCategory: "",
      startDate: null,
      endDate: null,
    });
  };

  const handleStartDateChange = (newValue) => {
    setRental((prevState) => ({
      ...prevState,
      startDate: newValue.format("MM/DD/YYYY"),
    }));
  };

  const handleEndDateChange = (newValue) => {
    setRental((prevState) => ({
      ...prevState,
      endDate: newValue.format("MM/DD/YYYY"),
    }));
  };

  return (
    <>
      <StudentsRentalsComponent
        rows={rows}
        studentName={`bituri fabrice`}
        rental={rental}
        onSubmit={handleSubmit}
        handleChange={handleChange}
        setRental={setRental}
        handleStartDateChange={handleStartDateChange}
        handleEndDateChange={handleEndDateChange}
      />
    </>
  );
};

export default StudentsRentalsPage;
