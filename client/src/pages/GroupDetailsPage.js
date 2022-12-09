import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import StudentCard from "../components/StudentCard";

function GroupDetailsPage() {
  const [groupInfo, setGroupInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getData () {
      try {
        let groupInfoResponse = await fetch("/api/groups/" + params.id);
        let groupInfoData = await groupInfoResponse.json();
        setGroupInfo(groupInfoData);
        let membersResponse = await fetch("/api/groups/" + params.id + "/members");
        let membersData = await membersResponse.json();
        setMembers(membersData);
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
    <p>This is the {groupInfo.groupName} details page</p>
    <p>Group members:</p>
    {members.map((memberData) => (
      <StudentCard firstName={memberData.firstName} lastName={memberData.lastName} major={memberData.major} key={memberData.id} />
    ))}
    <p>Add discussion/comment section here</p>
  </div>
  );
}

export default GroupDetailsPage;