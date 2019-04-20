import _ from "lodash";
import Stopwatch from "timer-stopwatch";

export const countDownTimer = ({tick = _.noop, completed = _.noop, duration = 3000}) => {
  const timer = new Stopwatch(duration, {refreshRateMS: 1000});
  timer.onTime(tick);
  timer.onDone(completed);
  timer.start();
  return timer;
};