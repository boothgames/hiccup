import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSpring, animated } from 'react-spring';

import { useImagesContext } from '../../../../contexts/ImagesContext';

import { Rules, Task, Container } from './styles';
import { Button } from '../../../../../common/styles';
import { DropTarget } from 'react-drag-drop-container';

export default props => {
  const { productsToBuy, status, selectedIndex, reset } = props;
  const { images } = useImagesContext();

  const propsSelected = useSpring({
    from: { transform: 'scale(1)' },
    to: [{ transform: 'scale(1.1)' }, { transform: 'scale(1)' }],
  });

  function onHit(ev) {
    const element = <img src={ev.dragData} />;
    ReactDOM.render(element, document.getElementById(ev.target.parentElement.id));
  }

  return (
    <Container>
      {status !== 'playing' && (
        <Rules>
          {status === 'win' && <>Well done!</>}
          {status === 'fail' && 'Try one more time!'}
          {!status && 'Click on the logo and match them with their creators in 25 seconds!'}
          <Button onClick={reset}>New game!</Button>
        </Rules>
      )}

      <Task>
        {productsToBuy.map((item, i) => (
          <animated.div
            key={`p${i}`}
            className={`item`}
            style={item.selected && selectedIndex === i ? propsSelected : propsSelected}
          >
            <DropTarget
              targetKey="foo"
              onHit={onHit}
            >
              <div id={i}>
                {
                  i < 4 ?
                    <img src={images[item.name + '.png']} />
                    :
                    <img src={require('./line.png')} />

                }

              </div>
            </DropTarget>
          </animated.div>
        ))}
      </Task>
    </Container>
  );
};
