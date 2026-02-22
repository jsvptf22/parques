import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";
import { useGameSocket } from "./hooks/useGameSocket";

function App() {
  const [screen, setScreen] = useState<"home" | "lobby" | "game">("home");
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState("");
  const [showRules, setShowRules] = useState(false);

  const {
    gameState,
    currentPlayer,
    diceRoll,
    validMoves,
    error,
    isReconnecting,
    joinGame,
    startGame,
    rollDice,
    movePiece,
    reconnectToGame,
    leaveGame,
    getStoredGameData,
  } = useGameSocket();

  // Try to reconnect on mount
  useEffect(() => {
    const storedData = getStoredGameData();
    if (storedData) {
      setPlayerName(storedData.playerName);
      setGameId(storedData.gameId);
      setTimeout(() => {
        reconnectToGame();
        setScreen("lobby");
      }, 500);
    }
  }, [getStoredGameData, reconnectToGame]);

  useEffect(() => {
    if (gameState?.gameStarted && screen === "lobby") {
      setScreen("game");
    }
  }, [gameState?.gameStarted, screen]);

  const handleCreateGame = () => {
    if (!playerName.trim()) {
      alert("Por favor ingresa tu nombre");
      return;
    }
    leaveGame(); // Clear any previous game
    const newGameId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGameId(newGameId);
    joinGame(newGameId, playerName);
    setScreen("lobby");
  };

  const handleJoinGame = () => {
    if (!playerName.trim() || !gameId.trim()) {
      alert("Por favor ingresa tu nombre y el código de la sala");
      return;
    }
    leaveGame(); // Clear any previous game
    joinGame(gameId, playerName);
    setScreen("lobby");
  };

  const handleLeaveGame = () => {
    leaveGame();
    setScreen("home");
    setGameId("");
  };

  const handleStartGame = () => {
    if (gameState && gameState.players.length >= 2) {
      startGame(gameState.id);
    }
  };

  const handleRollDice = () => {
    if (gameState && currentPlayer) {
      const isMyTurn =
        gameState.players[gameState.currentPlayerIndex]?.id ===
        currentPlayer.id;
      if (isMyTurn && !diceRoll) {
        rollDice(gameState.id);
      }
    }
  };

  const handlePieceClick = (playerId: string, pieceId: number) => {
    if (gameState && currentPlayer && playerId === currentPlayer.id) {
      movePiece(gameState.id, pieceId);
    }
  };

  const isMyTurn =
    gameState &&
    currentPlayer &&
    gameState.players[gameState.currentPlayerIndex]?.id === currentPlayer.id;

  const canRollDice = isMyTurn && !diceRoll && !gameState?.gameFinished;

  if (screen === "home") {
    return (
      <div className="app">
        <div className="home-screen">
          <div className="decorative-corner corner-tl"></div>
          <div className="decorative-corner corner-tr"></div>
          <div className="decorative-corner corner-bl"></div>
          <div className="decorative-corner corner-br"></div>

          <h1 className="main-title">
            <span className="title-word">PAR</span>
            <span className="title-word accent">QUÉS</span>
          </h1>
          <p className="subtitle">El mítico juego colombiano</p>

          <div className="home-form">
            <input
              type="text"
              placeholder="Tu nombre"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="name-input"
              maxLength={15}
            />

            <button onClick={handleCreateGame} className="btn btn-primary">
              Crear Nueva Sala
            </button>

            <div className="divider">
              <span>o únete a una sala</span>
            </div>

            <input
              type="text"
              placeholder="Código de sala"
              value={gameId}
              onChange={(e) => setGameId(e.target.value.toUpperCase())}
              className="game-id-input"
              maxLength={6}
            />

            <button onClick={handleJoinGame} className="btn btn-secondary">
              Unirse a Sala
            </button>

            <button
              onClick={() => setShowRules(!showRules)}
              className="btn-rules"
            >
              {showRules ? "✕ Cerrar" : "📖 Reglas del Juego"}
            </button>

            {showRules && (
              <div className="rules-box">
                <h3>Reglas Tradicionales</h3>
                <ul>
                  <li>🎲 Necesitas sacar 5 para salir de la cárcel</li>
                  <li>🔄 Si sacas 5 o 6, vuelves a tirar</li>
                  <li>💥 Captura fichas enemigas y envíalas a la cárcel</li>
                  <li>⭐ Las casillas seguras te protegen</li>
                  <li>🏁 Debes llegar a la meta con el número exacto</li>
                  <li>🏆 El primero en meter sus 4 fichas gana</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (screen === "lobby") {
    return (
      <div className="app">
        <div className="lobby-screen">
          {isReconnecting && (
            <div className="reconnecting-banner">
              Reconectando a la partida...
            </div>
          )}
          <div className="lobby-header">
            <h2>Sala de Espera</h2>
            <div className="game-code">
              <span>Código:</span>
              <code>{gameState?.id}</code>
            </div>
            <button onClick={handleLeaveGame} className="btn-leave">
              ✕ Salir
            </button>
          </div>

          <div className="players-list">
            <h3>Jugadores ({gameState?.players.length || 0}/4)</h3>
            {gameState?.players.map((player) => (
              <div
                key={player.id}
                className="player-card"
                style={{ borderColor: getColorHex(player.color) }}
              >
                <div
                  className="player-color-badge"
                  style={{ backgroundColor: getColorHex(player.color) }}
                ></div>
                <span className="player-name">{player.name}</span>
                {player.id === currentPlayer?.id && (
                  <span className="you-badge">TÚ</span>
                )}
              </div>
            ))}
          </div>

          {gameState &&
            gameState.players.length >= 2 &&
            !gameState.gameStarted && (
              <button
                onClick={handleStartGame}
                className="btn btn-primary btn-large"
              >
                Iniciar Juego
              </button>
            )}

          {gameState && gameState.players.length < 2 && (
            <p className="waiting-text">Esperando más jugadores...</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="app game-screen">
      {error && <div className="error-toast">{error}</div>}
      {isReconnecting && (
        <div className="reconnecting-banner">Reconectando a la partida...</div>
      )}

      <div className="game-header">
        <div className="game-info">
          <div className="game-id-display">
            Sala: <code>{gameState?.id}</code>
            <button
              onClick={handleLeaveGame}
              className="btn-leave-game"
              title="Salir del juego"
            >
              ✕
            </button>
          </div>
          {gameState?.gameFinished && (
            <div className="winner-banner">
              🏆 {gameState.winner} ha ganado!
            </div>
          )}
        </div>

        <div className="current-turn">
          <div className="turn-indicator">
            Turno de:{" "}
            <span
              style={{
                color: gameState
                  ? getColorHex(
                      gameState.players[gameState.currentPlayerIndex]?.color,
                    )
                  : "#fff",
              }}
            >
              {gameState?.players[gameState.currentPlayerIndex]?.name}
            </span>
          </div>
        </div>

        <div className="dice-section">
          <div className={`dice ${diceRoll ? "rolled" : ""}`}>
            {diceRoll ? renderDiceFace(diceRoll.value) : "🎲"}
          </div>
          <button
            onClick={handleRollDice}
            disabled={!canRollDice}
            className={`btn btn-dice ${canRollDice ? "pulse" : ""}`}
          >
            {canRollDice
              ? "Tirar Dado"
              : isMyTurn
                ? "Mueve una ficha"
                : "Esperando..."}
          </button>
          {diceRoll?.canRollAgain && (
            <div className="bonus-roll">¡Tiras de nuevo! 🎉</div>
          )}
        </div>
      </div>

      <div className="game-content">
        {gameState && (
          <Board
            players={gameState.players}
            currentPlayerIndex={gameState.currentPlayerIndex}
            onPieceClick={handlePieceClick}
            validMoves={validMoves}
            currentPlayerId={currentPlayer?.id}
          />
        )}
      </div>

      <div className="players-sidebar">
        {gameState?.players.map((player) => (
          <div
            key={player.id}
            className={`player-status ${player.id === currentPlayer?.id ? "you" : ""}`}
            style={{ borderColor: getColorHex(player.color) }}
          >
            <div className="player-status-header">
              <div
                className="player-color-dot"
                style={{ backgroundColor: getColorHex(player.color) }}
              ></div>
              <span className="player-status-name">{player.name}</span>
            </div>
            <div className="player-pieces-status">
              {player.pieces.filter((p) => p.isFinished).length}/4 en meta
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getColorHex(color: string): string {
  const colors: Record<string, string> = {
    red: "#E63946",
    blue: "#457B9D",
    yellow: "#F4A261",
    green: "#2A9D8F",
  };
  return colors[color] || "#fff";
}

function renderDiceFace(value: number): string {
  const faces = ["⚀", "⚁", "⚂", "⚃", "⚄", "⚅"];
  return faces[value - 1] || "🎲";
}

export default App;
