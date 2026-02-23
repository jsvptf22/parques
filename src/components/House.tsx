import React from "react";
import "./Board.css";

interface HouseProps {
  color: string;
  houseNumber: number; // Número de la casa (1, 2, 3, n)
  totalHouses: number; // Total de casas en el tablero
}

interface CellConfig {
  ids?: (number | string)[]; // IDs de cada celda (números o "●")
}

/**
 * Componente House - Renderiza una casa con cuadrícula 4x4 (4 filas, 4 columnas)
 * @param color - Color de fondo de la casa
 * @param houseNumber - Número de la casa (1, 2, 3, n)
 *
 * Sistema de IDs:
 * - Cada subcelda tiene un ID global calculado como: houseNumber * 100 + id_interno
 * - Ejemplo: Casa #2, celda interna 10 → ID global = 210 (2 * 100 + 10)
 *
 * Distribución de celdas en cuadrícula 4x4 (16 celdas total)
 */
const House: React.FC<HouseProps> = ({ color, houseNumber, totalHouses }) => {
  // Define los IDs internos de cada celda (se multiplicarán por houseNumber * 10)
  const cellConfigBase: Record<number, CellConfig> = {
    1: { ids: [26, 25, 24] }, // Columna izquierda
    2: { ids: [9, 10] },
    3: { ids: [11, 12, 13] },
    4: { ids: [14, 15, 16, 17] }, // Empieza desde 1

    5: { ids: [23, 22, 21] }, // Columna izquierda
    6: { ids: [8, 7, 6] },
    7: { ids: [] }, // Vacía
    8: { ids: [] }, // Vacía

    9: { ids: [19, 18, 1] }, // Columna izquierda
    10: { ids: [5, 4, 3, 2] },
    11: { ids: [] }, // Vacía
    12: { ids: [] }, // Vacía

    13: { ids: [] }, // Vacía
    14: { ids: [] }, // Vacía
    15: { ids: [] }, // Vacía
    16: { ids: [] }, // Vacía
  };

  // Calcular IDs globales basados en el número de casa
  const cellConfig: Record<number, CellConfig> = Object.entries(
    cellConfigBase,
  ).reduce(
    (acc, [position, config]) => {
      acc[Number(position)] = {
        ids: (config.ids || []).map((id) => {
          if (typeof id === "number") {
            // IDs del 1 al 17: camino principal (17 IDs por casa)
            // IDs del 18 al 26: zona final/meta (9 IDs por casa)
            if (id <= 17) {
              // Cada casa tiene 17 IDs consecutivos en el camino principal
              return (houseNumber - 1) * 17 + id;
            } else {
              // IDs de meta: después de todos los caminos de todas las casas
              // totalHouses * 17 + (houseNumber - 1) * 9 + (id - 17)
              return totalHouses * 17 + (houseNumber - 1) * 9 + (id - 17);
            }
          }
          return id;
        }),
      };
      return acc;
    },
    {} as Record<number, CellConfig>,
  );

  const renderCell = (position: number) => {
    const config = cellConfig[position];
    const ids = config.ids || [];

    // Celdas vacías
    if (ids.length === 0) {
      return <div key={position} className="empty-cell"></div>;
    }

    // Determinar si la celda debe ser vertical
    const isVertical = [1, 5, 9, 6, 10].includes(position);

    // Determinar si la celda debe ser en diagonal 45°
    const isDiagonal45 = [2].includes(position);

    // Celdas con sub-celdas
    return (
      <div
        key={position}
        className={`path-mini-cell ${isVertical ? "vertical" : ""} ${isDiagonal45 ? "diagonal-45" : ""}`}
        data-house={houseNumber}
        data-cell-position={position}
      >
        {ids.map((id, i) => (
          <div
            key={i}
            className="segment"
            data-segment-index={i}
            data-global-id={id}
            data-house={houseNumber}
          >
            {id}
          </div>
        ))}
      </div>
    );
  };

  // Renderizar cuadrícula 4x4 (16 celdas)
  return (
    <div className="corner">
      <div
        className="corner-grid corner-grid-4x4"
        style={{ background: color }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
          renderCell,
        )}
      </div>
    </div>
  );
};

House.displayName = "House";

export default House;
