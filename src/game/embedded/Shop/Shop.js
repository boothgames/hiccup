import React, { useState, useEffect, useCallback } from 'react';

import Bag from './components/Bag/Bag';
import Items from './components/Items';
import Control from './components/Control';

import { Game } from '../../../common/styles';
import { GameContainer, ShopContainer } from './styles';

import { questions } from './config';

const Shop = props => {
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [status, setStatus] = useState(null); // playing, fail, win
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const setRandomItems = useCallback(() => {
    const randomNumber = 1 + Math.random() * (6 - 1);
    const productsToBuy = questions
      .map(item => {
        return Array.from({ length: 1 }).fill(item);
      })
      .reduce((acc, arr) => acc.concat(arr), [])
      .slice(randomNumber, randomNumber + 10)
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
    <div>
      <div class='logo'>
        <img src='https://www.thoughtworks.com/imgs/tw-logo.svg' />
      </div>
      <Game>
        <GameContainer>
          <ShopContainer>
            <Bag
              productsToBuy={productsToBuy}
              resetNextGame={resetNextGame}
              resetNewGame={resetNewGame}
              status={status}
              selectedIndex={selectedIndex}
            />

            <Control fail={fail} status={status} />
          </ShopContainer>

          <Items select={select} />
        </GameContainer>
      </Game>
    </div>
  );
};

export default Shop;
