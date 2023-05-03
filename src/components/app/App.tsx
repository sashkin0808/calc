import './App.scss';
import React, { useState } from 'react';
import { ModeContext } from '../context/modeContext';
import { CalcProvider } from '../context/calcContext';
import BlocksStorage from '../blocksStorage/BlocksStorage';
import Constructor from '../constructor/Constructor';
import DisplayBlock from '../display/Display';
import OperationBlock from '../operation/OperationBlock';
import KeyboardBlock from '../keyboard/KeyboardBlock';
import ResultBlock from '../resultBtn/ResultBlock';
import Header from '../header/Header';
import { iBlock, DragStartHandler } from '../../models';

function App() {
  const {mode} = React.useContext(ModeContext);

  const [blocks, setBlocks] = useState([
    {id: 1, className: 'display', content: <DisplayBlock/>, disabled: false, order: -1},
    {id: 2, className: 'operation', content: <OperationBlock/>, disabled: false, order: 0},
    {id: 3, className: 'keyboard', content: <KeyboardBlock/>, disabled: false, order: 0},
    {id: 4, className: 'result', content: <ResultBlock/>, disabled: false, order: 0},
  ]);
  const [currentDrag, setCurrentDrag] = useState<iBlock|undefined>(undefined);

  const dragStartHandler: DragStartHandler = (e, block) => {
    setCurrentDrag(block);
  };
  return (
    <div className={`container ${mode}`}>
      <CalcProvider>
        <Header/>
        <BlocksStorage 
          blocks={blocks} 
          onDragStart={dragStartHandler} />
        <Constructor 
          currentDrag={currentDrag as iBlock} 
          onDragStart={dragStartHandler} 
          storageBlocks={blocks} 
          setStorageBlocks={setBlocks}/>
      </CalcProvider>
    </div>
  );
}
export default App;
