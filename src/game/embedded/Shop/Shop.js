import React, { useState, useEffect, useCallback } from 'react';

import Bag from './components/Bag/Bag';
import Items from './components/Items';
import Control from './components/Control';

import { questions } from './config';
import { Container } from 'react-bootstrap';

const Shop = props => {
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [status, setStatus] = useState('playing'); // playing, fail, win
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const setRandomItems = useCallback(() => {
    var shuffledQuestions = shuffle(questions);
    const productsToBuy = shuffledQuestions
      .map(item => {
        return Array.from({ length: 1 }).fill(item);
      })
      .reduce((acc, arr) => acc.concat(arr), [])
      .slice(0, 12)
      .reduce((acc, val) => {
        const newItem = {
          selected: false,
          name: val,
        };
        return [...acc, newItem];
      }, []);
    setProductsToBuy(productsToBuy);
  }, []);

  useEffect(() => {
    setRandomItems();
  }, [setRandomItems]);

  const fail = () => {
    setStatus('fail');
  };

  const win = () => {
    setStatus('win');
  };

  const resetNextGame = () => {
    props.playSnakeGame();
  };

  const resetNewGame = () => {
    setStatus('playing');
    setRandomItems();
  };

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex); currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const select = e => {
    if (status !== 'playing') return;
    const foundIndex = productsToBuy.findIndex(
      item => e.target.alt === item.name && !item.selected,
    );
    if (foundIndex !== -1) {
      const newProductsToBuy = [...productsToBuy];
      newProductsToBuy[foundIndex] = {
        ...productsToBuy[foundIndex],
        selected: true,
      };
      setProductsToBuy(newProductsToBuy);
      setSelectedIndex(foundIndex);
      if (newProductsToBuy.findIndex(item => item.selected === false) === -1) {
        win();
      }
    }
  };

  return (
    <Container>
      <div class='logo-box'>
        <Bag
          productsToBuy={productsToBuy}
          resetNextGame={resetNextGame}
          resetNewGame={resetNewGame}
          status={status}
          selectedIndex={selectedIndex}
          displayScore={props.displayScore}
          actualAnswers={props.actualAnswers}
        />
      </div>

      <Control fail={props.displayScore} status={status} />
      <Items select={select} />
    </Container >
  );
};

export default Shop;
