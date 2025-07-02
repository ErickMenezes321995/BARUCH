import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer/Footer";
import { useEffect } from "react";

function App() {
  const location = useLocation();

useEffect(() => {
  window.scrollTo(0, 0);
}, [location.pathname]);

const normalizedPath = location.pathname.toLowerCase().replace(/\/$/, "");

const hideHeaderFooterPaths = [
  "/bracket",
  "/cadastrotorcedor",
  "/loginpage",
  "/cadastrogamer",
  "/LiveMatchPage",
];

const hideHeaderFooter = hideHeaderFooterPaths.includes(normalizedPath);

  return (
    <Box minH="100vh" display="grid" gridTemplateRows="auto 1fr auto">
      {!hideHeaderFooter && <Header />}
      <Box
        marginTop={
          location.pathname === "/"
            ? {
                base: "-5.75em",
                md: "-5.75em",
                lg: "-8.25em",
              }
            : {}
        }
      >
        <Outlet />
      </Box>
      {!hideHeaderFooter && <Footer />}
    </Box>
  );
}

export default App;

