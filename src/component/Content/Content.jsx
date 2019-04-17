import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Content.scss';
import Landing from '../Landing/Landing';
import FirstGame from '../FirstGame/FirstGame';

const Content = () => (
  <main>
    <h1 className="heading">
      <span>Save the Server</span>
    </h1>

    <BrowserRouter>
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
                      <Route exact path="/" component={Landing} />
                      <Route path="/firstgame" component={FirstGame} />
                    </Switch>
                  )}
                />
              </CSSTransition>
            </TransitionGroup>
          );
        }}
      />
    </BrowserRouter>
  </main>
);

export default Content;
