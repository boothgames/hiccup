import React from 'react';
import { animated } from 'react-spring';
import styled from 'styled-components';
import {PropTypes} from 'prop-types';

import { TimerCss, Bum } from './styles';

const TimerDiv = styled(animated.div)`
  ${TimerCss}
`;

const Timer = ({ status }) => {
  return (
    <>
      {status === 'fail' ? <Bum/> : null}

      <TimerDiv>25</TimerDiv>
    </>
  );
};

export default Timer;

Timer.propTypes = {
  status: PropTypes.string.isRequired
}