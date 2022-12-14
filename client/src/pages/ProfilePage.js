import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";
import ClassCard from "../components/ClassCard";
import GroupCard from "../components/GroupCard";

function ProfilePage() {
  const [classes, setClasses] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let params = useParams();
  
  useEffect(() => {
    async function getData () {
      try {
        let classesResponse = await fetch("/api/classes/enrolled");
        let classesData = await classesResponse.json();
        setClasses(classesData);

        let groupsResponse = await fetch("/api/groups/joined");
        let groupsData = await groupsResponse.json();
        setGroups(groupsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching /api/enrolled/ or /api/groups/joined", error);
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
      <ErrorAlert details={"Error fetching /api/enrolled or /api/groups/joined"} />
    );
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  return(
      <div>
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Profile</h2>
            </div>
            <div className="col">
              Settings
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h4>My Classes</h4>
              {classes.map((classData) => (
                <ClassCard id={classData.id} className={classData.className} subjectId={classData.SubjectId} schoolId={classData.SchoolId} key={classData.id} />
              ))}
            </div>
            <div className="col">
              <h4>My Groups</h4>
              {groups.map((groupData) => (
                <GroupCard id={groupData.id} groupName={groupData.groupName} className={groupData.classId} key={groupData.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}

export default ProfilePage;