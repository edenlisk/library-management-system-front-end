import React, { useState } from "react";
import { useSelector } from "react-redux";
import ClassList from "../components/students tables components/ClassListComponent";
import dummyData from "../components/dummydata";
import { useParams } from "react-router-dom";
import { useCreateStudentMutation, useDeleteStudentMutation, useGetStudentsQuery } from "../states/apiSlice";

const ClassListPage = () => {
  const academicYear = useSelector(state => state.global.academicYear);
const{classId}=useParams();
// FETCHING STUDENTS LIST
const{ data, isLoading, isSuccess,isError,error}=useGetStudentsQuery({academicYear,classId})


// ADDING NEW STUDENT
const[createNewStudent]=useCreateStudentMutation()
const[deleteStudent]=useDeleteStudentMutation()

let rows = [];
if (isLoading) {
  console.log("loading");
}
if (isError) {
  console.log(`the api provided error: ${error}`);
}
if (isSuccess) {
  const {data:students}=data
  const{result}=students
  console.log(result)
  rows=result
}
const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  const [newStudent, setNewStudent] = useState({
    name: "",
    registrationNumber: "",
    academicLevel: "",
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleClose();
    await createNewStudent({...newStudent, academicYear,classId});
    console.log(newStudent);
    setNewStudent({ name: "",registrationNumber: "", academicLevel: "" });
    
  };
  const handleRowDelete =  () => {
    // await deleteStudent({academicYear,classId,})
    console.log("wee");
  };

  return (
    <>
      <ClassList
        rows={rows}
        loading={isLoading || !rows}
        className={`class name ${academicYear}`}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        handleRowDelete={handleRowDelete}
        open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
      />
    </>
  );
};

export default ClassListPage;
