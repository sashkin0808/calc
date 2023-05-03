import './operation.scss';
import React, { useContext } from 'react';
import { CalcContext } from '../context/calcContext';
import { ModeContext } from '../context/modeContext';
import lastSybmolIsOperationCheck from '../utils/calcCheck';

const OperationBlock = () => {
  const {setCalcValue} = useContext(CalcContext);
  const {mode} = useContext(ModeContext);

  const changeValue = (el:string) => {
    if (mode === 'edit') return;

    setCalcValue((state) => {
      if (state.hasError) return state;
      if (lastSybmolIsOperationCheck(state.calcExpression)) {
        const expression = state.calcExpression.toString();
        return {...state, calcExpression: expression.slice(0, -1) + el, reset: true};
      }
      return {...state, calcExpression: state.calcExpression + el, reset: true};
    });
  };

  const btnsValue = [
    {text: '/', val: '/'},
    {text: 'x', val: '*'},
    {text: '-', val: '-'},
    {text: '+', val: '+'}
  ];
  return (
    <>
      {btnsValue.map(el => {
        return (
          <button 
            key={el.text}
            onClick={() => changeValue(el.val)}
            className="keyboard_btn">{el.text}</button>
        )
      })}
    </>
  )
};
export default OperationBlock;