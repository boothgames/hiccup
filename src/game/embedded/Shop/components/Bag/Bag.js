/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { useSpring, animated } from 'react-spring';

import { DropTarget } from 'react-drag-drop-container';
import {PropTypes} from 'prop-types';
import { useImagesContext } from '../../../../contexts/ImagesContext';

import { Task, Container } from './styles';

const products = require('./products.png');
const companies = require('./companies.png');
const line = require('./line.png');

export default ({ productsToBuy, status, actualAnswers }) => {
  const { images } = useImagesContext();
  const propsSelected = useSpring({
    from: { transform: 'scale(1)' },
    to: [{ transform: 'scale(1.1)' }, { transform: 'scale(1)' }],
  });

  function onHit(ev) {
    const currentElementID = ev.target.parentElement.id;
    if (currentElementID > 6) {
      // eslint-disable-next-line no-param-reassign
      ev.target.src = images[`${ev.dragData  }.png`];
      const questionImage = document.getElementById(currentElementID - 6).children[0].alt;
      // eslint-disable-next-line no-param-reassign
      actualAnswers[questionImage] = ev.dragData;
    }
  }

  return (
    <Container>
      <Task>
        {productsToBuy.map((item, i) => (
          <animated.div
            key={`p${i}`}
            className="item"
            style={
              (propsSelected,
              i === 0 || i === 6
                ? {
                    border: 0,
                    backgroundColor: 'white',
                  }
                : {
                    border: 'solid 1px #c8c8c8',
                    backgroundColor: '#f8f8f8',
                  })
            }
          >
            <DropTarget targetKey="foo" onHit={onHit}>
              <div id={i}>
                {i === 0 ? (
                  <img src={products} alt=""/>
                ) : i === 6 ? (
                  <img src={companies} alt=""/>
                ) : (status === 'playing' || status === 'fail') && i < 6 ? (
                  <img src={images[`${item.name  }.png`]} alt={item.name}/>
                ) : (
                  <img src={line} alt=""/>
                )}
              </div>
            </DropTarget>
          </animated.div>
        ))}
      </Task>
    </Container>
  );
};
