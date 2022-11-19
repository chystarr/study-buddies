import React from "react";
import Typewriter from "typewriter-effect";



function HomePage() {
  return(
      <div>
        <Typewriter
          onInit={(typewriter) => {
            typewriter
              .typeString("Welcome to the Study Buddies platform!")
              .pauseFor(10000)
              .deleteAll()
              .typeString("Explore our platform today!")
              .start();
          }}
        />

        <p>This platform was designed for students to meet up with others and study for class they are struggling in</p>
      </div>

  );
}

export default HomePage;