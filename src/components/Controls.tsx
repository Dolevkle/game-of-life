// src/components/Controls.tsx
import React, {useState} from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {GridSize, Pattern} from '@/types';
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog.tsx";
import PatternSelector from "@/components/PatternSelector.tsx";

interface ControlsProps {
    running: boolean;
    onStartPause: () => void;
    onClear: () => void;
    onRandomize: () => void;
    simulationSpeed: number;
    setSimulationSpeed: React.Dispatch<React.SetStateAction<number>>;
    gridSize: GridSize;
    setGridSize: React.Dispatch<React.SetStateAction<GridSize>>;
    onSelectPattern: (pattern: Pattern) => void;

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
                                               onSelectPattern,
                                           }) => {

    return (
        <div className={'w-4/5'}>
            <div className="flex space-x-2">
                <Button onClick={onStartPause}>{running ? 'Pause' : 'Start'}</Button>
                <Button variant="secondary" onClick={onClear}>
                    Clear
                </Button>
                <Button variant="secondary" onClick={onRandomize}>
                    Randomize
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="secondary">Patterns</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Select a Pattern</DialogTitle>
                        </DialogHeader>
                        {/* Pattern Selector Component */}
                        <PatternSelector
                            onSelectPattern={(pattern) => {
                                onSelectPattern(pattern);
                            }}
                            gridSize={gridSize}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <div className="mt-4">
                <Label>Simulation Speed ({simulationSpeed} ms)</Label>
                <Slider
                    value={[simulationSpeed]}
                    onValueChange={(value) => setSimulationSpeed(value[0])}
                    min={100}
                    max={5000}
                    step={100}
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
        </div>
    );
};

export default Controls;