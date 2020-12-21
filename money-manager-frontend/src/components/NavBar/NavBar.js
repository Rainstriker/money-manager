import React, { useState } from 'react';
import Setting from '../Setting/Setting';

const NavBar = props => {
  const changeTool = () => {
    if (window.location.pathname === '/manage') {
      return (
        <div style={{width: '30vh', display: 'flex', justifyContent: 'flex-end'}}>
          <p style={{fontSize: 14, fontFamily: 'Roboto', paddingRight: 15 }}>{props.name}</p>
          <Setting name={props.name} setRole={props.setRole}/>
        </div>
      );
    } else {
      return (
        <p>
            <a style={{ color: 'black', fontSize: 14, fontFamily: 'Roboto', margin: 'auto' }}
              onClick={props.onClick}>
              Login
          </a>
        </p>
      );
    }
  }

  return (
    <>
      <nav>
        <div id='subnav'>
          <h1 id='logo'>Money Manager</h1>
          {changeTool()}
        </div>
      </nav>
    </>
  );
}

export default NavBar;