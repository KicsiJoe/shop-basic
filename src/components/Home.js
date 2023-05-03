import React from "react";
import main_pic from "../icon/flower_main.jpg";
import "../css/Home.css";
import Cards from "./Cards/Cards";

const Home = () => {
  return (
    <>
      <div className="full_pic">
        <img src={main_pic} alt="" />
        <div className="img_text">
          <p> Cosmeticals </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officia,
            minus molestias neque optio quidem reiciendis praesentium sit
            accusamus illum debitis?
          </p>
        </div>
      </div>
      <section className="main-container">
        <h1>HOME</h1>
        <div className="cards_container">
          <Cards />
        </div>
      </section>
      {/* <div className='full_pic'>
            sdfv
        </div> */}
    </>
  );
};

export default Home;
