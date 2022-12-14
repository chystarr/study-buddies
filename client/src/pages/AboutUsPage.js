import React from "react";

function AboutUsPage(props) {
  return (
    <>
      <div className="col text-center">
        <h2 className="mb-3">Our Motivation</h2>
        <p className="mb-5">
        Personally, we have had a hard time making connections during our undergraduate career. The pandemic has prompted us to become isolated and more reliant on ourselves. We would love to create a platform that helps students to create bonds and networks with other students not only for studying and sharing notes, but to help them grow in their skillset and to supplement their career goals.

        </p>
        <h2 className="mb-3">About our Team</h2>
        <div className="row">
          <div className="col-lg-6">
            <h3>Joel James</h3>
            <p>Computer Science Senior at City College </p>
            <p>Frontend and Backend</p>
            <form>
            <button id='view-linkedIn-button' type="submit" className = "btn btn-info" formaction="https://www.linkedin.com/in/joel-m-james/">Connect with Joel on LinkedIn</button>
            </form>
          </div>
          <div className="col-lg-6">
            <h3>Chynna Starr</h3>
            <p>Computer Science Senior at Hunter College </p>
            <p>Frontend and Backend</p>
            <form>
            <button id='view-linkedIn-button' type="submit" className = "btn btn-info" formaction="https://www.linkedin.com/in/chynna-starr/">Connect with Chynna on LinkedIn</button>
            </form>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
