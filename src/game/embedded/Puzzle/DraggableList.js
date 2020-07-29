// Original: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list

import React, { useRef } from 'react';
import clamp from 'lodash-es/clamp';
import swap from 'lodash-move';
import { useDrag } from 'react-use-gesture';
import { useSprings, animated } from 'react-spring';
import './styles.css';
import Control from '../Shop/components/Control';

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? {
        y: curIndex * 60 + y,
        scale: 1.1,
        zIndex: '1',
        shadow: 15,
        immediate: n => n === 'y' || n === 'zIndex',
      }
    : { y: order.indexOf(index) * 60, scale: 1, zIndex: '0', shadow: 1, immediate: false };

export default function DraggableList({ items, callBack, updateOrder }) {
  const order = useRef(items.map((_, index) => index));
  const duration = 90;
  const [springs, setSprings] = useSprings(items.length, fn(order.current)); 
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(Math.round((curIndex * 60 + y) / 60), 0, items.length - 1);
    const newOrder = swap(order.current, curIndex, curRow);
    setSprings(fn(newOrder, down, originalIndex, curIndex, y));
    if (!down) {
      order.current = newOrder;
    }
    callBack(order);
  });
  return (
    <div>
      <div className="listAndTimer" style={{ height: items.length * 60, maxHeight: '75%' }}>
        <div className="content" style={{ height: items.length * 60, maxHeight: '100%' }}>
          <div className="content" style={{overflowY: 'scroll', height: items.length * 60, maxHeight: '100%' }}>
            {springs.map(({ zIndex, shadow, y, scale }, i) => (
              <animated.div
                {...bind(i)}
              // eslint-disable-next-line react/no-array-index-key
                key={i}
                style={{
                zIndex,
                boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
                y,
                scale,
              }}
                id={items[i].key}
              >
                {items[i].value}
              </animated.div>
          ))}
          </div>
        </div>
        <Control duration={duration} fail={() => updateOrder(order)} status="playing"/>
      </div>
    </div>
  );
}
