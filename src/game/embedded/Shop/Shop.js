import React, { useState, useEffect, useCallback } from 'react';

import Bag from './components/Bag/Bag';
import Items from './components/Items';
import { Nav, Roof } from '../../../common/styles';
import Control from './components/Control';

import { Game } from '../../../common/styles';
import { GameContainer, ShopContainer } from './styles';

import { questions } from './config';
import bg from './images/bg.png';

const Shop = props => {
  const [productsToBuy, setProductsToBuy] = useState([]);
  const [status, setStatus] = useState(null); // playing, fail, win
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const setRandomItems = useCallback(() => {
    const randomNumber = 1 + Math.random() * (8 - 1);
    const productsToBuy = questions
      .map(item => {
        return Array.from({ length: 1 }).fill(item);
      })
      .reduce((acc, arr) => acc.concat(arr), [])
      .slice(randomNumber, randomNumber + 8)
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

  const reset = () => {
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
    <Game size="cover">
      <Nav type="back" to="/" />
      <GameContainer>
        <Roof />

        <ShopContainer>
          <Bag
            productsToBuy={productsToBuy}
            reset={reset}
            status={status}
            selectedIndex={selectedIndex}
          />

          <Control fail={fail} status={status} />
        </ShopContainer>

        <Items select={select} />
      </GameContainer>

      <Nav type="next" to="/puzzle" />
    </Game>
  );
};

export default Shop;
