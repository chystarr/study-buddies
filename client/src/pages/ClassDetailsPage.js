import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import StudentCard from "../components/StudentCard";
import GroupCard from "../components/GroupCard";

function ClassDetailsPage() {
  const [classInfo, setClassInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [groups, setGroups] = useState([]);
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

        let groupsResponse = await fetch("/api/groups/class/" + params.id);
        let groupsData = await groupsResponse.json();
        setGroups(groupsData);

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
      return <button onClick={handleClick}>Enroll</button>;
    } else {
      return <button>Already enrolled</button>;
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
    <p>Study groups:</p>
    {groups.map((groupData) => (
      <GroupCard id={groupData.id} groupName={groupData.groupName} className={classInfo.className} key={groupData.id} />
    ))}
    </div>
  );
}

export default ClassDetailsPage;