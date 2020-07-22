import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import { TimerCss, TimerThreadCss } from './styles';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const PlayingTimer = props => {
  const propsTimer = useSpring({
    from: { number: 25, transform: 'scale(1)' },
    to: [{ number: 0, transform: 'scale(1.4)', config: { duration: 25000 } }],
    number: 0,
    onRest: props.onRestHandler,
    reset: props.reset,
  });

  return (
    <CountdownCircleTimer isPlaying duration={25} size={100} fontSize="20px" colors={[['#f78f31']]}>
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};

export { PlayingTimer };
