import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Landing.css';

const Landing = props => {
  return (
    <div className="landing">
      <h1>Twttr Clne</h1>
      <h3>
        The light weight MERN stack Twitter like application built by Kevin
        Kabore
      </h3>
      <h4>Please sign in or sign up to continue</h4>
      <div>
        <Link to="/signup">Sign up</Link>
        <Link to="/signin">Sign in</Link>
      </div>
    </div>
  );
};

export default Landing;
