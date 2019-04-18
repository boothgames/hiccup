import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import logo from '../asserts/img/TW-logo.png'

function Page({
  children,
  color,
  background,
  location: {
    state,
  },
}) {
  const cx = classNames({
    page: true,
    'page--prev': state && state.prev,
  })
  return (
    <section
      className={cx}
      style={{
        color,
        background,
      }}
    >
      <div className="page__inner">
        {children}
        <img className="logo" src={logo} alt='logo'/>
      </div>
    </section>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
};

Page.defaultProps = {
  color: '#444',
  background: '#fff',
};

export default withRouter(Page);