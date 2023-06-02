import React, {useEffect, useState} from "react";
import { useGetClassesQuery, useCreateClassMutation } from "../states/apiSlice";
import { useSelector } from "react-redux";
import ClassNames from "../components/classTables/ClassNamescomponents";
import Customtoolbar from "../components/Customtoolbar";
import {toast} from "react-toastify";

const ClassNamesPage = () => {
// FOR GETTING ACADEMIC YEAR

  const academicYear=useSelector((state)=>state.global.academicYear)

  // FOR FETCHING

  const { data, isLoading, isSuccess, isError, error } = useGetClassesQuery(academicYear);
  const [createClass, {isSuccess:isCreationSuccess, isError:isCreationError, error:creationError,isLoading:isSending}] = useCreateClassMutation()
  // console.log(data);
  useEffect(() => {
    if (isCreationSuccess) {
      toast.success("Class created successfully")
    } else if (isCreationError) {
      const { data:fullError } = creationError;
      const {message} = fullError;
      toast.error(message);
    }
  }, [isCreationError, isCreationSuccess]);
  let rows = [];
  if (isLoading) {
    console.log("loading");
  }
  if (isError) {
    console.log(`the api provided error: ${error}`);
  }
  if (isSuccess) {
    const { data: classes } = data;
    const { classes: allclasses } = classes;
    rows = allclasses;
    console.log(rows);
  }
  const [open, setOpen] = useState(false);

  const [newClass, setNewClass] = useState({
    name: "",
    category: "",
  });

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  const handleChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createClass({...newClass,academicYear});
    setOpen(!open);
    

    console.log(newClass);
    setNewClass({ name: "", category: "" });
  };
  const handleRowDelete = () => {
    console.log("weee");
  };

  return (
    <>
      <ClassNames
        rows={rows}
        loading={isLoading || !rows}
        components={{
          Toolbar: () => <Customtoolbar academicYear={academicYear} />,
        }}
        className={` ${academicYear}`}
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        newClass={newClass}
        setNewClass={setNewClass}
        isSending={isSending}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        handleRowDelete={handleRowDelete}
      />
    </>
  );
};


export default ClassNamesPage;
