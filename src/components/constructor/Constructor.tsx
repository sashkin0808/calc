import './constructor.scss';
import React, { useState, useContext } from 'react';
import { ModeContext } from '../context/modeContext';
import { iBlock, DragStartHandler } from '../../models';

interface ConstructorProps {
  currentDrag: iBlock,
  onDragStart: DragStartHandler,
  storageBlocks: iBlock[],
  setStorageBlocks: React.Dispatch<React.SetStateAction<iBlock[]>>
}

const Constructor = ({currentDrag, onDragStart, storageBlocks, setStorageBlocks}: ConstructorProps) => {
  const {mode} = useContext(ModeContext);
  const [isActive, setIsActive] = useState(false);
  const [blockUnderDrag, setBlockUnderDrag] = useState<iBlock|null>(null);
  const [blocks, setBlocks] = useState<iBlock[]>([]);

  const toggleBlockDisabled = (elClass: string, val: boolean) => {
    const newState = storageBlocks.map((el) => {
      if (el.className === elClass) {
        return {...el, disabled: val};
      }
      return el;
    });
    setStorageBlocks(newState);
  };

  function dragBlockOverField(e: React.DragEvent): void {
      e.preventDefault();
      setIsActive(true);
  }
  function dragBlockLeaveField(e: React.DragEvent): void {
    setIsActive(false);
  }
  function dragOverEl(e: React.DragEvent, block: iBlock): void {
    e.preventDefault();
    if (block.className !== 'display' && block.className !== currentDrag.className && currentDrag.order !== block.order - 1) {
      setBlockUnderDrag(block);
    }
  }
  function dragLeaveEl(e: React.DragEvent, block: iBlock): void {
    setBlockUnderDrag(null);
  }
  function dropBlockHandler(e: React.DragEvent) {
    e.preventDefault();
    setIsActive(false);
    setBlockUnderDrag(null);
    const isIncluded = blocks.includes(currentDrag);
    if (!isIncluded) {
      if (currentDrag.order === 0) {
         currentDrag.order =  blocks.length === 0 ? 1 : blocks[blocks.length-1].order + 1;
      }
      blocks.push(currentDrag);
      toggleBlockDisabled(currentDrag.className, true);
    } 
    setBlocks(() => {
      if (blockUnderDrag) {
        let minOrder = blockUnderDrag.order;
        return blocks.map((el, i) => {
          if (el.order < minOrder) {
            return el;
          } else {
            if (el.className === currentDrag.className) {
              return {...el, order: blockUnderDrag.order}
            }
            minOrder++;
            return {...el, order: minOrder}
          }
        });
      } else if (isIncluded) {
        let newOrder = currentDrag.order -1;
        const currentDragPos = blocks.indexOf(currentDrag);
        return blocks.map((el,i) => {
          if (i < currentDragPos) {
            return el;
          } else {
            if (el.className === currentDrag.className) {
              return {...el, order: blocks[blocks.length-1].order}
            }
            newOrder++;
            return {...el, order: newOrder}
          }
        });
      } else {
        return blocks;
      }
    });
  }
  function deleteBlock(e: React.MouseEvent, block: iBlock) {
    if (mode === 'runtime') return;
    e.preventDefault();
    const deleteIndex = blocks.indexOf(block);
    setBlocks([
      ...blocks.slice(0, deleteIndex),
      ...blocks.slice(deleteIndex + 1)
    ]);
    toggleBlockDisabled(block.className, false);
  }

  let constructorClasses = 'constructor';
  if (isActive) {
    if (blocks.length === 0 ) {
      constructorClasses += ' first_drag'
    } else if (!blockUnderDrag) {
      constructorClasses += ' to_bottom'
    }
  } else if (blocks.length === 0 ) {
    constructorClasses += ' empty'
  }
  return (
    <div 
      className={constructorClasses}
      onDragOver={(e) => dragBlockOverField(e)}
      onDragLeave={(e) => dragBlockLeaveField(e)}
      onDrop={(e) => dropBlockHandler(e)}
    >
      {blocks.length === 0 ? 
      <p className="constructor__message"><strong>Перетащите сюда</strong>любой элемент из левой панели</p> 
      : blocks.sort((a, b) => a.order - b.order).map(block => {
          let addedClass = blockUnderDrag && block.className === blockUnderDrag.className ? 'before' : '';
          return (
            <div 
              key={block.id}
              draggable={block.className !== 'display' &&  mode === 'edit'}
              className={`blocks__item ${block.className} ${addedClass}`}
              onDragStart={(e) => onDragStart(e, block)}
              onDragOver={(e) => dragOverEl(e, block)}
              onDragLeave={(e) => dragLeaveEl(e, block)}
              onDoubleClick={(e) => deleteBlock(e, block)}>
              {block.content}
            </div>
          )
        })
      }
    </div>
  )
};
export default Constructor;