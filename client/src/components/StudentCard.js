import React from "react";

// should have link to specific profile page in the future
function StudentCard({ firstName, lastName, major }) {
  return(
    <div className="card border-dark mt-3 mb-3">
      <h5 className="card-title">{firstName} {lastName}</h5>
      <h6 className="card-subtitle mb-2 text-muted">Major: {major}</h6>
    </div>
  );
}

export default StudentCard;