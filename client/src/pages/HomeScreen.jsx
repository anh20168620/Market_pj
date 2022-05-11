import React from "react";
import Header from "../components/Header";
import Banner from "../assets/images/banner.png";
import "../assets/css/homeScreen.css";
function HomeScreen() {
  return (
    <>
      <Header />
      <section className="Banner">
        <div className="container">
          <img src={Banner} alt="" className="banner_img" />
        </div>
      </section>
    </>
  );
}

export default HomeScreen;
