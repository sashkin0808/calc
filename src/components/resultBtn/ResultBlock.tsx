import './resultbtn.scss';
import React, { useContext } from 'react';
import { CalcContext } from '../context/calcContext';
import { ModeContext } from '../context/modeContext';
import lastSybmolIsOperationCheck from '../utils/calcCheck';

const ResultBlock = () => {
  const {setCalcValue} = useContext(CalcContext);
  const {mode} = useContext(ModeContext);

  const getResult = () => {
    if (mode === 'edit') return;
    setCalcValue((state) => {
      if (state.hasError || state.calcExpression.length === 0) return state;
      let result;
      let expression = state.calcExpression.replace(",",".");
      if (lastSybmolIsOperationCheck(expression)) {
        result = eval(expression.slice(0, -1)).toString();
      } else {
        result = eval(expression);
      }
      const hasError = result === Infinity;
      result = result.toString();
      result = result.replace(".", ",");
      return {display: result, calcExpression: result, reset: true, hasError};
    });
  };

  return (
    <button className="result_btn" onClick={() => getResult()}>=</button>
  )
};
export default ResultBlock;