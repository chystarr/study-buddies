import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function ClassCard({ id, className, subjectId, schoolId }) {
  // const [classInfo, setClassInfo] = useState(null);
  const [subjectInfo, setSubjectInfo] = useState(null);
  const [schoolInfo, setSchoolInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData () {
      try {
        // let classResponse = await fetch("/api/classes/" + id);
        // let classData = await classResponse.json();
        // setClassInfo(classData);
        let subjectResponse = await fetch("/api/subjects/" + subjectId);
        let subjectData = await subjectResponse.json();
        setSubjectInfo(subjectData);

        let schoolResponse = await fetch("api/schools/" + schoolId);
        let schoolData = await schoolResponse.json();
        setSchoolInfo(schoolData);

        setLoading(false);

      } catch (error) {
        console.error("Error fetching /api/subjects" + subjectId + " or /api/schools" + schoolId, error);
      }
    }
    
    getData();

    return () => {
      // clean up function
    };
  }, [subjectId, schoolId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return(
    <div className="card col-10 col-md-8 col-lg-7 mx-auto">
      <h5 className="card-title">{className}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Subject: {subjectInfo.subjectName}</h6>
      <h6 className="card-subtitle mb-2 text-muted">School: {schoolInfo.schoolName}</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <Link to={"/classes/" + id}>Details</Link>
    </div>
  );
  /*
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={"/posts/" + id}>Content</Link>
        </div>
        <div className="card-footer small text-muted text-end">dateCreated</div>
      </div>
    </div>
  );
  */
}

export default ClassCard;
