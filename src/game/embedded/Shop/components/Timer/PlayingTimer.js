import React from "react";
import { useSpring, animated } from "react-spring";
import styled from "styled-components";

import { TimerCss, TimerThreadCss } from "./styles";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const Timer = styled(animated.div)`${TimerCss}`;
const TimerThread = styled.div`${TimerThreadCss}`;

const PlayingTimer = props => {
  const propsTimer = useSpring({
    from: { number: 25, transform: "scale(1)" },
    to: [{ number: 0, transform: "scale(1.4)", config: { duration: 25000 } }],
    number: 0,
    onRest: props.onRestHandler,
    reset: props.reset
  });

  let propsTimer2 = {
    ...propsTimer,
    text: propsTimer.number.interpolate(n => {
      return n.toFixed();
    })
  };

  return (
    <CountdownCircleTimer
      isPlaying
      duration={25}
      size={100}
      fontSize='200px'
      colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  )
};

export { PlayingTimer }
