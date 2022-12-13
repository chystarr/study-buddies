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
  const [alreadyEnrolled, setAlreadyEnrolled] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  let params = useParams();

  useEffect(() => {
    // is the current user already enrolled in this class?
    async function getData () {
      try {
        let classesResponse = await fetch("/api/classes/enrolled");
        let classesData = await classesResponse.json();
        
        const id = Number(params.id);
        for (const classData of classesData) {
          // if the current user has already enrolled in this class
          if (classData.id === id) {
            setAlreadyEnrolled(true);
          }
        }

      } catch (error) {
        console.error("Error fetching /api/classes/enrolled", error);
        setError(true);
      }
    }
    
    getData();

    return () => {
      // clean up function
    };
  }, [params.id]);

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
  }, [params.id, alreadyEnrolled]);

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
        setAlreadyEnrolled(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while enrolling in a class", error);
      setError(true);
    }
  };

  function EnrollButton() {
    if (!alreadyEnrolled) {
      return <button onClick={handleClick}>Enroll</button>;
    } else {
      return <button>Already enrolled</button>;
    }
  }

  /*
  function CreateNewGroup() {
    const handleInputChange = event => {
      setNewGroupName(event.target.value);
      console.log(newGroupName);
    }

    const handleSubmit = event => {
      event.preventDefault();
      console.log("Form was submitted!");
      console.log(newGroupName);
    }

    return (
      <form onSubmit={handleSubmit}>
      <input type="text" className="form-control" placeholder="Enter a name for the new group"
      value={newGroupName} onChange={handleInputChange}/>
      <button type="submit" className="btn btn-primary">
        Create Group
      </button>
      </form>
    );
  }
  */

  const handleInputChange = (event) => {
    setNewGroupName(event.target.value);
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    try {
      console.log(newGroupName);
      console.log(classInfo.id);
      console.log(JSON.stringify({
        groupName: newGroupName,
        ClassId: classInfo.id,
      }));
      let response = await fetch("/api/groups", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: newGroupName,
          ClassId: classInfo.id,
        }),
      });

      if (!response.ok) {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while creating a group", error);
      setError(true);
    }
  };

  return (
    <div>
    {error && <ErrorAlert details={"Failed to save the content"} />}
    <p>This is the {classInfo.className} details page</p>
    <EnrollButton />
    <p>Enrolled students:</p>
    {students.map((studentData) => (
      <StudentCard firstName={studentData.firstName} lastName={studentData.lastName} major={studentData.major} key={studentData.id} />
    ))}
    <p>Study groups:</p>

    <form onSubmit={handleSubmit}>
      <input type="text" className="form-control" placeholder="Enter a name for the new group"
      value={newGroupName} onChange={handleInputChange}/>
      <button type="submit" className="btn btn-primary">
        Create Group
      </button>
    </form>

    {groups.map((groupData) => (
      <GroupCard id={groupData.id} groupName={groupData.groupName} className={classInfo.className} enrolledInClass={alreadyEnrolled} key={groupData.id} />
    ))}
    </div>
  );
}

export default ClassDetailsPage;