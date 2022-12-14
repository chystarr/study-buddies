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
            <p>
              Frontend and Backend Teams
            </p>
          </div>
          <div className="col-lg-6">
            <h3>Chynna Starr</h3>
            <p>
              Frontend and Backend Teams
            </p>
          </div>
          
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
