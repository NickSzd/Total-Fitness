import React from "react";


function Summary() {
  return (
    <div className="main" style={{ color: "white" }}>
      <div class="hero" id="home">
        <div class="hero__container">
          <h1 class="hero__heading">
            Make every bite count<span> towards a healthier you</span>
          </h1>
          <p class="hero__description">Unlimited Possibilities</p>
          <button class="main__btn">
            <a href="\About">Explore</a>
          </button>
        </div>
      </div>
      <div className="main" id="about">
        <div className="main__container">
          <div className="main__img--container">
            <div className="main__img--card">
              <i className="fas fa-layer-group"></i>
            </div>
          </div>
          <div className="main__content">
            <h1>What do we do?</h1>
            <h2>We help people reach their fitness goal</h2>
            <p>
              Login and start tracking your daily nutrition and workout plan for
              greater rewards for yourself.
            </p>
            <button className="main__btn">
              <a href="/Register">Sign up</a>
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Summary;
