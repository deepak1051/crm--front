import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div class="n-container">
      <div class="gif">
        <img src="https://i.postimg.cc/2yrFyxKv/giphy.gif" alt="gif_ing" />
      </div>
      <div class="content">
        <h1 class="main-heading">Data Fetching Error...</h1>
        <p className="n-p">
          ...maybe the page you're looking for is not available right now
        </p>
        {/* <Link to="/">
          <button className="n-button">
            Back to home <i class="far fa-hand-point-right"></i>
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default ErrorPage;
