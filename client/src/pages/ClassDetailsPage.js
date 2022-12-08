import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";
import LoadingSpinner from "../components/LoadingSpinner";

function ClassDetailsPage() {
  const [classInfo, setClassInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getData () {
      try {
        let response = await fetch("/api/classes/" + params.id);
        let classData = await response.json();
        setClassInfo(classData);
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
  }, [params.id]);

  if (error) {
    return(
      <ErrorAlert details={"Class with id=" + params.id + " not found"} />
    );
  }
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
    {classInfo.className}
    <p>Class details page</p>
    </div>
  );
}

export default ClassDetailsPage;