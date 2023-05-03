import './header.scss';
import React, { useContext } from 'react';
import { ModeContext } from '../context/modeContext';
import { CalcContext } from '../context/calcContext';


const Header = () => {
    const {mode, setMode} = useContext(ModeContext);
    const {setCalcValue} = useContext(CalcContext);

    const modeRuntime = mode === 'runtime' ? true : false;

    return (
        <header className="header">
            <button 
            className={`header__btn header__btn_run ${modeRuntime? 'active' : ''}`}
            onClick={() => setMode('runtime')}>Runtime</button>
            <button 
            className={`header__btn header__btn_constructor ${modeRuntime? '' : 'active'}`} 
            onClick={() => {
                setMode('edit'); 
                setCalcValue({
                    display: '',
                    calcExpression: '',
                    reset: false,
                    hasError: false
                });
            }}>Constructor</button>
        </header>
    )
}
export default Header;

