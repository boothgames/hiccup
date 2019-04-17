import React from "react";
import { Link } from "react-router-dom";
import Page from "./Page";

export default function LandingPage() {
  return (
    <Page>
      <Link
        to={{
          pathname: "/firstgame",
          state: { prev: true }
        }}
        className="nav__link"
      >
        VR
      </Link>
      <Link
        to={{
          pathname: "/secondgame",
          state: { prev: true }
        }}
        className="nav__link"
      >
        AR
      </Link>
      <Link
        to={{
          pathname: "/thirdgame",
          state: { prev: true }
        }}
        className="nav__link"
      >
        ML
      </Link>
      <Link
        to={{
          pathname: "/fourthgame",
          state: { prev: true }
        }}
        className="nav__link"
      >
        Smile
      </Link>
      <Link
        to={{
          pathname: "/fifthgame",
          state: { prev: true }
        }}
        className="nav__link"
      >
        Leap
      </Link>
    </Page>
  );
}
