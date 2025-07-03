import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  SimpleGrid,
  Link,
  Badge,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const pacotes = [
  {
    id: 1,
    titulo: "Manaus Essencial",
    descricao:
      "City tour completo com guia local, incluindo o Teatro Amazonas, Encontro das Águas e mercado flutuante.",
    imagem: "/assets/images/manaus.png",
    preco: "R$ 599,00",
    whatsappMsg: "Olá! Gostaria de reservar o pacote Manaus Essencial.",
    destaque: "Mais vendido",
  },
  {
    id: 2,
    titulo: "Parintins Cultural",
    descricao:
      "Imersão no Festival de Parintins com visitas guiadas, cultura indígena e gastronomia local.",
    imagem: "/assets/images/parentins.jpg",
    preco: "R$ 799,00",
    whatsappMsg: "Olá! Tenho interesse no pacote Parintins Cultural.",
  },
  {
    id: 3,
    titulo: "Aventura Amazônica",
    descricao:
      "Trilhas na selva, passeio de barco e visitas a comunidades ribeirinhas com toda segurança.",
    imagem: "/assets/images/floresta.png",
    preco: "R$ 899,00",
    whatsappMsg: "Olá! Quero reservar a Aventura Amazônica!",
    destaque: "Novo",
  },
];

const Pacotes = () => {
  return (
    <SectionContainer title="Pacotes de Viagem" flexDirection="column" py={12}>
      <Text textAlign="center" color="gray.600" fontSize="lg" maxW="600px" mx="auto" mb={10}>
        Explore o melhor da Amazônia com experiências únicas, roteiros exclusivos e atendimento personalizado. Escolha seu destino e viva momentos inesquecíveis com a BARUCH Viagens.
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {pacotes.map((pacote) => (
          <Box
            key={pacote.id}
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="xl"
            bg="white"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", boxShadow: "2xl" }}
          >
            <Box position="relative">
              <Image
                src={process.env.PUBLIC_URL + pacote.imagem}
                alt={pacote.titulo}
                h="220px"
                w="100%"
                objectFit="cover"
              />
              {pacote.destaque && (
                <Badge
                  position="absolute"
                  top={3}
                  left={3}
                  colorScheme="green"
                  px={2}
                  py={1}
                  fontSize="0.75em"
                  borderRadius="md"
                  shadow="md"
                >
                  {pacote.destaque}
                </Badge>
              )}
            </Box>

            <Box p={6}>
              <Heading size="md" color="green.800" mb={2}>
                {pacote.titulo}
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={4}>
                {pacote.descricao}
              </Text>

              <Flex justify="space-between" align="center" mt={4}>
                <Text fontWeight="bold" color="green.700" fontSize="lg">
                  {pacote.preco}
                </Text>
                <Link
                  href={`https://wa.me/559291358908?text=${encodeURIComponent(
                    pacote.whatsappMsg
                  )}`}
                  isExternal
                >
                  <Button
                    leftIcon={<FaWhatsapp />}
                    colorScheme="whatsapp"
                    size="sm"
                  >
                    Reservar
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </SectionContainer>
  );
};

export default Pacotes;
