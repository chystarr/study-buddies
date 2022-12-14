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

  function NumMembers() {
    if (members.length > 1) {
      return(<h5>{members.length} group members</h5>);
    } else {
      return(<h5>1 group member</h5>);
    }
  }

  return (
    <div>
      <h1>{groupInfo.groupName}</h1>
      <div className="container">
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-primary btn-lg mt-3 mb-3">Invite a student</button>
            <NumMembers />
            {members.map((memberData) => (
              <StudentCard firstName={memberData.firstName} lastName={memberData.lastName} major={memberData.major} key={memberData.id} />
            ))}
          </div>
          <div className="col-8">
            <div>
              Discussion section coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsPage;