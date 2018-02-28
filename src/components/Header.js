import React, { Component } from 'react';
import '../sass/index.scss';
import audi from '../../public/images/audi.png';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="wrapper">
          <h1>hello</h1>
          <img src={audi} alt="Audi" />
        </div>
      </header>
    );
  }
}

export default Header;
