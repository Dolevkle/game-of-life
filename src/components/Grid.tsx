// src/components/Grid.tsx
import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Grid as GridType } from '../types';

interface GridProps {
    grid: GridType;
    toggleCellState: (row: number, col: number) => void;
    cellSize: number;
}

const Grid: React.FC<GridProps> = ({ grid, toggleCellState, cellSize }) => {
    const handleCellClick = (row: number, col: number) => {
        toggleCellState(row, col);
    };

    return (
        <Stage width={grid[0].length * cellSize} height={grid.length * cellSize}>
            <Layer>
                {grid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                        <Rect
                            key={`${rowIndex}-${colIndex}`}
                            x={colIndex * cellSize}
                            y={rowIndex * cellSize}
                            width={cellSize}
                            height={cellSize}
                            fill={cell ? '#333' : '#fff'}
                            stroke="#ddd"
                            strokeWidth={1}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        />
                    ))
                )}
            </Layer>
        </Stage>
    );
};

export default Grid;