import { useNavigate } from "react-router-dom";
function Summary() {
  const history = useNavigate();
  return (
    <div className="main" style={{ color: "white" }}>
      <h1>Total Fitness</h1>
      <strong> The Complete Fitness Application</strong>
      <h1>Access the page you are working on with the menu</h1>
      <div className="body">
        When You Start Working on Your page do the following
        <ol>
          <li>Pull the latest Version from git</li>
          <li>Create a branch titled with the page you are working on</li>
          <li>Make sure you are on that branch before you start working</li>
          <li>When you push make sure to add someone to review your request</li>
        </ol>
      </div>
      <div class="hero" id="home">
        <div class="hero__container">
          <h1 class="hero__heading">
            Make every bite count<span> towards a healthier you</span>
          </h1>
          <p class="hero__description">Unlimited Possibilities</p>
          <button
            class="main__btn"
            onClick={() => {
              history("/about");
            }}
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
export default Summary;
