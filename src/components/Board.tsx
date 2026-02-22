import React from "react";
import type { Piece, Player, PlayerColor } from "../types";

interface BoardProps {
  players: Player[];
  currentPlayerIndex: number;
  onPieceClick: (playerId: string, pieceId: number) => void;
  validMoves: Array<{ pieceId: number }>;
  currentPlayerId?: string;
}

const SAFE_POSITIONS = [5, 12, 17, 22, 29, 34, 39, 46, 51, 56, 63, 0];

const Board: React.FC<BoardProps> = ({
  players,
  currentPlayerIndex,
  onPieceClick,
  validMoves,
  currentPlayerId,
}) => {
  const currentPlayer = players[currentPlayerIndex];
  const isMyTurn = currentPlayer?.id === currentPlayerId;

  const getPieceAtPosition = (position: number) => {
    const piecesAtPosition: Array<{ player: Player; piece: Piece }> = [];
    players.forEach((player) => {
      player.pieces.forEach((piece) => {
        if (
          piece.position === position &&
          !piece.isInJail &&
          !piece.isFinished
        ) {
          piecesAtPosition.push({ player, piece });
        }
      });
    });
    return piecesAtPosition;
  };

  const renderBoardPosition = (
    position: number,
    _index: number,
    side: "top" | "right" | "bottom" | "left",
  ) => {
    const pieces = getPieceAtPosition(position);
    const isSafe = SAFE_POSITIONS.includes(position);

    return (
      <div
        key={position}
        className={`board-cell ${isSafe ? "safe" : ""} ${side}`}
        data-position={position}
      >
        {isSafe && <div className="safe-marker">★</div>}
        <div className="pieces-container">
          {pieces.map(({ player, piece }, idx) => (
            <div
              key={`${player.id}-${piece.id}`}
              className={`piece ${player.color}`}
              style={{
                transform: `translate(${idx * 8}px, ${idx * 8}px)`,
              }}
            />
          ))}
        </div>
      </div>
    );
  };

  const renderJail = (color: PlayerColor) => {
    const player = players.find((p) => p.color === color);
    if (!player) return null;

    const canMove = isMyTurn && player.id === currentPlayerId;

    return (
      <div className={`jail ${color}`}>
        <div className="jail-label">{player.name}</div>
        <div className="jail-pieces">
          {player.pieces.map((piece) => {
            const isValidMove = validMoves.some((m) => m.pieceId === piece.id);
            if (!piece.isInJail) return null;

            return (
              <div
                key={piece.id}
                className={`piece ${color} ${isValidMove && canMove ? "valid-move" : ""}`}
                onClick={() =>
                  canMove && isValidMove && onPieceClick(player.id, piece.id)
                }
                style={{
                  cursor: canMove && isValidMove ? "pointer" : "default",
                }}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const renderHomePath = (color: PlayerColor) => {
    const player = players.find((p) => p.color === color);
    if (!player) return null;

    const canMove = isMyTurn && player.id === currentPlayerId;

    return (
      <div className={`home-path ${color}`}>
        {Array.from({ length: 8 }).map((_, idx) => {
          const position = 68 + idx;
          const piecesAtPos = player.pieces.filter(
            (p) => p.position === position && !p.isFinished,
          );

          return (
            <div key={idx} className="home-cell">
              {piecesAtPos.map((piece) => {
                const isValidMove = validMoves.some(
                  (m) => m.pieceId === piece.id,
                );
                return (
                  <div
                    key={piece.id}
                    className={`piece ${color} ${isValidMove && canMove ? "valid-move" : ""}`}
                    onClick={() =>
                      canMove &&
                      isValidMove &&
                      onPieceClick(player.id, piece.id)
                    }
                    style={{
                      cursor: canMove && isValidMove ? "pointer" : "default",
                    }}
                  />
                );
              })}
            </div>
          );
        })}
        <div className="finish-zone">
          {player.pieces
            .filter((p) => p.isFinished)
            .map((piece) => (
              <div key={piece.id} className={`piece ${color} finished`} />
            ))}
        </div>
      </div>
    );
  };

  const renderBoardSide = (
    side: "top" | "right" | "bottom" | "left",
    startPos: number,
  ) => {
    return (
      <div className={`board-side ${side}`}>
        {Array.from({ length: 17 }).map((_, idx) => {
          const position = (startPos + idx) % 68;
          return renderBoardPosition(position, idx, side);
        })}
      </div>
    );
  };

  return (
    <div className="board-container">
      <div className="board-wrapper">
        {/* Jails */}
        <div className="corner top-left">{renderJail("yellow")}</div>
        <div className="corner top-right">{renderJail("blue")}</div>
        <div className="corner bottom-left">{renderJail("red")}</div>
        <div className="corner bottom-right">{renderJail("green")}</div>

        {/* Board sides */}
        {renderBoardSide("top", 51)}
        {renderBoardSide("right", 0)}
        {renderBoardSide("bottom", 17)}
        {renderBoardSide("left", 34)}

        {/* Center with home paths */}
        <div className="board-center">
          {renderHomePath("yellow")}
          {renderHomePath("blue")}
          {renderHomePath("red")}
          {renderHomePath("green")}
          <div className="center-logo">
            <div className="parques-title">PARQUÉS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
