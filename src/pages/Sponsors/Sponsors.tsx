import { Button, Flex, Grid, Image, Link } from "@chakra-ui/react";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

export const sponsors = [
  {
    name: "Avai",
    imagePath: "assets/images/sponsors/logo-avai-256.png",
    url: "https://avai.com.br/categoria/e-sports/",
  },
  {
    name: "volt",
    imagePath: "assets/images/sponsors/logo_volt.png",
    url: "https://www.voltsport.com.br/",
  },
  {
    name: "Woai",
    imagePath: "assets/images/sponsors/WOA.png",
    url: "https://www.woa.com.br/",
  },
  {
    name: "Player Games",
    imagePath: "assets/images/sponsors/logomedico.png",
    url: "https://www.help-sc.com.br/",
  },
];

const Sponsors = () => {
  return (
    <SectionContainer title="Parceiros / Apoiadores">
      <Grid
        width="100%"
        gap={4}
        templateColumns={{
          base: "1fr", // Uma coluna em telas pequenas
          sm: "repeat(auto-fill,minmax(18em, 1fr))", // Preenche com colunas de no mínimo 18em
          md: "repeat(auto-fill,minmax(20em, 1fr))",
          lg: "repeat(auto-fill,minmax(20em, 1fr))",
          xl: "repeat(auto-fill,minmax(25em, 1fr))",
          "2xl": "repeat(auto-fill,minmax(30em, 1fr))",
        }}
      >
        {sponsors.map((sponsor) => (
          <Flex
            key={sponsor.name}
            direction="column"
            p={{ base: 3, sm: 4 }}
            align="center"
            justify="space-between"
            boxShadow="md"
            borderRadius="md"
            bg="white"
          >
            <Flex justify="center" width="100%">
              <Image
                maxW="100%"
                maxH={{ base: "4em", sm: "5em", md: "6em" }}
                src={`${process.env.PUBLIC_URL}${sponsor.imagePath}`}
                alt={`Patrocinador: ${sponsor.name}`}
                objectFit="contain"
              />
            </Flex>

            <Link
              href={sponsor.url}
              isExternal
              _hover={{ textDecoration: "none" }}
              width="100%"
            >
              <Button
                mt={4}
                width="100%"
                size="sm"
                colorScheme="blue"
              >
                Visitar o site
              </Button>
            </Link>
          </Flex>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default Sponsors;
