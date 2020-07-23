import React, { useState, useEffect, useCallback } from 'react';

import { Container } from 'react-bootstrap';
import Bag from './components/Bag/Bag';
import Items from './components/Items';
import Control from './components/Control';

import { questions } from './config';

const Shop = props => {
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [status, setStatus] = useState('playing'); // playing, fail, win
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const {actualAnswers} = props;
  const setRandomItems = useCallback(() => {

    function shuffle(array) {
      const updatedArray = array;
      let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        updatedArray[currentIndex] = array[randomIndex];
        updatedArray[randomIndex] = temporaryValue;
      }
      return updatedArray;
    }

    const shuffledQuestions = shuffle(questions);
    const productsBuy = shuffledQuestions
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
    setProductsToBuy(productsBuy);
  }, []);

  useEffect(() => {
    setRandomItems();
  }, [setRandomItems]);

  const win = () => {
    setStatus('win');
  };

  const resetNextGame = () => {
    props.playSnakeGame();
  };

  const displayScore = () => {
    props.displayScore();
  };

  const resetNewGame = () => {
    setStatus('playing');
    setRandomItems();
  };

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
      <div className="logo-box">
        <Bag
          productsToBuy={productsToBuy}
          resetNextGame={resetNextGame}
          resetNewGame={resetNewGame}
          status={status}
          selectedIndex={selectedIndex}
          actualAnswers={actualAnswers}
        />
      </div>

      <Control fail={() => displayScore()} status={status}/>
      <Items select={select}/>
    </Container>
  );
};

export default Shop;
