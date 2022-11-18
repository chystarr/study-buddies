import React from "react";
import ClassCard from "../components/ClassCard";

// should show a different version of class cards here, without the "Add Class" option
// or just don't have that option outside of the class details page?
function MyClassesPage() {
  return(
      <div>
        <p>This is the My Classes page</p>
        <p>Classes the user is enrolled in will be displayed here</p>
        <ClassCard id={1}/>
      </div>
  );
}

export default MyClassesPage;