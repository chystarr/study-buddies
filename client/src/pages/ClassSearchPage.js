import React from "react";
import ClassCard from "../components/ClassCard";

function ClassSearchPage() {
  return(
      <div>
        <div className="col-10 col-md-8 col-lg-7 mx-auto">
          <form>
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter a class name"
                className="form-control"
                autoFocus
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>
        <ClassCard id={1}/>
      </div>
  );
}

export default ClassSearchPage;