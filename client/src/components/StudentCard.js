import React from "react";
import { Link } from "react-router-dom";

// should have link to specific profile page in the future
function StudentCard() {
  return(
    <div className="card col-10 col-md-8 col-lg-7 mx-auto">
      <h5 className="card-title">Student Name</h5>
      <h6 className="card-subtitle mb-2 text-muted">School Name</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <Link to={"/profile"}>Details</Link>
    </div>
  );
}

export default StudentCard;