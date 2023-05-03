import React from 'react';
import { iBlock, DragStartHandler } from '../../models';

interface BlocksStorageProps {
    blocks: iBlock[],
    onDragStart: DragStartHandler
}

const BlocksStorage = ({onDragStart, blocks}: BlocksStorageProps): JSX.Element => {
    return (
        <div className="blocks">
            {blocks.map(block => {
                return (
                <div className={`blocks__item ${block.className}`}
                    style={block.disabled ? {opacity: 0.5, pointerEvents: 'none'} : {}}
                    key={block.id}
                    draggable="true" 
                    onDragStart={(e) => onDragStart(e, block)} >
                    {block.content}
                </div>
                )
            })}
        </div>
    )
};
export default BlocksStorage;