import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa';
import { GiSaberToothedCatHead } from 'react-icons/gi';
import { Link } from 'react-router-dom';

const WebsiteHomepage = () => {
  const [quote, setQuote] = useState('');

  const fetchQuote = async () => {
    const { data } = await axios.get('https://type.fit/api/quotes');
    const randomNumber = Math.floor(Math.random() * 1643) + 1;
    setQuote(data[randomNumber]);
  };
  useEffect(() => {
    fetchQuote();
  }, []);
  return (
    <div className="hero">
      <div className="img-container">
        <h1>Welcome to Pacifence Solutions CRM</h1>
        {/* <img src={heroImg} alt='' /> */}
        <Link to="/admin-login" className="login-btns">
          admin login
        </Link>
        <Link to="/employee-login" className="login-btns">
          employee login
        </Link>
      </div>
      <div>
        <div class="quote-container" id="quote-container">
          <div class="quote-text">
            <FaQuoteLeft style={{ fontSize: '1.6rem', marginRight: '10px' }} />
            <span id="quote">{quote.text}</span>
          </div>

          <div class="quote-author">
            <span id="author">
              <h2>{quote.author ? `${quote.author}` : 'Unknown'}</h2>
            </span>
          </div>

          <div class="button-container">
            <GiSaberToothedCatHead style={{ fontSize: '1.6rem' }} />
            <button class="add button" onClick={() => fetchQuote()}>
              Click Me 😊
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      WebsiteHomepage
      <br />
      <Link to="/admin-login">admin login</Link>
      <Link to="/employee-login">employee login</Link>
    </div>
  );
};

export default WebsiteHomepage;
