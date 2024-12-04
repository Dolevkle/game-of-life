// src/components/Controls.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GridSize } from '../types';

interface ControlsProps {
    running: boolean;
    onStartPause: () => void;
    onClear: () => void;
    onRandomize: () => void;
    simulationSpeed: number;
    setSimulationSpeed: React.Dispatch<React.SetStateAction<number>>;
    gridSize: GridSize;
    setGridSize: React.Dispatch<React.SetStateAction<GridSize>>;
}

const Controls: React.FC<ControlsProps> = ({
                                               running,
                                               onStartPause,
                                               onClear,
                                               onRandomize,
                                               simulationSpeed,
                                               setSimulationSpeed,
                                               gridSize,
                                               setGridSize,
                                           }) => {
    return (
        <>
            <div className="flex space-x-2">
                <Button onClick={onStartPause}>{running ? 'Pause' : 'Start'}</Button>
                <Button variant="secondary" onClick={onClear}>
                    Clear
                </Button>
                <Button variant="secondary" onClick={onRandomize}>
                    Randomize
                </Button>
            </div>
            <div className="mt-4">
                <Label>Simulation Speed ({simulationSpeed} ms)</Label>
                <Slider
                    value={[simulationSpeed]}
                    onValueChange={(value) => setSimulationSpeed(value[0])}
                    min={50}
                    max={1000}
                    step={50}
                />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                    <Label>Rows</Label>
                    <Input
                        type="number"
                        value={gridSize.rows}
                        onChange={(e) =>
                            setGridSize({ ...gridSize, rows: e.target.valueAsNumber})
                        }
                        min={10}
                        max={100}
                    />
                </div>
                <div>
                    <Label>Columns</Label>
                    <Input
                        type="number"
                        value={gridSize.cols}
                        onChange={(e) =>
                            setGridSize({ ...gridSize, cols: e.target.valueAsNumber })
                        }
                        min={10}
                        max={100}
                    />
                </div>
            </div>
        </>
    );
};

export default Controls;