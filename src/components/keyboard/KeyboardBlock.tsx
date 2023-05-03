import './keyboard.scss';
import React, { useContext } from 'react';
import { CalcContext } from '../context/calcContext';
import { ModeContext } from '../context/modeContext';
import lastSybmolIsOperationCheck from '../utils/calcCheck';

const KeyboardBlock = () => {
  const {setCalcValue} = useContext(CalcContext);
  const {mode} = useContext(ModeContext);

  const changeValue = (el: string) => {
    if (mode === 'edit') return;
    setCalcValue((state) => {
      if (el === ',' && (state.reset || state.display === '') ) el = '0,';
      if (state.reset) {
        if (el === '0,' || state.hasError || lastSybmolIsOperationCheck(state.calcExpression) === false) {
          return {...state, display: el, calcExpression: el, reset: false, hasError: false};
        } else {
          return {...state, display: el, calcExpression: state.calcExpression + el, reset: false, hasError: false};
        }
      } 
      if (state.display.length >= 19 && state.display.indexOf(',') !== -1) {
        const whole = state.display.split(',')[0].length;
        const freeLength = 19 - whole - 1;
        const displayExpression = Number(state.display.replace(",",".")).toFixed(freeLength).replace(".",",");
        return {...state, display: displayExpression, calcExpression: state.calcExpression + el, hasError: false};
      }
      return {...state, display: state.display + el, calcExpression: state.calcExpression + el, hasError: false};
    });
  };

  const keyboardBtnsValue = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
  return (
    <>
      {keyboardBtnsValue.map(el => {
        return (
          <button 
            key={el}
            onClick={() => changeValue(el)}
            className="keyboard_btn">{el}</button>
        )
      })}
    </>
  );
};
export default KeyboardBlock;