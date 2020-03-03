import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import Gameboard from "../components/Gameboard";
import styled from "styled-components";
import { Provider } from "react-redux";
import { store } from "../game/store";

const GameboardContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Index: React.FC = () => (
  <>
    <CssBaseline />
    <Container maxWidth="lg">
      <GameboardContainer>
        <Provider store={store}>
          <Gameboard />
        </Provider>
      </GameboardContainer>
    </Container>
  </>
);

export default Index;
