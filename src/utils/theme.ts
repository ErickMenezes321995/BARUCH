import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { Button } from "./chakraui-customs";

export const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: "yellow", components: ["Button"] }),
  {
    components: {
      Button,
    },
    styles: {
      global: {
        body: {
          bg: "neutral.white",
          color: "grey.700",
        },
        section: {
          width: "100%",
          bg: "neutral.white",
          padding: {
            base: "2em",
            sm: "2em",
            md: "2em 0.85em",
            lg: "3.5em 4.5em",
            "2xl": "3.5em 7.5em",
          },
        },
        input: {
          bg: "neutral.white",
          color: "neutral.black",
          border: "1px solid #C2C2C2 !important",
          borderRadius: "0.5em",
          padding: "0.5em 1em",
          width: "50%",
          marginBottom: "1em",
          _focus: {
            outline: "none",
            border: "1px solid #42817B !important",
            boxShadow: "0px 0px 0px 1px rgba(194, 194, 194, 0.45)",
          },
          _hover: {
            backgroundColor: "#FAFAFA",
          },
        },
        textarea: {
          bg: "neutral.white",
          color: "neutral.black",
          border: "1px solid #C2C2C2 !important",
          borderRadius: "0.5em",
          padding: "0.5em 1em",
          marginBottom: "1em",
          resize: "vertical",
          _focus: {
            outline: "none",
            border: "1px solid #42817B !important",
            boxShadow: "0px 0px 0px 1px rgba(194, 194, 194, 0.45)",
          },
          _hover: {
            backgroundColor: "#FAFAFA",
          },
        },
      },
    },
    fonts: {
      heading: `'Montserrat', sans-serif`,
      body: `'Inter', sans-serif`,
    },
    colors: {
      neutral: {
        black: "#000000",
        white: "#FFFFFF",
        error: "#C5292A",
      },
      brand: {
        100: "#C7D9D7",
        200: "#9ABBB8",
        300: "#6D9D99",
        400: "#6D9D99",
        500: "#42817B",
        600: "#17645C",
        700: "#00544D",
        800: "#00463F",
        900: "#00211E",
      },
      grey: {
        100: "#EDEEED",
        200: "#DBDBDB",
        300: "#C4C5C4",
        400: "#AAACAB",
        500: "#8F9190",
        600: "#747675",
        700: "#606361",
        800: "#424544",
        900: "#232625",
      },
      yellow: {
        100: "#FFFADB",
        200: "#FDF4C1",
        300: "#FBE66F",
        400: "#FFDD32",
        500: "#D9BB12",
        600: "#BDA310",
        700: "#7D6C0B",
        800: "#5B4E08",
        900: "#3A3205",
      },
      blue: {
        100:"#0490f0",
        200:"#0584db",
        300:"#0678c7",
        400:"#056bb0",
        500:"#055e9b",
        600:"#025289",
        700:"#044776",
        800:"#033c63",
        900:"#033252",
      }
    },
  }
);
