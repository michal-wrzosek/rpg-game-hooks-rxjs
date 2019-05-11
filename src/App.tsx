import React from "react";
import styled from 'styled-components';

import { Canvas } from "containers/Canvas/Canvas";

const Wrapper = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <Wrapper>
      <Canvas />
      <div>Use Arrow Keys to move black dot</div>
    </Wrapper>
  );
}

export default App;
