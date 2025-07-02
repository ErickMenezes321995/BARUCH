import { Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import SectionContainer from "../../components/SectionContainer/SectionContainer";

const games = [
  
  {
    name: "League of Legends",
    imagePath: "assets/images/games/logo-lol.png",
  },
  {
    name: "Free Fire",
    imagePath: "assets/images/games/logo-ff.png",
  },
  
  
  {
    name: "Fifa",
    imagePath: "assets/images/games/logo-fifa.png",
  },
  
  {
    name: "Valorant",
    imagePath: "assets/images/games/logo-valorant.png",
  },
  
  
];

const ESports = () => {
  return (
    <SectionContainer title="O que é E-Sports?" flexDirection="column">
      <Text>
      Os esportes eletrônicos, ou E-Sports, já são uma realidade 
      consolidada na sociedade moderna. Se antes o principal 
      programa de domingo para muitos jovens adultos era acompanhar 
      seu time do coração no estádio ou pela televisão, hoje os 
      campeonatos digitais dividem essa paixão.
      </Text>

      <br />

      <Heading size="md">
        Atualmente, os E-Sports dividem a atenção desse público.
      </Heading>

      <br />

      <Text>
       Diariamente, milhões de pessoas em todo o mundo assistem, 
       torcem e participam de competições de jogos eletrônicos 
       com o mesmo entusiasmo dedicado ao futebol tradicional.
       Os E-Sports envolvem atletas profissionais que disputam 
       torneios organizados em diversas modalidades, como jogos
        de estratégia, luta, tiro em primeira pessoa (FPS), e os
         populares MOBAs (Multiplayer Online Battle Arena).
      </Text>

      <Grid
        margin="2.5em 0 0 0"
        width="100%"
        templateColumns={{
          base: "repeat(auto-fill,minmax(8em, 1fr))",
          sm: "repeat(auto-fill,minmax(10em, 1fr))",
          md: "repeat(auto-fill,minmax(10em, 1fr))",
          lg: "repeat(auto-fill,minmax(10em, 1fr))",
          xl: "repeat(auto-fill,minmax(15em, 1fr))",
          "2xl": "repeat(auto-fill,minmax(15em, 1fr))",
        }}
        gap="1.5em"
      >
        {games.map((game) => (
          <Flex
            flexDirection="column"
            key={game.name}
            padding="1em"
            align="center"
            justify="center"
            borderRadius="0.5em"
            border="1px solid"
            borderColor="gray.100"
          >
            <Image
              src={`${process.env.PUBLIC_URL}${game.imagePath}`}
              alt={`Logo ${game.name}`}
              objectFit="contain"
              maxH={{ base: "5em", sm: "5em", md: "5em", lg: "5em", xl: "7em" }}
            />
          </Flex>
        ))}
      </Grid>
    </SectionContainer>
  );
};

export default ESports;
