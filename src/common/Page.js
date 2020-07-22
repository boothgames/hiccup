import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';

function Page({ children, color, background, location: { state } }) {
  const cx = classNames({ page: true, 'page--prev': state && state.prev });

  return (
    <section className={cx} style={{ color, background }}>
      <div className="page__inner">{children}</div>
      {/* <img className="logo" src={logo} alt='logo' /> */}
    </section>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  background: PropTypes.string,
  location: PropTypes.shape({ state: PropTypes.object }),
};

Page.defaultProps = {
  color: '#444',
  background: '#fff',
  location: { state: {} },
};

export default withRouter(Page);
