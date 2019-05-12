import { BehaviorSubject } from 'rxjs';
import { AnimationFrame } from './AnimationFrame';
import { calculateVelocity } from 'utils/calculateVelocity';

export enum AccDirections {
  NONE = 'NONE',
  UP = 'UP',
  UP_RIGHT = 'UP_RIGHT',
  RIGHT = 'RIGHT',
  DOWN_RIGHT = 'DOWN_RIGHT',
  DOWN = 'DOWN',
  DOWN_LEFT = 'DOWN_LEFT',
  LEFT = 'LEFT',
  UP_LEFT = 'UP_LEFT',
}

export type PlayerProps = {
  x: number;
  y: number;
}

export type PlayerState = {
  xV: number;
  yV: number;
  slowDownRate: number;
  maxV: number;
  acc: number;
  accDirection: AccDirections;
}

export const createPlayer = (initialProps: PlayerProps) => {
  const state: PlayerState = {
    xV: 0,
    yV: 0,
    slowDownRate: 50, // px/sec
    maxV: 150,
    acc: 200, // px/sec
    accDirection: AccDirections.NONE,
  }

  const Player = new BehaviorSubject<PlayerProps>(initialProps);

  function recalculate(timeFromPrevFrame: number) {
    const { x, y } = Player.getValue();


    // Calculating velocity based on direction
    function calculateVelocityForDegree(degrees: number) {
      return calculateVelocity({
        xV: state.xV,
        yV: state.yV,
        maxV: state.maxV,
        acc: state.acc,
        timeFromPrevFrame,
        degrees,
      })
    }
    if (state.accDirection === AccDirections.UP) {
      const { xV, yV } = calculateVelocityForDegree(0);
      state.xV = xV;
      state.yV = yV;
    } else if (state.accDirection === AccDirections.UP_RIGHT) {
      const { xV, yV } = calculateVelocityForDegree(45);
      state.xV = xV;
      state.yV = yV;
    } else if (state.accDirection === AccDirections.RIGHT) {
      const { xV, yV } = calculateVelocityForDegree(90);
      state.xV = xV;
      state.yV = yV;
    } else if (state.accDirection === AccDirections.DOWN_RIGHT) {
      const { xV, yV } = calculateVelocityForDegree(135);
      state.xV = xV;
      state.yV = yV;
    } else if (state.accDirection === AccDirections.DOWN) {
      const { xV, yV } = calculateVelocityForDegree(180);
      state.xV = xV;
      state.yV = yV;
    } else if (state.accDirection === AccDirections.DOWN_LEFT) {
      const { xV, yV } = calculateVelocityForDegree(225);
      state.xV = xV;
      state.yV = yV;
    } else if (state.accDirection === AccDirections.LEFT) {
      const { xV, yV } = calculateVelocityForDegree(270);
      state.xV = xV;
      state.yV = yV;
    } else if (state.accDirection === AccDirections.UP_LEFT) {
      const { xV, yV } = calculateVelocityForDegree(315);
      state.xV = xV;
      state.yV = yV;
    }


    // Calculating new X position
    const newX = x + (state.xV * timeFromPrevFrame / 1000);
    
    // Calculating new Y position
    const newY = y + (state.yV * timeFromPrevFrame / 1000);

    // Calculating X Velocity (slowdown)
    const xVSlowDown = state.slowDownRate * timeFromPrevFrame / 1000;
    if (state.xV > 0) {
      if (state.xV > xVSlowDown) {
        state.xV = state.xV - xVSlowDown;
      } else {
        state.xV = 0;
      }
    } else if (state.xV < 0) {
      if (state.xV * -1 > xVSlowDown) {
        state.xV = state.xV + xVSlowDown;
      } else {
        state.xV = 0;
      }
    }


    // Calculating Y Velocity (slowdown)
    const yVSlowDown = state.slowDownRate * timeFromPrevFrame / 1000;
    if (state.yV > 0) {
      if (state.yV > yVSlowDown) {
        state.yV = state.yV - yVSlowDown;
      } else {
        state.yV = 0;
      }
    } else if (state.yV < 0) {
      if (state.yV * -1 > yVSlowDown) {
        state.yV = state.yV + yVSlowDown;
      } else {
        state.yV = 0;
      }
    }

    
    Player.next({ x: newX, y: newY });
  }

  function move(accDirection: AccDirections) {
    state.accDirection = accDirection;
  }

  AnimationFrame.subscribe((timeFromPrevFrame) => recalculate(timeFromPrevFrame));

  return {
    move,
    subscribe: (callback: (playerProps: PlayerProps) => void) => Player.subscribe(callback),
  };
}
