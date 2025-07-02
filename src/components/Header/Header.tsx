import { 
  Grid,
  GridItem,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Flex, 
  IconButton,
  Box,
  Heading,
  Image,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import { HiMenu } from "react-icons/hi";
import { theme } from "../../utils/theme";
import StoreButton from "./StoreButton";
import SocialMedia from "../SocialMedia/SocialMedia";
import CoritibaLogoNotWhite from "../../assets/logobarut.png";
import { useEffect, useState } from "react";

const navLinks = [
  {
    name: "Portal",
    path: "/",
  },
  {
    name: "Sobre",
    path: "/sobre",
  },
  {
    name: "Notícias",
    path: "/noticias",
  },
  {
    name: "Parceiros",
    path: "/patrocinadores-parceiros",
  },
  {
    name: "O que é o BARUCH?",
    path: "/e-sports",
  },
  {
    name: "Fale conosco",
    path: "/contato",
  },
];

const Header = () => {
  let location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [headerColor, setHeaderColor] = useState<string>();
  const activeStyleMobile = {
    color: theme.colors.yellow[400],
  };
  const activeStyle = {
    borderBottom: `3px solid ${theme.colors.yellow[400]}`,
  };
  const defaultStyle = {
    height: "100%",
    display: "flex",
    alignItems: "center",
  };

  const listenScrollEvent = () => {
    if (window.scrollY > 70) {
      setHeaderColor("#0064009D"); // verde com transparência
    } else {
      setHeaderColor("#006400"); // verde sólido
    }
  };

  useEffect(() => {
    listenScrollEvent(); // chama logo ao montar para setar cor correta
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <>
      <Flex
        id="header"
        align="center"
        justify="space-between"
        bg={location.pathname === "/" ? headerColor : "#006400"}
        h={{ base: "5.75em", lg: "8.25em" }}
        p={{
          base: "0 1em",
          sm: "0.75em 1em",
          md: "0.75em 0.85em",
          lg: "0 4.5em",
          "2xl": "0 7.5em",
        }}
        zIndex="5"
        top="0"
        position="sticky"
        transition="background-color 0.5s ease"
      >
        <Flex
          as={NavLink}
          to="/"
          align="center"
          height={{ base: "3em", md: "4em" }}
        >
          <Image
            height={{ base: "2.75em", sm: "3em", md: "3.5em", lg: "4em" }}
            src={CoritibaLogoNotWhite}
          />
        </Flex>

        <Flex
          align="center"
          justify="space-between"
          w={{ md: "95%", lg: "85%", "2xl": "60%" }}
          minW="60%"
          display={{ base: "none", lg: "flex" }}
        >
          {navLinks.map((link) => (
            <Box
              key={link.name}
              as={NavLink}
              to={link.path}
              color="neutral.white"
              borderBottom="3px solid transparent"
              paddingBottom="0.5em"
              __css={{
                "&:hover": {
                  borderColor: `${theme.colors.yellow[400]}`,
                  color: `${theme.colors.yellow[400]}`,
                },
              }}
              style={({ isActive }: { isActive: boolean }) => ({
                ...defaultStyle,
                ...(isActive ? activeStyle : null),
              })}
            >
              <Heading size="xs">{link.name}</Heading>
            </Box>
          ))}

          <StoreButton />

          <Flex flexDirection="row">
            <SocialMedia iconColor="white" />
          </Flex>
        </Flex>

        <IconButton
          aria-label="Open Menu"
          onClick={onOpen}
          icon={<HiMenu size="2em" />}
          size="lg"
          variant="ghost"
          colorScheme="blue"
          color="blue.100"
          display={{ base: "flex", lg: "none" }}
        />
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="yellow.400" />

          <DrawerBody bg="#006400">
            <Grid templateRows="repeat(8, 1fr)" gap="1.5em">
              {navLinks.map((link) => (
                <GridItem
                  key={link.name}
                  w="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  fontWeight="700"
                  color="neutral.white"
                >
                  <NavLink
                    to={link.path}
                    style={({ isActive }: { isActive: boolean }) => ({
                      ...defaultStyle,
                      ...(isActive ? activeStyle : null),
                    })}
                    onClick={onClose}
                  >
                    <Heading size="xs">{link.name}</Heading>
                  </NavLink>
                </GridItem>
              ))}
              <GridItem
                w="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StoreButton />
              </GridItem>
              <GridItem
                w="100%"
                h="10"
                display="flex"
                alignItems="center"
                justifyContent="center"
                pt="3em"
              >
                <SocialMedia iconColor="white" />
              </GridItem>
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
