import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {PropTypes} from "prop-types";

const NavSection = styled.div`
  width: 10%;
  color: #fff;
  font-size: 10rem;

  @media screen and (max-width: 320px) {
    display: none;
  }

  @media screen and (min-height: 400px) {
    font-size: 5rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 5rem;
  }
  opacity: 0.7;
  padding: 1%;
  a,
  a:active,
  a:visited {
    text-decoration: none;
    color: #fff;
    transition: 0.1s all;
  }
  a:hover {
    color: #333;
  }
`;

const NavNext = styled(NavSection)`
  text-align: right;
`;

export const Nav = ({ type, to }) => {
  const link = (
    <Link to={to}>
      {type === "back" ? <>&larr;</> : <>&rarr;</>}
    </Link>
  );

  if (type === "back") return <NavSection>{link}</NavSection>;
  return <NavNext>{link}</NavNext>;
};

Nav.propTypes = {
type: PropTypes.string.isRequired,
to: PropTypes.string.isRequired
}

export default Nav;
