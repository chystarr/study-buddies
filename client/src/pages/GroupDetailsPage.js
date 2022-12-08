import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import StudentCard from "../components/StudentCard";

function GroupDetailsPage() {
  const [groupInfo, setGroupInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getData () {
      try {
        let response = await fetch("/api/groups/" + params.id);
        let groupData = await response.json();
        setGroupInfo(groupData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching /api/groups/" + params.id, error);
        setError(true);
      }
    }
    
    getData();

    return () => {
      // clean up function
    };
  }, [params.id]);

  if (error) {
    return(
      <ErrorAlert details={"Group with id=" + params.id + " not found"} />
    );
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
    {groupInfo.groupName}
    <p>Group details page</p>
    <StudentCard/>
    <p>Add discussion/comment section here</p>
  </div>
  );
}

export default GroupDetailsPage;