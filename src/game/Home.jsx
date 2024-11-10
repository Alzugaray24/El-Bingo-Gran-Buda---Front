import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { useSockets } from "../hooks/useSocket";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { getGames, joinGame, createGame } = useSockets();
  const games = useSelector((state) => state.game.games);
  const userId = useSelector((state) => state.auth.userId);
  const navigate = useNavigate();

  useEffect(() => {
    getGames();
  }, [getGames]);

  const handleJoinGame = async (gameId) => {
    const success = await joinGame(gameId, userId);
    if (success) {
      navigate(`/game/${gameId}`);
    }
  };

  const handleCreateGame = () => {
    createGame();
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Juegos Activos
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={handleCreateGame}
        fullWidth
        style={{ marginBottom: "20px" }}
      >
        Crear Nuevo Juego
      </Button>

      <Grid container spacing={3}>
        {games.length > 0 ? (
          games.map((game, index) => (
            <Grid item xs={12} sm={6} md={4} key={`${game._id}-${index}`}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6">{`Estado: ${game.gameStatus}`}</Typography>
                  <Typography variant="body2">{`Fecha de inicio: ${game.startDate}`}</Typography>
                  <Typography variant="body2">{`Jugadores: ${game.players.length}`}</Typography>
                  <Grid container spacing={1}>
                    <Grid item>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={() => handleJoinGame(game._id)}
                      >
                        Unirme al Juego
                      </Button>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">
            No hay juegos activos en este momento.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Home;
