import React from 'react';
import styled from 'styled-components';

import { createPlayer, AccDirections } from 'observables/Player';
import { keysPressed, KEYS } from 'observables/KeysPressed';

const CanvasStyled = styled.canvas`
  background: #eee;
  display: block;
  margin: 0 auto;
`;

export const Canvas = () => {
  const ref = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      const player = createPlayer({ x: 10, y: 10 });
      

      keysPressed.subscribe((keys) => {
        if (keys.includes(KEYS.ARROW_DOWN)) {
          player.move(AccDirections.DOWN);
        }

        if (keys.includes(KEYS.ARROW_UP)) {
          player.move(AccDirections.UP);
        }

        if (keys.includes(KEYS.ARROW_RIGHT)) {
          player.move(AccDirections.RIGHT);
        }

        if (keys.includes(KEYS.ARROW_LEFT)) {
          player.move(AccDirections.LEFT);
        }

        if (keys.length === 0) {
          player.move(AccDirections.NONE);
        }
      });

      const canvas = ref.current;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        player.subscribe(({ x, y }) => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillRect(x, y, 5, 5);
        })
      }
    }
  }, []);

  return (
    <CanvasStyled ref={ref} width="480" height="320" />
  )
};
