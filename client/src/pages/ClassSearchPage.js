import React from "react";

function ClassSearchPage() {
  return(
      <div>
        <div className="col-10 col-md-8 col-lg-7 mx-auto">
          <form>
            <div className="input-group">
              <input
                type="text"
                placeholder="Add your words of wisdom here..."
                className="form-control"
                autoFocus
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
            </div>
          </form>
        </div>

        <p>Classes will show up as search results here</p>
      </div>
  );
}

export default ClassSearchPage;