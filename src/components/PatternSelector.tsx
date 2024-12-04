// src/components/PatternSelector.tsx
import React from 'react';
import {patterns} from './patterns.tsx';
import {Pattern, GridSize} from '../types';
import {Button} from '@/components/ui/button';

interface PatternSelectorProps {
    onSelectPattern: (pattern: Pattern) => void;
    gridSize: GridSize;
}

const PatternSelector: React.FC<PatternSelectorProps> = ({onSelectPattern}) => {
    return (
        <div className="pattern-selector">
            <div className="flex flex-wrap gap-2">
                {Object.values(patterns).map((pattern) => (
                    <Button
                        key={pattern.name}
                        variant="outline"
                        onClick={() => onSelectPattern(pattern)}
                        className="flex-1 min-w-[150px] max-w-[200px] text-center"
                    >
            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
              {pattern.name}
            </span>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default PatternSelector;