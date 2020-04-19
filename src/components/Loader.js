import React from 'react';

const Loader = (props) => {
  return (
    <div className={props.visibility ? 'spinner': 'spinner hide'}>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
      <div className="rect5"></div>
    </div>
  );
}

export default Loader;


