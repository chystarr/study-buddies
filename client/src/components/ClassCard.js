import React from "react";
import { Link } from "react-router-dom";

function ClassCard({ id, className }) {
  return(
    <div className="card col-10 col-md-8 col-lg-7 mx-auto">
      <h5 className="card-title">{className}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Subject Name</h6>
      <h6 className="card-subtitle mb-2 text-muted">School Name</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
      <Link to={"/classes/" + id}>Details</Link>
    </div>
  );
  /*
  return (
    <div className="col-10 col-md-8 col-lg-7">
      <div className="card mb-4 shadow">
        <div className="card-body card-text">
          <Link to={"/posts/" + id}>Content</Link>
        </div>
        <div className="card-footer small text-muted text-end">dateCreated</div>
      </div>
    </div>
  );
  */
}

export default ClassCard;
