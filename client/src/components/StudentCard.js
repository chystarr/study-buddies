import React from "react";

// should have link to specific profile page in the future
function StudentCard({ firstName, lastName, major }) {
  return(
    <div className="card">
      <h5 className="card-title">{firstName} {lastName}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Major: {major}</h6>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
  );
}

export default StudentCard;