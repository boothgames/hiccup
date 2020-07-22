import React from 'react';
import { animated, useSpring } from 'react-spring';
import styled from 'styled-components';

import { TimerCss, Bum } from './styles';

const Timer = styled(animated.div)`
  ${TimerCss}
`;

const TimerDefault = ({ status }) => {
  return (
    <>
      {status === 'fail' ? <Bum /> : null}

      <Timer>25</Timer>
    </>
  );
};

export { TimerDefault as Timer };
