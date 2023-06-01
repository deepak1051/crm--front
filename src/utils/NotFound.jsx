import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div class="n-container">
      <div class="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div class="content">
        <h1 class="main-heading">This page is gone.</h1>
        <p className="n-p">
          ...maybe the page you're looking for is not found or you are not
          authenticated to see it.
        </p>
        <Link to="/">
          <button className="n-button">
            Back to home <i class="far fa-hand-point-right"></i>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
