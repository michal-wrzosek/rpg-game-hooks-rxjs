import React from "react";
import styled from 'styled-components';

import { Canvas } from "containers/Canvas/Canvas";

const HintText = styled.div`
  text-align: center;
  padding: 10px;
`;
const Wrapper = styled.div`
  padding: 20px;
`;

function App() {
  return (
    <Wrapper>
      <Canvas />
      <HintText>Use Arrow Keys to move that black dot</HintText>
    </Wrapper>
  );
}

export default App;
