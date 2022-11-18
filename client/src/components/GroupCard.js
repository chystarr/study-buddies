import React from "react";
import { Link } from "react-router-dom";

function GroupCard({ id }) {
  return(
    <div className="card col-10 col-md-8 col-lg-7 mx-auto">
      <h5 className="card-title">Group Name</h5>
      <h6 className="card-subtitle mb-2 text-muted">Class Name</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <Link to={"/groups/" + id}>Details</Link>
    </div>
  );
}

export default GroupCard;