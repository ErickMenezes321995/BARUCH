import { Box, Flex, Image, Link, Text } from "@chakra-ui/react";
import CoritibaLogo from "../../assets/logobarut.png";
import SocialMedia from "../SocialMedia/SocialMedia";

const CommonFlex = ({ children, ...props }: any) => {
  return (
    <Flex
      w="100%"
      align={{
        base: "center",
        sm: "center",
        md: "center",
        lg: "space-between",
      }}
      flexDirection={{
        base: "column",
        sm: "column",
        md: "column",
        lg: "row",
      }}
      {...props}
    >
      {children}
    </Flex>
  );
};

const Footer = () => {
  return (
    <Box
      bg="neutral.white"
      p={{
        base: "1.5em 1.25em",
        sm: "1.5em 1.25em",
        md: "1.5em 1.25em",
        lg: "3em 4.5em",
        "2xl": "3em 7.5em",
      }}
    >
      <CommonFlex
        marginTop={{ base: "1.5em", sm: "1.5em", md: "1.5em", lg: "2.25em" }}
        justifyContent="space-between"
      >
        <CommonFlex>
          <Flex
            justifyContent={{
              base: "center",
              sm: "center",
              md: "center",
              lg: "flex-start",
            }}
          >
            <Image
              height="3.5em"
              margin={{
                base: "0 0 1em 0",
                sm: "0 0 1em 0",
                md: "0 0 1em 0",
                lg: "0 1em 0 0",
              }}
              src={CoritibaLogo}
            />
          </Flex>
          <Text fontSize="xs">
            Copyright © {new Date().getFullYear()}{" "}
            <Link href="#" target="_blank">
              www.BARUCH.com.br
            </Link>
          </Text>
          <Text
            fontSize="xs"
            margin="0 1em"
            display={{
              base: "none",
              sm: "none",
              md: "none",
              lg: "block",
            }}
          >
            |
          </Text>
          <Text fontSize="xs">Todos os direitos reservados</Text>
        </CommonFlex>
        <Flex>
          <SocialMedia isFooter />
        </Flex>
      </CommonFlex>
    </Box>
  );
};

export default Footer;
