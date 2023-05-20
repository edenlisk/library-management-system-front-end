import React from 'react'
import FlexBetween from './FlexBetween'
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'
import GenerateClassReport from './GenerateClassReport'
import GenerateStudentReport from './GenerateStudentReport'
import FileUploadClasses from './FileUploadClasses'
import FileUploadStudents from './FileUploadStudents'

const Customtoolbar = ({classId,studentId,academicYear}) => {
  return (
    // <GridToolbarContainer>
    //     <FlexBetween>
    //         <FileUploadClasses/>
    //         <FileUploadStudents/>
    //         <GenerateClassReport ClassId={classId} />
    //         <GenerateStudentReport studentId={studentId}/>
    //         <GridToolbarQuickFilter/>
    //     </FlexBetween>
    // </GridToolbarContainer>    
        <GridToolbarContainer >
        <FlexBetween width="100%">
          <FlexBetween sx={{gap:1, mb:1}} >
          {academicYear && (!studentId ||!classId) ? <FileUploadClasses academicYear={academicYear} /> : ""}
          {classId ? (
            <>
              <FileUploadStudents classId={classId} />
              <GenerateClassReport ClassId={classId} />
            </>
          ) : (
            ""
          )}
          {studentId ? <GenerateStudentReport studentId={studentId} /> : ""}
          </FlexBetween>
          <FlexBetween>
          <GridToolbarQuickFilter />
          </FlexBetween>
        </FlexBetween>
      </GridToolbarContainer>
  )
}

export default Customtoolbar