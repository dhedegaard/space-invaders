import React from "react";
import Gameboard from "../components/Gameboard";
import styled from "styled-components";
import Layout from "../layout";

const GameboardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Index: React.FC = () => (
  <Layout>
    <GameboardContainer>
      <Gameboard />
    </GameboardContainer>
  </Layout>
);

export default Index;
