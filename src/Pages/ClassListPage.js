import React, { useState } from "react";
import ClassList from "../components/students tables components/ClassListComponent";
import dummyData from "../components/dummydata";

const ClassListPage = () => {
  const rows = dummyData;
  const [newStudent, setNewStudent] = useState({
    fullname: "",
    id: "",
    academicLevel: "",
  });

  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(newStudent);
    setNewStudent({ fullname: "", id: "", academicLevel: "" });
  };
  const handleRowDelete = () => {
    console.log("weee");
  };

  return (
    <>
      <ClassList
        rows={rows}
        className={"S6 MPC 2019"}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        handleRowDelete={handleRowDelete}
      />
    </>
  );
};

export default ClassListPage;
