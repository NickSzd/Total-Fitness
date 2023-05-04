/*
About page

This page will have information about us the frameworks we used
and otehr technical feature sof the app
ie
"Our revolutionary app uses the XY api to accomplish ABC"
*/

import React from "react";
import "../../App.css";
function UserProfile() {
  return (
    <div className="main">
      <div className="UserHead" style={{ color: "white" }}>
        <h1>UserProfile</h1>
      </div>
      <div className="UserInfo"></div>
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

export default UserProfile;
