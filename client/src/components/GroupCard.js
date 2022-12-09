import React from "react";
import { Link } from "react-router-dom";

function GroupCard({ id, groupName, className }) {
  return(
    <div className="card col-10 col-md-8 col-lg-7 mx-auto">
      <h5 className="card-title">{groupName}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Study group for the {className} class</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <Link to={"/groups/" + id}>Group Details</Link>
    </div>
  );
}

export default GroupCard;