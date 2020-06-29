import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { useImagesContext } from '../../../../contexts/ImagesContext';

import { Rules, Task, Container } from './styles';
import { Button } from '../../../../../common/styles';
import { DropTarget } from 'react-drag-drop-container';

export default props => {
  const { productsToBuy, status, selectedIndex, resetNewGame, resetNextGame, actualAnswers } = props;
  const { images } = useImagesContext();
  var score = 0;

  const propsSelected = useSpring({
    from: { transform: 'scale(1)' },
    to: [{ transform: 'scale(1.1)' }, { transform: 'scale(1)' }],
  });

  function onHit(ev) {
    const currentElementID = ev.target.parentElement.id
    if (currentElementID > 4) {
      ev.target.src = images[ev.dragData + '.png']
      const questionImage = document.getElementById(currentElementID - 5).children[0].alt
      actualAnswers[questionImage] = ev.dragData
    }
  }

  return (
    <Container>
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
                  (status == 'playing' || status == 'fail') && i < 5 ?
                    <img src={images[item.name + '.png']} alt={item.name} />
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
