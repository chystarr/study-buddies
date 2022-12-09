import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ErrorAlert from "../components/ErrorAlert";

function GroupCard({ id, groupName, className }) {
  const [error, setError] = useState(false);
  const[clickedJoin, setClickedJoin] = useState(false);

  useEffect(() => {
    return () => {
      // clean up function
    };
  }, [clickedJoin]);

  if (error) {
    return(
      <ErrorAlert details={"Group with id=" + id + " couldn't be joined"} />
    );
  }

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/groups/" + id + "/join", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setClickedJoin(true);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Server error while joining a group", error);
      setError(true);
    }
  };

  function JoinButton() {
    if (!clickedJoin) {
      return <button onClick={handleClick}>Join Group</button>
    } else {
      return <Link to={"/groups/" + id}><button>Group Details</button></Link>
    }
  }

  return(
    <div className="card col-10 col-md-8 col-lg-7 mx-auto">
      <h5 className="card-title">{groupName}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Study group for the {className} class</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <JoinButton />
    </div>
  );
}

export default GroupCard;