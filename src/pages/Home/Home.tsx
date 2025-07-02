import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { sponsors } from "../Sponsors/Sponsors";

const pacotes = [
  {
    title: "Expedição no Amazonas",
    description: "Aventure-se por trilhas e rios em uma imersão na selva amazônica.",
    image: "assets/images/manaus.png",
  },
  {
    title: "Expedição em Parentins",
    description: "Vivencie o dia a dia das comunidades à beira dos rios amazônicos.",
    image: "assets/images/parentins.jpg",
  },
  {
    title: "Expedição na Floresta",
    description: "Relaxe em um passeio inesquecível pelas águas escuras do Rio Negro.",
    image: "assets/images/floresta.png",
  },
];
 

const Home = () => {
   const [showFullText, setShowFullText] = useState(false);
   const toggleText = () => setShowFullText(!showFullText);
  return (
    <Flex flexDirection="column">
      <Box
        h={["40vh", "60vh", "70vh"]}
        backgroundImage={
          process.env.PUBLIC_URL + "assets/images/AMAZONAS.png"
        }
        backgroundSize="cover"
        backgroundPosition="center"
        marginTop="85px"
      />

      <Flex as="section" align="center" flexDirection="column" p={{ base: 4, md: 6 }}>
        <Heading
          size={{ base: "md", sm: "lg", md: "lg", lg: "lg" }}
          color="neutral.black"
          textAlign="center"
        >
          O que é o BARUCH?
        </Heading>

       <Box width={{ base: "100%", sm: "100%", md: "80%" }}>
      <Text
        mt="1.5em"
        mb="1em"
        textAlign="center"
        color="grey.700"
        fontSize={{ base: "sm", sm: "md" }}
        noOfLines={{ base: showFullText ? undefined : 4, md: undefined }}
      >
        A BARUCH Viagens é uma iniciativa apaixonada por conectar pessoas às belezas naturais e culturais do coração da floresta amazônica.
        Nossa missão é oferecer experiências autênticas e inesquecíveis, revelando o que há de mais extraordinário nos rios, selvas e comunidades
        do Amazonas. O projeto nasceu com o propósito de criar roteiros de alto nível, capazes de representar com excelência a riqueza, a diversidade
        e a tradição da região amazônica. Nosso objetivo vai além de promover o turismo: queremos valorizar o patrimônio ambiental, impulsionar
        o desenvolvimento sustentável e despertar, em cada viajante, o respeito e o encantamento por esse ecossistema único no planeta.
        A proposta da Amazônia Viagens é guiar você por trilhas, florestas, igarapés e encontros culturais que só quem vive a Amazônia conhece de verdade.
      </Text>

      <Box textAlign="center"  marginTop="-15px">
            <Button
              size="sm"
              variant="link"
              colorScheme="green"
              onClick={toggleText}
            >
              {showFullText ? "Ler menos" : "Ler mais"}
            </Button>

      </Box>
    </Box>

        <Button
          as={RouterLink}
          to="/sobre"
          marginTop="15px"
          _hover={{ textDecoration: "none" }}
          width={{ base: "100%", sm: "100%", md: "unset" }}
        >
          Saiba mais
        </Button>
      </Flex>

      {/* Seção dos 3 cards de pacotes */}
      <Flex
        wrap="wrap"
        justify="center"
        gap={6}
        px={{ base: 4, md: 10 }}
        py={{ base: 6, md: 12 }}
        backgroundImage={process.env.PUBLIC_URL + "assets/images/store-background.png"}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {pacotes.map((pacote, index) => (
          <Box
            key={index}
            backgroundImage={process.env.PUBLIC_URL + "/" + pacote.image}
            backgroundSize="cover"
            backgroundPosition="center"
            borderRadius="xl"
            boxShadow="lg"
            w={{ base: "100%", md: "30%" }}
            minH="320px"
            color="white"
            position="relative"
            overflow="hidden"
          >
            <Flex
              direction="column"
              justify="flex-end"
              h="100%"
              p={6}
              bg="rgba(0, 0, 0, 0.5)"
              backdropFilter="blur(2px)"
            >
              <Heading fontSize="xl" mb={2}>
                {pacote.title}
              </Heading>
              <Text fontSize="sm" mb={3}>
                {pacote.description}
              </Text>
              <Button
                colorScheme="green"
                size="sm"
                alignSelf="start"
                _hover={{ bg: "green.700" }}
              >
                Ver mais
              </Button>
            </Flex>
          </Box>
        ))}
      </Flex>

      <Flex
        as="section"
        bg="neutral.white"
        flexDirection="column"
        align="center"
        px={{ base: 4, sm: 6 }}
        py={10}
      >
        <Heading size="md" mb={6} color="green.700" textAlign="center">
          Apoio e Parcerias
        </Heading>

        <Flex
          wrap="wrap"
          justify={{ base: "center", sm: "center", md: "space-evenly" }}
          w="100%"
        >
          {sponsors.map((sponsor) => (
            <Image
              key={sponsor.imagePath}
              src={`${process.env.PUBLIC_URL}${sponsor.imagePath}`}
              maxH="5em"
              m={4}
              width="auto"
              objectFit="contain"
              alt="Parceiro"
            />
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
