import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { Provider } from "react-redux";
import { store } from "../game/store";

const Layout: React.FC = props => (
  <>
    <CssBaseline />
    <Provider store={store}>
      <Container maxWidth="lg">{props.children}</Container>
    </Provider>
  </>
);

export default Layout;
