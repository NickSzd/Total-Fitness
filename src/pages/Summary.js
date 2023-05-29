import React from "react";
import { useNavigate } from "react-router-dom";

function Summary() {
  const history = useNavigate();
  return (
    <div className="main" style={{ color: "white" }}>
      <link
      href="https://use.fontawesome.com/releases/v5.14.0/css/all.css"
      integrity="sha384-HzLeBuhoNPvSl5KYnjx0BT+WB0QEEqLprO+NBkkk5gbc67FTaL7XIGa2w1L0Xbgc"
      crossorigin="anonymous"
      />
      {/* --Home Section-- */}
      <div class="hero" id="home">
        <div class="hero__container">
          <h1 class="hero__heading">
            Make every bite count<span> towards a healthier you</span>
          </h1>
          <p class="hero__description">Unlimited Possibilities</p>
          <button
            class="main__btn"
            onClick={() => {
              history("/");
            }}
          >
            Explore
          </button>
        </div>
      </div>
      {/* --About Section-- */}
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
            <button
              className="main__btn"
              onClick={() => {
                history("/Register");
              }}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
      {/* <!-- Services Section --> */}
      <div class="services" id="feature">
      <h1>What we offer for you?</h1>
      <div class="services__wrapper">
        <div class="services__card">
          <h2>Exercise logging</h2>
          <p>Track your daily workout progress with no hassle</p>
          <div class="services__btn"><button>Get Started</button></div>
        </div>
        <div class="services__card">
          <h2>Nutrition Tracking</h2>
          <p>Visualize dietary intake over a time period</p>
          <div class="services__btn"><button>Get Started</button></div>
        </div>
        <div class="services__card">
          <h2>Providing Recommendations</h2>
          <p>Obtain peer suggestions based on health plan?</p>
          <div class="services__btn"><button>Get Started</button></div>
        </div>
      </div>
      </div>
      {/* --Footer Section-- */}
      <div class="footer__container" id="contact">
      <div class="footer__links">
        <div class="footer__link--wrapper">
          <div class="footer__link--items">
            <h2>About Us</h2>
            <a href="/sign__up">How it works</a> <a href="/">Testimonials</a>
            <a href="/">Careers</a> <a href="/">Terms of Service</a>
          </div>
          <div class="footer__link--items">
            <h2>Contact Us</h2>
            <a href="/">Contact</a> <a href="/">Support</a>
            <a href="/">Destinations</a>
          </div>
        </div>
        <div class="footer__link--wrapper">
          <div class="footer__link--items">
            <h2>Social Media</h2>
            <a href="/">Instagram</a> <a href="/">Facebook</a>
            <a href="/">Youtube</a> <a href="/">Twitter</a>
          </div>
        </div>
      </div>
      <section class="social__media">
        <div class="social__media--wrap">
          <div class="footer__logo">
            <a href="/" id="footer__logo">COLOR</a>
          </div>
          <p class="website__rights">© COLOR 2020. All rights reserved</p>
          <div class="social__icons">
            <a href="/" class="social__icon--link" target="_blank"
              ><i class="fab fa-facebook"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-instagram"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-youtube"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-linkedin"></i
            ></a>
            <a href="/" class="social__icon--link"
              ><i class="fab fa-twitter"></i
            ></a>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
}
export default Summary;
