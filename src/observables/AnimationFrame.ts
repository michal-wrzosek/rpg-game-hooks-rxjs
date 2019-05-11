import { of, animationFrameScheduler } from 'rxjs';
import { repeat, map } from 'rxjs/operators';

let isRunning = false;
let prevFrameTime: number;
export const AnimationFrame = of(0, animationFrameScheduler).pipe(
  repeat(),
  map(() => {

    // Set first frame time
    if (!isRunning) {
      prevFrameTime = +new Date();
      isRunning = true;
    }

    const currentFrameTime = +new Date();
    const timeFromPrevFrame = currentFrameTime - prevFrameTime;
    prevFrameTime = currentFrameTime;

    return timeFromPrevFrame;
  }),
)
