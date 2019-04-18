import React from 'react';
import Page from '../common/Page';
import { Link } from "react-router-dom";

export default function ArGame(props) {
  return (
    <Page color="#cc99ff" background="#280051">
      <h1>2nd</h1>
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