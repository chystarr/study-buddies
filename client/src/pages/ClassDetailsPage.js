import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import StudentCard from "../components/StudentCard";

function ClassDetailsPage() {
  const [classInfo, setClassInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [clickedEnroll, setClickedEnroll] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getData () {
      try {
        let classInfoResponse = await fetch("/api/classes/" + params.id);
        let classInfoData = await classInfoResponse.json();
        setClassInfo(classInfoData);
        let studentsResponse = await fetch("/api/classes/" + params.id + "/students");
        let studentsData = await studentsResponse.json();
        setStudents(studentsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching /api/classes/" + params.id, error);
        setError(true);
      }
    }
    
    getData();

    return () => {
      // clean up function
    };
  }, [params.id, clickedEnroll]);

  if (error) {
    return(
      <ErrorAlert details={"Class with id=" + params.id + " not found"} />
    );
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/classes/" + params.id + "/enroll", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setClickedEnroll(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while enrolling in a class", error);
      setError(true);
    }
  };

  function EnrollButton() {
    if (!clickedEnroll) {
      return(<button onClick={handleClick}>Enroll</button>);
    } else {
      return (<button>Already enrolled</button>)
    }
  }

  return (
    <div>
    <p>This is the {classInfo.className} details page</p>
    <EnrollButton />
    <p>Enrolled students:</p>
    {students.map((studentData) => (
      <StudentCard firstName={studentData.firstName} lastName={studentData.lastName} major={studentData.major} key={studentData.id} />
    ))}
    </div>
  );
}

export default ClassDetailsPage;