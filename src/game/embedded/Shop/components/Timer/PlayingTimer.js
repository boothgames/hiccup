import React from 'react';

import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const PlayingTimer = () => {

  return (
    <CountdownCircleTimer isPlaying duration={25} size={100} fontSize="20px" colors={[['#f78f31']]}>
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};

export default PlayingTimer ;
