import React from 'react';
import { render } from 'react-dom';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './style.css';

import LandingPage from './dashboard/LandingPage';
import VrGame from './games/VrGame';
import ArGame from './games/ArGame';
import SmileIot from './games/SmileIot';
import TicTac from './games/TitTac';
import LeapMotion from './games/LeapMotion';
import Error404 from './Error404';
import Qa from './games/Qa';
import GameLandingPage from './dashboard/GameLandingPAge';
import Instruction from './dashboard/Instruction';

// Does the user's browser support the HTML5 history API?
// If the user's browser doesn't support the HTML5 history API then we
// will force full page refreshes on each page change.
const supportsHistory = 'pushState' in window.history;

const App = () => (
  <BrowserRouter forceRefresh={!supportsHistory}>
    <main>
      <Route
        render={({ location }) => {
          const { pathname } = location;
          return (
            <TransitionGroup>
              <CSSTransition
                key={pathname}
                classNames="page"
                timeout={{
                  enter: 1000,
                  exit: 1000,
                }}
              >
                <Route
                  location={location}
                  render={() => (
                    <Switch>
                      <Route
                        exact
                        path="/"
                        component={LandingPage}
                      />
                      <Route
                        path="/vr"
                        component={VrGame}
                      />
                      <Route
                        path="/ar"
                        component={ArGame}
                      />
                      <Route
                        path="/iot"
                        component={SmileIot}
                      />
                      <Route
                        path="/tictac"
                        component={TicTac}
                      />
                      <Route
                        path="/leapmotion"
                        component={LeapMotion}
                      />
                      <Route
                        path="/quiz"
                        component={Qa}
                      />
                       <Route
                        path="/game"
                        component={GameLandingPage}
                      />
                      <Route
                        path="/info"
                        component={Instruction}
                      />
                      <Route
                        component={Error404}
                      />
                    </Switch>
                  )}
                />
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </main>

  </BrowserRouter>
);

render(<App />, document.getElementById('root'));
