import React from "react";
import { CssBaseline, Container } from "@material-ui/core";
import { Provider } from "react-redux";
import { store } from "../game/store";
import Helmet from "react-helmet";

const Layout: React.FC = props => (
  <>
    <CssBaseline />
    <Helmet title="Space invaders" defer={false}>
      <html lang="en" />
      <meta name="description" content="Space Invaders, for the browser" />
    </Helmet>
    <Provider store={store}>
      <Container maxWidth="lg">{props.children}</Container>
    </Provider>
  </>
);

export default Layout;
