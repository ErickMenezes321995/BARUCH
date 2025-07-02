import { Button, Heading, Image, Link, Text } from "@chakra-ui/react";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const News = () => {
  return (
    <SectionContainer
      title="Notícias"
      flexDirection="column"
      maxWidth={{ base: "100%", md: "50%" }}
    >
      <Image
        src={`${process.env.PUBLIC_URL}/assets/images/banner_avai_esport.png`}
        height="auto"
        width="100%"
        objectFit="cover"
      />

      <br />

      <Heading size="md" color="neutral.black">
        Avaí E-Sports: O Avaí Futebol Clube dá um 
        passo importante rumo ao futuro. 
      </Heading>

      <br />

      <Text>
        Avaí E-Sports: O Avaí Futebol Clube dá um 
        passo importante rumo ao futuro ao ingressar 
        no universo dos esportes eletrônicos em parceria 
        com a Real Deal — uma organização consolidada no 
        cenário desde 2017, com uma equipe técnica 
        experiente e comprometida. Juntos, visam construir
         uma trajetória de destaque e levar o nome do Leão 
         da Ilha ao topo do E-Sports nacional.
      </Text>

      <br />

      <Link
        href="https://avai.com.br/categoria/e-sports/"
        isExternal
        _hover={{ textDecoration: "none" }}
      >
        <Button
          width={{ base: "100%", sm: "fit-content", md: "fit-content" }}
        >
          <Text>Continuar lendo</Text>
        </Button>
      </Link>
    </SectionContainer>
  );
};

export default News;
