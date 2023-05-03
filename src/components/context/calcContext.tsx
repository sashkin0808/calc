import React, { useState } from "react";

const startValue = {
    display: '',
    calcExpression: '',
    reset: false,
    hasError: false
};

const CalcContext = React.createContext<{calcValue: typeof startValue, setCalcValue: React.Dispatch<React.SetStateAction<typeof startValue>>}>({
    calcValue: startValue,
    setCalcValue: () => {}
});

const CalcProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [calcValue, setCalcValue] = useState(startValue);
    return (
        <CalcContext.Provider value={{calcValue, setCalcValue}}>
            {children}
        </CalcContext.Provider>
    )
}

export {CalcContext, CalcProvider};