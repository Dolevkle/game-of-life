// src/App.tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {produce} from 'immer';
import Grid from './components/Grid';
import Controls from './components/Controls';
import {Grid as GridType, GridSize, Pattern} from './types';

const App: React.FC = () => {
    const [gridSize, setGridSize] = useState<GridSize>({ rows: 30, cols: 50 });
    const [grid, setGrid] = useState<GridType>([]);
    const [running, setRunning] = useState(false);
    const [simulationSpeed, setSimulationSpeed] = useState(500);
    const [generation, setGeneration] = useState(0);
    const cellSize = 20;

    const runningRef = useRef(running);
    runningRef.current = running;

    const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

    useEffect(() => {
        if (selectedPattern) {
            handleSelectPattern(selectedPattern);
        } else {
            // Clear the grid
            setGrid(
                Array.from({ length: gridSize.rows }, () =>
                    Array.from({ length: gridSize.cols }, () => false)
                )
            );
            setGeneration(0);
        }
    }, [gridSize]);

    useEffect(() => {
        if(runningRef.current) {
           setRunning(false);
        }
    }, [simulationSpeed]);

    const toggleCellState = (row: number, col: number) => {
        setGrid((prevGrid) =>
            produce(prevGrid, (gridCopy) => {
                gridCopy[row][col] = !prevGrid[row][col];
            })
        );
    };

    const runSimulation = useCallback(() => {
        if (!runningRef.current) return;

        setGrid((prevGrid) => {
            return produce(prevGrid, (gridCopy) => {
                for (let i = 0; i < gridSize.rows; i++) {
                    for (let j = 0; j < gridSize.cols; j++) {
                        const neighborPositions = [
                            [-1, -1],
                            [-1, 0],
                            [-1, 1],
                            [0, -1],
                            [0, 1],
                            [1, -1],
                            [1, 0],
                            [1, 1],
                        ];

                        const neighbors = neighborPositions.filter(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            return (
                                newI >= 0 &&
                                newI < gridSize.rows &&
                                newJ >= 0 &&
                                newJ < gridSize.cols &&
                                prevGrid[newI][newJ]
                            );
                        }).length;

                        if (prevGrid[i][j] && (neighbors < 2 || neighbors > 3)) {
                            // cell dies under or over population
                            gridCopy[i][j] = false;
                        } else if (!prevGrid[i][j] && neighbors === 3) {
                            // cell become alive reproduction
                            gridCopy[i][j] = true;
                        }
                    }
                }
            });
        });
        setGeneration((gen) => gen + 1);

        setTimeout(runSimulation, simulationSpeed);
    }, [gridSize, simulationSpeed]);

    const handleStartPause = () => {
        setRunning((prev) => !prev);
        if (!running) {
            runningRef.current = true;
            runSimulation();
        }
    };

    const handleClear = () => {
        setGrid(
            Array.from({ length: gridSize.rows }, () =>
                Array.from({ length: gridSize.cols }, () => false)
            )
        );
        setGeneration(0);
    };

    const handleRandomize = () => {
        setGrid(
            Array.from({ length: gridSize.rows }, () =>
                Array.from({ length: gridSize.cols }, () => Math.random() > 0.7)
            )
        );
        setGeneration(0);
    };

    const handleSelectPattern = (pattern: Pattern) => {
        setRunning(false);
        setSelectedPattern(pattern);

        // Calculate the starting position to center the pattern
        const startRow = Math.floor((gridSize.rows - pattern.height) / 2);
        const startCol = Math.floor((gridSize.cols - pattern.width) / 2);

        // Apply the pattern to the grid
        setGrid(
            Array.from({ length: gridSize.rows }, () =>
                Array.from({ length: gridSize.cols }, () => false)
            )
        );

        setGrid((prevGrid) =>
            produce(prevGrid, (gridCopy) => {
                pattern.cells.forEach(([rowOffset, colOffset]) => {
                    const row = startRow + rowOffset;
                    const col = startCol + colOffset;
                    if (
                        row >= 0 &&
                        row < gridSize.rows &&
                        col >= 0 &&
                        col < gridSize.cols
                    ) {
                        gridCopy[row][col] = true;
                    }
                });
            })
        );
        setGeneration(0);
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Game of Life</h1>
            <Controls
                running={running}
                onStartPause={handleStartPause}
                onClear={handleClear}
                onRandomize={handleRandomize}
                simulationSpeed={simulationSpeed}
                setSimulationSpeed={setSimulationSpeed}
                gridSize={gridSize}
                setGridSize={setGridSize}
                onSelectPattern={handleSelectPattern} // Add this prop

            />
            <p className="mt-4">Generation: {generation}</p>
            <div className="mt-4">
                {grid.length > 0 &&
                <Grid grid={grid} toggleCellState={toggleCellState} cellSize={cellSize} />}
            </div>
        </div>
    );
};

export default App;