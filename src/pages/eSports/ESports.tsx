import { Box, Flex, Grid, Heading, Image, Text, Button } from "@chakra-ui/react";
import SectionContainer from "../../components/SectionContainer/SectionContainer";
import { Link as RouterLink } from "react-router-dom";

const destaques = [
  {
    title: "Experiências Autênticas",
    description: "Conectamos você com a natureza e cultura amazônica de forma genuína.",
    image: "assets/images/floresta.png",
  },
  {
    title: "Roteiros Personalizados",
    description: "Viagens feitas sob medida para quem busca mais que um passeio: uma jornada inesquecível.",
    image: "assets/images/pacote-indigena.png",
  },
  {
    title: "Atuação em Manaus e Parintins",
    description: "Com raízes fortes nessas duas cidades incríveis, oferecemos o melhor do Amazonas.",
    image: "assets/images/manaus-parintins.png",
  },
];

const ESports = () => {
  return (
    <SectionContainer title="O que é o BARUCH?" flexDirection="column">
      <Flex direction="column" align="center" textAlign="center" mb={8}>
        <Heading size="lg" mb={4} color="green.700">
          Conheça a BARUCH Viagens
        </Heading>
        <Text maxW="800px" fontSize={{ base: "sm", md: "md" }} color="gray.700">
          A BARUCH Viagens é uma empresa dedicada a proporcionar experiências únicas no coração da Amazônia. Atuando em Manaus e Parintins,
          oferecemos pacotes turísticos que valorizam a biodiversidade, as comunidades tradicionais e a cultura vibrante da região. Nosso compromisso é com o turismo sustentável, encantador e transformador.
        </Text>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
        gap={6}
        w="100%"
        mb={12}
      >
        {destaques.map((item, index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="xl"
            boxShadow="md"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "scale(1.03)", boxShadow: "xl" }}
          >
            <Image
              src={`${process.env.PUBLIC_URL}/${item.image}`}
              alt={item.title}
              h="200px"
              w="100%"
              objectFit="cover"
            />
            <Box p={4}>
              <Heading size="md" color="green.700" mb={2}>
                {item.title}
              </Heading>
              <Text fontSize="sm" color="gray.600">{item.description}</Text>
            </Box>
          </Box>
        ))}
      </Grid>

      <Flex justify="center">
        <Button
          as={RouterLink}
          to="/sobre"
          colorScheme="green"
          size="lg"
          _hover={{ bg: "green.700" }}
        >
          Saiba mais sobre a BARUCH
        </Button>
      </Flex>
    </SectionContainer>
  );
};

export default ESports;
