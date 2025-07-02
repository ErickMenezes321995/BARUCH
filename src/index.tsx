import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./utils/theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

console.log("Desenvolvido por:");
console.log(
  "Francely Nataly - Designer (https://www.linkedin.com/in/francelynatalyc/)"
);
console.log(
  "Gabriel Gambarra - Front-End (https://www.linkedin.com/in/gabrielgambarra/)"
);

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
