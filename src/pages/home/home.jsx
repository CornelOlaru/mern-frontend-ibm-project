import React from "react";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <h1>Proiecte Colective 2024</h1>
      <Link to="/about">Frontend</Link>
    </div>
  );
};

export default Home;
