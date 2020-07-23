import React from 'react';
import styled from 'styled-components';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import {PropTypes} from 'prop-types';

const Control = styled.div`
  float: right;
`;

export default ({ fail }) => {

  return (
    <Control>
      <div style={{ minHeight: '40%', width: '100%', fontSize: '30px', margin: '10px' }}>
        <CountdownCircleTimer
          isPlaying
          onComplete={() => {
            fail();
            return [false, 1500];
          }}
          duration={25}
          size={100}
          fontSize="20px"
          colors={[['#f78f31']]}
        >
          {({ remainingTime }) => remainingTime}
        </CountdownCircleTimer>
      </div>
    </Control>
  );
};

Control.propTypes = {
  fail: PropTypes.function
}