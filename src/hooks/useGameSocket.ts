import { useCallback, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import type { DiceRoll, GameState, Move, Player } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || `http://${window.location.hostname}:3000`;
const STORAGE_KEY = 'parques_game_state';

interface StoredGameData {
  gameId: string;
  playerName: string;
  playerId: string;
}

const saveGameData = (data: StoredGameData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving game data:', error);
  }
};

const loadGameData = (): StoredGameData | null => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading game data:', error);
    return null;
  }
};

const clearGameData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing game data:', error);
  }
};

export const useGameSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [diceRoll, setDiceRoll] = useState<DiceRoll | null>(null);
  const [validMoves, setValidMoves] = useState<Move[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isReconnecting, setIsReconnecting] = useState(false);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to game server');
    });

    newSocket.on('gameCreated', ({ gameId }) => {
      console.log('Game created:', gameId);
    });

    newSocket.on('joinedGame', ({ player, game }) => {
      setCurrentPlayer(player);
      setGameState(game);
      setIsReconnecting(false);
      
      // Save game data to localStorage
      saveGameData({
        gameId: game.id,
        playerName: player.name,
        playerId: player.id,
      });
    });

    newSocket.on('gameState', (game: GameState) => {
      setGameState(game);
    });

    newSocket.on('gameStarted', (game: GameState) => {
      setGameState(game);
    });

    newSocket.on('diceRolled', ({ diceRoll: roll, validMoves: moves }) => {
      setDiceRoll(roll);
      setValidMoves(moves);
    });

    newSocket.on('pieceMoved', ({ move }) => {
      console.log('Piece moved:', move);
      setDiceRoll(null);
      setValidMoves([]);
    });

    newSocket.on('gameFinished', ({ winner }) => {
      console.log('Game finished! Winner:', winner);
      // Clear stored game data when game finishes
      setTimeout(() => {
        clearGameData();
      }, 5000); // Wait 5 seconds before clearing
    });

    newSocket.on('error', ({ message }) => {
      setError(message);
      setTimeout(() => setError(null), 3000);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const reconnectToGame = useCallback(() => {
    const storedData = loadGameData();
    if (storedData && socket) {
      setIsReconnecting(true);
      socket.emit('joinGame', {
        gameId: storedData.gameId,
        playerName: storedData.playerName,
      });
      return storedData;
    }
    return null;
  }, [socket]);

  const createGame = useCallback(() => {
    socket?.emit('createGame');
  }, [socket]);

  const joinGame = useCallback((gameId: string, playerName: string) => {
    socket?.emit('joinGame', { gameId, playerName });
    // Save immediately when joining
    saveGameData({
      gameId,
      playerName,
      playerId: socket?.id || '',
    });
  }, [socket]);

  const startGame = useCallback((gameId: string) => {
    socket?.emit('startGame', { gameId });
  }, [socket]);

  const rollDice = useCallback((gameId: string) => {
    socket?.emit('rollDice', { gameId });
  }, [socket]);

  const movePiece = useCallback((gameId: string, pieceId: number) => {
    socket?.emit('movePiece', { gameId, pieceId });
  }, [socket]);

  const skipTurn = useCallback((gameId: string) => {
    socket?.emit('skipTurn', { gameId });
  }, [socket]);

  const leaveGame = useCallback(() => {
    clearGameData();
    setGameState(null);
    setCurrentPlayer(null);
    setDiceRoll(null);
    setValidMoves([]);
  }, []);

  return {
    gameState,
    currentPlayer,
    diceRoll,
    validMoves,
    error,
    isReconnecting,
    createGame,
    joinGame,
    startGame,
    rollDice,
    movePiece,
    skipTurn,
    reconnectToGame,
    leaveGame,
    getStoredGameData: loadGameData,
  };
};

