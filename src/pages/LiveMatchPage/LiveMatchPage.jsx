import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

// Logos dos times
const teamLogos = {
  Flamengo: "https://logodetimes.com/times/flamengo/logo-flamengo-256.png",
  Palmeiras: "https://logodetimes.com/times/palmeiras/logo-palmeiras-256.png",
  "Atlético Mineiro": "https://logodetimes.com/times/atletico-mineiro/logo-atletico-mineiro-256.png",
  Grêmio: "https://logodetimes.com/times/gremio/logo-gremio-256.png",
  "São Paulo": "https://logodetimes.com/times/sao-paulo/logo-sao-paulo-256.png",
  Corinthians: "https://logodetimes.com/times/corinthians/logo-corinthians-256.png",
  Internacional: "https://logodetimes.com/times/internacional/logo-internacional-256.png",
  Fluminense: "https://logodetimes.com/times/fluminense/logo-fluminense-256.png",
};

// Função para gerar estatísticas simuladas
function generateMatchStats() {
  return {
    shotsTeam1: Math.floor(Math.random() * 10),
    shotsTeam2: Math.floor(Math.random() * 10),
    goalsTeam1: Math.floor(Math.random() * 5),
    goalsTeam2: Math.floor(Math.random() * 5),
    cornersTeam1: Math.floor(Math.random() * 5),
    cornersTeam2: Math.floor(Math.random() * 5),
    foulsTeam1: Math.floor(Math.random() * 10),
    foulsTeam2: Math.floor(Math.random() * 10),
  };
}

const LiveMatchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const match = location.state?.match;

  const [stats, setStats] = useState(generateMatchStats());
  const [isLoadingVideo, setIsLoadingVideo] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

  //----- chamada para o backend-----//
  /*useEffect(() => {
  const interval = setInterval(() => {
    fetch("/api/match-stats") 
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar dados");
        return res.json();
      })
      .then((data) => {
        setStats(data.stats);          
        setShowVideo(data.showVideo);  
        setVideoUrl(data.videoUrl);
        // Se quiser atualizar o placar e outros dados, atualize aqui também
      })
      .catch((err) => {
        console.error("Erro no fetch periódico:", err);
      });
  }, 5000); // Atualiza a cada 5 segundos

  return () => clearInterval(interval); 
}, []);*/



 useEffect(() => {
  setIsLoadingVideo(true);
  fetch("/mockMatchData.json") 
  //fetch("https://api") // aqui troca só a URL
    .then((res) => {
      if (!res.ok) throw new Error("Erro ao carregar JSON");
      return res.json();
    })
    .then((data) => {
      setShowVideo(data.showVideo);
      setVideoUrl(data.videoUrl);
      setIsLoadingVideo(false);
    })
    .catch((error) => {
      console.error("Erro ao buscar dados do vídeo:", error);
      setShowVideo(false);
      setVideoUrl("");
      setIsLoadingVideo(false);
    });
}, []);


  if (!match) {
    return (
      <Box
        sx={{
          height: "100vh",
          bgcolor: "#1b1b1b",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Partida não encontrada
        </Typography>
      </Box>
    );
  }

  const { team1, team2, score1, score2 } = match;

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#1b1b1b",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header com logos e placar */}
     <Box 
        sx={{
          display: "flex",
          justifyContent: "center", 
          alignItems: "center",
          py: 2,
          px: 2,
          minHeight: 100,
          bgcolor: "#3c096c",
          boxShadow: "0 4px 10px rgba(0,0,0,0.7)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 4,
            flexWrap: "wrap",
            textAlign: "center",
          }}
        >
          {/* Time 1 */}
          <Box>
            <Box
              component="img"
              src={teamLogos[team1]}
              alt={team1}
              sx={{
                width: { xs: 50, sm: 60, md: 70 },
                height: { xs: 50, sm: 60, md: 70 },
                borderRadius: "20%",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ mt: 0.5, color: "#fff" }}
            >
              {team1}
            </Typography>
          </Box>

          {/* Placar */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              textShadow: "0 0 10px #fff",
              minWidth: 80,
              color: "#fff",
            }}
          >
            {score1} x {score2}
          </Typography>

          {/* Time 2 */}
          <Box>
            <Box
              component="img"
              src={teamLogos[team2]}
              alt={team2}
              sx={{
                width: { xs: 50, sm: 60, md: 70 },
                height: { xs: 50, sm: 60, md: 70 },
                borderRadius: "20%",
              }}
            />
            <Typography
              variant="subtitle1"
              sx={{ mt: 0.5, color: "#fff" }}
            >
              {team2}
            </Typography>
          </Box>
        </Box>
      </Box>


      {/* Conteúdo */}
      <Box
        sx={{
          flex: 1,
          p: 3,
          overflowY: "auto",
          bgcolor: "#2e2e2e",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
        }}
      >
        {/* Vídeo ou loader */}
        {isLoadingVideo ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              height: 300,
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mb: 2,
                animation: "spin 2s linear infinite",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#9f00b4">
                <path d="M22 16c-1.1 0-2 .9-2 2v6h-6c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h6v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2v-6h6c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2h-6v-6c0-1.1-.9-2-2-2h-8zM24 20h4v6c0 1.1.9 2 2 2h6v4h-6c-1.1 0-2 .9-2 2v6h-4v-6c0-1.1-.9-2-2-2h-6v-4h6c1.1 0 2-.9 2-2v-6z" />
                <circle cx="50" cy="22" r="4" fill="#9f00b4" />
                <circle cx="54" cy="32" r="4" fill="#9f00b4" />
                <circle cx="50" cy="42" r="4" fill="#9f00b4" />
                <circle cx="46" cy="32" r="4" fill="#9f00b4" />
              </svg>
            </Box>
            <Typography variant="body1" sx={{ color: "#ccc", fontSize: 16 }}>
              Carregando transmissão ao vivo...
            </Typography>
          </Box>
        ) : (
          showVideo &&
          videoUrl && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 800,
                height: 0,
                paddingBottom: { xs: "56.25%", sm: "35%" },
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: "0 0 15px #9f00b4",
              }}
            >
              <iframe
                title="Simulação do jogo"
                src={videoUrl}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  borderRadius: 8,
                }}
              />
            </Box>
          )
        )}

        {/* Estatísticas */}
        <Paper
          sx={{
            p: 3,
            bgcolor: "#272727",
            borderRadius: 2,
            width: "100%",
            maxWidth: 800,
            boxShadow: "0 0 12px rgba(0,0,0,0.5)",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#e0e0e0", textAlign: "center" }}>
            Estatísticas da Partida
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr",
              rowGap: 1.5,
              textAlign: "center",
              color: "#ddd",
            }}
          >
            <Typography></Typography>
            <Typography fontWeight="bold">{team1}</Typography>
            <Typography fontWeight="bold">{team2}</Typography>

            <Divider sx={{ gridColumn: "1 / span 3", my: 1, bgcolor: "#444" }} />

            <Typography>Chutes</Typography>
            <Typography>{stats.shotsTeam1}</Typography>
            <Typography>{stats.shotsTeam2}</Typography>

            <Typography>Gols</Typography>
            <Typography>{stats.goalsTeam1}</Typography>
            <Typography>{stats.goalsTeam2}</Typography>

            <Typography>Escanteios</Typography>
            <Typography>{stats.cornersTeam1}</Typography>
            <Typography>{stats.cornersTeam2}</Typography>

            <Typography>Faltas</Typography>
            <Typography>{stats.foulsTeam1}</Typography>
            <Typography>{stats.foulsTeam2}</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default LiveMatchPage;





