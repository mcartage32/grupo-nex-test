import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { NotificationProvider } from "./components/NotificationCustom.tsx";
import { ConfigProvider } from "antd";
import esES from "antd/locale/es_ES";
import Router from "./router/index.tsx";
import client from "./graphql/apolloClient";
import "./main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NotificationProvider>
      <ApolloProvider client={client}>
        <ConfigProvider locale={esES}>
          <Router />
        </ConfigProvider>
      </ApolloProvider>
    </NotificationProvider>
  </StrictMode>,
);
