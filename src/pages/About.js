/*
About page

This page will have information about us the frameworks we used
and otehr technical feature sof the app
ie
"Our revolutionary app uses the XY api to accomplish ABC"
*/

import React from "react";
import "../App.css";
function About() {
  return (
    <div>
      <h1>About Page</h1>
      <div class="main" id="about">
      <div class="main__container">
        <div class="main__img--container">
          <div class="main__img--card"><i class="fas fa-layer-group"></i></div>
        </div>
        <div class="main__content">
          <h1>What do we do?</h1>
          <h2>We help people reach their fitness goal</h2>
          <p>Login and start tracking your daily nutrition and workout plan for greater rewards for yourself.</p>
          <button class="main__btn"><a href="#">Sign up</a></button>
        </div>
      </div>
    </div>
    </div>
  );
}

// const About = () => {
//   return (
//     <div>
//       <h1>About Page</h1>
//     </div>
//   );
// };

export default About;
