import React from "react";
import "./Board.css";
import House from "./House";

interface BoardProps {
  players: unknown[];
  currentPlayerIndex: number;
  onPieceClick: (playerId: string, pieceId: number) => void;
  validMoves: Array<{ pieceId: number }>;
  currentPlayerId?: string;
  numberOfHouses?: number; // Número de casas alrededor del tablero
}

/* ═══════════════════════════════════════════════════════════════════════════
   COMPONENTE PRINCIPAL - BOARD
   ═══════════════════════════════════════════════════════════════════════════
   Tablero dinámico con n casas distribuidas alrededor de un centro
   ═══════════════════════════════════════════════════════════════════════════ */

const Board: React.FC<BoardProps> = ({ numberOfHouses = 4 }) => {
  // Colores para las casas
  const houseColors = ["#ffd43b", "#4dabf7", "#51cf66", "#ff6b6b"];

  // Configuración de ejemplo para cada casa
  const houseConfigs = Array.from({ length: numberOfHouses }, (_, index) => ({
    color: houseColors[index % houseColors.length],
  }));

  // Crear un layout en cuadrícula 2x2
  const renderHousesIn2x2Grid = () => {
    const houses = [];
    // Posiciones para cuadrícula 2x2: superior-izquierda, superior-derecha, inferior-izquierda, inferior-derecha
    const positions = [
      { x: 25, y: 25, rotation: 180 }, // Superior-izquierda
      { x: 75, y: 25, rotation: 270 }, // Superior-derecha
      { x: 25, y: 75, rotation: 270 }, // Inferior-izquierda
      { x: 75, y: 75, rotation: 180 }, // Inferior-derecha
    ];

    for (let i = 0; i < Math.min(numberOfHouses, 4); i++) {
      const pos = positions[i];
      const houseNumber = i + 1;

      houses.push(
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            transform: `translate(-50%, -50%) rotate(${pos.rotation}deg)`,
          }}
        >
          <House
            color={houseConfigs[i].color}
            houseNumber={houseNumber}
            totalHouses={numberOfHouses}
          />
        </div>,
      );
    }

    return houses;
  };

  return (
    <div className="board-container">
      <div
        className="board-wrapper"
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          minHeight: "600px",
        }}
      >
        {/* Casas distribuidas en cuadrícula 2x2 */}
        {renderHousesIn2x2Grid()}
      </div>
    </div>
  );
};

Board.displayName = "ParquesBoard";

export default Board;
