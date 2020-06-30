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
    if (currentElementID > 6) {
      ev.target.src = images[ev.dragData + '.png']
      const questionImage = document.getElementById(currentElementID - 6).children[0].alt
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
            style={propsSelected, i == 0 || i == 6 ? {
              border: 0,
              backgroundColor: 'white',
            } : {
                border: 'solid 1px #c8c8c8',
                backgroundColor: '#f8f8f8'
              }}
          >
            <DropTarget
              targetKey="foo"
              onHit={onHit}
            >
              <div id={i}>
                {
                  (i == 0 ? <img src={require('./companies.png')} /> :
                    (i == 6 ? <img src={require('./products.png')} /> :
                      (status == 'playing' || status == 'fail') && i < 6 ?
                        <img src={images[item.name + '.png']} alt={item.name} />
                        :
                        <img src={require('./line.png')} />))
                }
              </div>
            </DropTarget>
          </animated.div>
        ))}
      </Task>
    </Container >
  );
};
