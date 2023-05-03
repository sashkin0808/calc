import './display.scss'
import React from 'react';
import { ModeContext } from '../context/modeContext';
import { CalcContext } from '../context/calcContext';

const DisplayBlock = () => {
  const {mode} = React.useContext(ModeContext);
  const {calcValue} = React.useContext(CalcContext);

  let value = (mode === 'edit' || calcValue.display.length === 0) ? '0' : calcValue.display;
  let displayClass = '';
  if (calcValue.hasError) {
    value = 'Не определено';
    displayClass = 'text_size'
  } else if (value.length >= 9 ) {
    displayClass = 'small_size'
  }
  return (
    <span className={displayClass}>{value}</span>
  )
};
export default DisplayBlock;