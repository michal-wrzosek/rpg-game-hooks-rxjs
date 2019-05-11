import React from 'react';
import styled from 'styled-components';

import { createPlayer } from 'observables/Player';
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
          player.moveDown();
        }

        if (keys.includes(KEYS.ARROW_UP)) {
          player.moveUp();
        }

        if (keys.includes(KEYS.ARROW_RIGHT)) {
          player.moveRight();
        }

        if (keys.includes(KEYS.ARROW_LEFT)) {
          player.moveLeft();
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
