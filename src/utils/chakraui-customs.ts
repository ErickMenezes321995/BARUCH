import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    color: "neutral.black",
  },
  sizes: {},
  variants: {
    outline: {
      border: "2px solid",
      borderColor: "yellow.400",
      color: "yellow.400",
      fontWeight: "700",
      "&:hover": {
        backgroundColor: "#FBE66F26",
      },
    },
    solid: {
      padding: "0 2em",
      color: "neutral.black",
      "&:hover": {
        backgroundColor: "yellow.300",
      },
      "&:disabled": {
        backgroundColor: "grey.100",
        color: "grey.500",

        "&:hover": {
          backgroundColor: "grey.100",
        },
      },
    },
  },
  defaultProps: {
    variant: "solid",
  },
});
