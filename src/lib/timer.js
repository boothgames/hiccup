import _ from 'lodash';
import Stopwatch from 'timer-stopwatch';

const countDownTimer = ({ tick = _.noop, completed = _.noop, duration = 3000, refresh = 1000 }) => {
  const timer = new Stopwatch(duration, { refreshRateMS: refresh });
  timer.onTime(tick);
  timer.onDone(completed);
  timer.start();
  return timer;
};

export default countDownTimer;