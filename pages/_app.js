import React from "react";
import { ThemeProvider } from "theme-ui";
import theme from "../components/theme";
import Nav from "../components/nav";
import Meta from "react-document-meta";
import Footer from "../components/footer";
import { Flex } from "rebass";

const meta = {
  title: `COVID19 Registry`,
  description: "description",
  "og:title": "Global COVID19 Registry",
  "og:image": "",
  meta: {
    charset: "utf-8",
    name: {
      keywords:
        "covid-19,covid19,covid registry,plasma donation,covid19 donate,corona registry,corona virus registry"
    }
  }
};
export default ({ Component, props }) => (
  <ThemeProvider theme={theme}>
    <Flex flexDirection="column" minHeight="100vh">
      <Meta {...meta} />
      <Nav bg="muted" />
      <Component {...props} />
      <Footer />
    </Flex>
  </ThemeProvider>
);
