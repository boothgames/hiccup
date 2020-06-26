import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

import { useImagesContext } from '../../../../contexts/ImagesContext';

import { Rules, Task, Container } from './styles';
import { Button } from '../../../../../common/styles';
import { DropTarget } from 'react-drag-drop-container';

var actualAnswers = {};
const expectedAnswers = {
  "airbnb": "airbnb",
  "facebook": "facebook",
  "apple": "apple",
  "atlassian": "atlassian",
  "jetbrains": "jetbrains",
  "hashicorp": "hashicorp",
  "microsoft": "microsoft",
  "netflix": "netflix",
  "redhat": "redhat",
  "sunmicrosystems": "sunmicrosystems",
  "twitter": "twitter",
  "vmware": "vmware",
  "soundcloud": "soundcloud",
  "thoughtworks": "thoughtworks",
  "nitobi": "nitobi",
  "lightbend": "lightbend",
}

export default props => {
  const { productsToBuy, status, selectedIndex, reset } = props;
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

  function calculateScore() {
    Object.keys(actualAnswers).map(key => {
      if (expectedAnswers[key] == actualAnswers[key]) {
        score++;
      }
    })
    actualAnswers = {};
    return score;
  }

  return (
    <Container>
      {status !== 'playing' && (
        <Rules>
          {status === 'win' && <>Well done! Your score is{calculateScore()} </>}
          {status === 'fail' && <>Try one more time! Your score is { calculateScore()}</>}
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
                  i < 5 ?
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
