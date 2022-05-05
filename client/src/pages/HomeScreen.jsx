import React from "react";
import Banner from "../assets/images/banner.png";
import "../assets/css/homeScreen.css";
function HomeScreen() {
  return (
    <section className="Banner">
      <div className="container">
        <img src={Banner} alt="" className="banner_img" />
      </div>
    </section>
  );
}

export default HomeScreen;
