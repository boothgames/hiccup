import React from 'react';
import Page from './Page';
import { Link } from "react-router-dom";

export default function FifthGame(props) {
  return (
    <Page color="#cc99ff" background="#280051">
      <h1>5th</h1>
      <Link
        to={{
          pathname: "/",
          state: { prev: false }
        }}
      >
        back
      </Link>
    </Page>
  );
}