import React, { useState,  useEffect } from "react";
import {
  Box,
  Text,
  useMediaQuery,
  useBreakpointValue,
  Image,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { theme } from "../../utils/theme";

type Match = {
  id: string;
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  isLive: boolean;
};

type Round = {
  round: string;
  matches: Match[];
};

const initialTeams: string[] = [
  "Flamengo",
  "Palmeiras",
  "Atlético Mineiro",
  "Grêmio",
  "São Paulo",
  "Corinthians",
  "Internacional",
  "Fluminense",
];

const teamLogos: Record<string, string> = {
  Flamengo: "https://logodetimes.com/times/flamengo/logo-flamengo-256.png",
  Palmeiras: "https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png",
  "Atlético Mineiro":
    "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
  Grêmio: "https://logodetimes.com/times/gremio/logo-gremio-256.png",
  "São Paulo": "https://logodetimes.com/times/sao-paulo/logo-sao-paulo-256.png",
  Corinthians:
    "https://logodetimes.com/times/corinthians/logo-corinthians-256.png",
  Internacional:
    "https://logodetimes.com/times/internacional/logo-internacional-256.png",
  Fluminense: "https://logodetimes.com/times/fluminense/logo-fluminense-256.png",
};

function generateBracket(teams: string[]): Round[] {
  if ((teams.length & (teams.length - 1)) !== 0) {
    throw new Error("Número de times deve ser potência de 2");
  }

  const rounds: Round[] = [];
  let currentTeams = teams.map((team) => ({ team }));

  while (currentTeams.length > 1) {
    const matches: Match[] = [];
    for (let i = 0; i < currentTeams.length; i += 2) {
      const score1 = Math.floor(Math.random() * 4);
      let score2 = Math.floor(Math.random() * 4);
      if (score1 === score2) {
        score2 = (score2 + 1) % 4;
      }

      matches.push({
        id: Math.random().toString(36).slice(2, 9),
        team1: currentTeams[i].team,
        team2: currentTeams[i + 1].team,
        score1,
        score2,
        isLive: false,
      });
    }

    const roundName =
      currentTeams.length === 2
        ? "Final"
        : currentTeams.length === 4
        ? "Semifinal"
        : currentTeams.length === 8
        ? "Quartas de Final"
        : `Rodada com ${currentTeams.length} times`;

    rounds.push({ round: roundName, matches });

    currentTeams = matches.map((match) => {
      const winner = match.score1 > match.score2 ? match.team1 : match.team2;
      return { team: winner };
    });
  }

  return rounds;
}

/*const Bracket: React.FC = () => {
  const [bracketData, setBracketData] = useState<Round[]>(() =>
    mockLiveMatches(generateBracket(initialTeams))
  );
  const navigate = useNavigate();

  // Função para buscar dados do backend
  const fetchBracketData = async () => {
    try {
      const response = await fetch("https://seu-backend.com/api/bracket");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Round[] = await response.json();
      setBracketData(data);
    } catch (error) {
      console.error("Erro ao buscar dados do bracket:", error);
      
    }
  };

  // Executa a busca ao montar e a cada 5 segundos (polling)
  React.useEffect(() => {
    fetchBracketData();

    const intervalId = setInterval(fetchBracketData, 5000);

    return () => clearInterval(intervalId);
  }, []); */


function mockLiveMatches(bracket: Round[]): Round[] {
  return bracket.map((round) => ({
    ...round,
    matches: round.matches.map((match) => ({
      ...match,
      isLive: Math.random() < 0.3,
    })),
  }));
}

type MatchCardProps = {
  match: Match;
  roundName: string;
};

const MatchCard: React.FC<MatchCardProps> = ({ match, roundName }) => {
  const { team1, team2, score1, score2, isLive } = match;
  const isSemiOrFinal = roundName === "Semifinal" || roundName === "Final";
  const cardWidth = isSemiOrFinal ? "320px" : "240px";

  return (
    <Box
      boxShadow="lg"
      borderRadius="md"
      bg="#f8f8f8"
      color="#333"
      userSelect="none"
      position="relative"
      p={4}
      width={cardWidth}
    >
      {isLive && (
        <Box
          position="absolute"
          top="-25px"
          right="10px"
          bg="red"
          color="white"
          px={3}
          py={0.5}
          fontWeight="bold"
          fontSize="0.8rem"
          borderRadius="md"
          userSelect="none"
          boxShadow="0 0 5px rgba(255,0,0,0.8)"
          whiteSpace="nowrap"
          animation="blinker 1s linear infinite"
          sx={{
            "@keyframes blinker": {
              "50%": {
                opacity: 0,
              },
            },
          }}
        >
          AO VIVO 🔴
        </Box>
      )}

      {[{ team: team1, score: score1 }, { team: team2, score: score2 }].map(
        ({ team, score }, index) => {
          const opponentScore = index === 0 ? score2 : score1;
          return (
            <Flex
              key={index}
              justify="space-between"
              mb={index === 0 ? 3 : 0}
              align="center"
              gap={3}
            >
              <Flex align="center" gap={2} flex={1} minWidth={0} overflow="hidden">
                {teamLogos[team] && (
                  <Image
                    src={teamLogos[team]}
                    alt={team}
                    boxSize="24px"
                    borderRadius="full"
                    flexShrink={0}
                    objectFit="cover"
                  />
                )}
                <Text
                  fontWeight={score > opponentScore ? "bold" : "normal"}
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                  overflow="hidden"
                  fontSize={isSemiOrFinal ? "lg" : "md"}
                  title={team}
                >
                  {team}
                </Text>
              </Flex>
              <Text
                width="55px"
                bg="#333"
                color="#eee"
                textAlign="center"
                borderRadius="md"
                py={1}
                fontWeight="bold"
              >
                {score}
              </Text>
            </Flex>
          );
        }
      )}
    </Box>
  );
};

const Bracket: React.FC = () => {
  const [bracketData, setBracketData] = useState<Round[]>(() =>
    mockLiveMatches(generateBracket(initialTeams))
  );

  const navigate = useNavigate();
  const isMobile = useBreakpointValue({ base: true, sm: false });

  const [bgColor, setBgColor] = useState<string>(theme.colors.blue[600]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setBgColor("rgba(41, 5, 247, 0.3)"); // cor ao rolar
      } else {
        setBgColor(theme.colors.blue[600]); // cor padrão
      }               
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Vai para a página ao vivo da partida se estiver AO VIVO
  const handleMatchClick = (clickedMatch: Match) => {
    if (!clickedMatch.isLive) return;
    navigate(`/live-match/${clickedMatch.id}`, { state: { match: clickedMatch } });
  };

  const cardHeight = "130px";
  const cardMargin = 40;

  

  return (
    <>
      <Text
        as="h1"
        position="sticky"
        top={0}
        zIndex={1000}
        bg={bgColor}
        textAlign="center"
        width="100%"
        py={{ base: 4, sm: 5 }}
        fontWeight="bold"
        color="white"
        textShadow="0 0 5px black"
        fontSize={{ base: "1.5rem", sm: "2.125rem" }}
        transition="background-color 0.5s ease"
      >
        Copa Gamer 2025! 🏆🎮
      </Text>

      <Box
        display={{ base: "flex", sm: "grid" }}
        flexDirection={{ base: "column" }}
        gridTemplateColumns={{ sm: `repeat(${bracketData.length}, 1fr)` }}
        justifyItems="center"
        alignItems={{ base: "center", sm: "flex-start" }}
        mt={0}
        px={4}
        overflowX="auto"
        bg={theme.colors.blue[400]}
        minHeight="600px"
        borderRadius="md"
        py={4}
        gap={4}
        width="100%"
        maxWidth="100vw"
        boxSizing="border-box"
        marginTop="15px"
      >
        {bracketData.map((round) => (
          <VStack
            key={round.round}
            align="center"
            justify={
              round.round === "Semifinal" || round.round === "Final"
                ? "center"
                : "flex-start"
            }
            width={{ base: "100%", sm: "100%" }}
            maxWidth={
              round.round === "Semifinal" || round.round === "Final" ? "245px" : "240px"
            }
            position="relative"
            spacing={{
              base:
                round.round === "Semifinal"
                ? 10 
                : round.round === "Final"
                ? 4
                : `${cardMargin}px`,
                sm: `${cardMargin}px`,
            }}
            height={{
              base:
                round.round === "Semifinal" || round.round === "Final" ? "340px" : "auto",
              sm:
                round.round === "Semifinal" || round.round === "Final" ? "700px" : "auto",
            }}
             mb={{
                 base:
                    round.round === "Quartas de Final" ? "15px" :
                    round.round === "Semifinal" ? "15px" :
                    round.round === "Final" ? "0px" : "15px",
                    sm: "0px"
             }}           
          >
            <Text
               as="h4"
                mt={2}
                mb={3}
                px={2}
                color="white"
                fontWeight="extrabold"
                textShadow="1px 1px 2px rgba(0,0,0,0.7)"
                textAlign="center"
                width="100%"
                fontSize={{ base: "1.25rem", sm: "1.10rem" }}
                letterSpacing="wide"
                textTransform="uppercase"
                borderBottom="2px solid white"
            >
              {round.round}
            </Text>

            {round.matches.map((match) => (
              <Box
                key={match.id}
                position="relative"
                height={cardHeight}
                width="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={{ base: "-8px", sm: "0" }} 
                cursor={match.isLive ? "pointer" : "default"}
                onClick={() => handleMatchClick(match)}
              >
                <MatchCard match={match} roundName={round.round} />
              </Box>
            ))}
          </VStack>
        ))}
      </Box>
    </>
  );
};

export default Bracket;
