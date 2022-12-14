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
    <div className="card border-dark mt-3 mb-3">
      <h5 className="card-title">{className}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Subject: {subjectInfo.subjectName}</h6>
      <h6 className="card-subtitle mb-2 text-muted">School: {schoolInfo.schoolName}</h6>
      <Link to={"/classes/" + id}><button className="btn btn-link">Class Details</button></Link>
    </div>
  );
}

export default ClassCard;
