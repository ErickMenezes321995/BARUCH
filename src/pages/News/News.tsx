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
        src={`${process.env.PUBLIC_URL}/assets/images/News.png`}
        height="auto"
        width="100%"
        objectFit="cover"
        alt="Lançamento de Expedição"
      />

      <br />

      <Heading size="md" color="neutral.black">
        BARUCH Viagens lança expedição inédita pela floresta amazônica
      </Heading>

      <br />

      <Text>
        A BARUCH Viagens acaba de lançar um novo pacote turístico que leva os
        viajantes para uma imersão única na floresta amazônica. Com foco em
        sustentabilidade e experiências autênticas, a nova expedição inclui
        visitas a comunidades ribeirinhas, trilhas ecológicas, passeios de
        canoa e vivências com guias locais. É uma oportunidade imperdível para
        quem deseja se conectar com a natureza e a cultura amazônica de forma
        profunda e transformadora.
      </Text>

      <br />

      <Link
        href="https://baruchviagens.com.br/expedicoes"
        isExternal
        _hover={{ textDecoration: "none" }}
      >
        <Button width={{ base: "100%", sm: "fit-content", md: "fit-content" }}>
          <Text>Continuar lendo</Text>
        </Button>
      </Link>
    </SectionContainer>
  );
};

export default News;
