import React, { useState } from "react";

interface ModeContextProps {
    mode: 'edit'|'runtime',
    setMode: React.Dispatch<React.SetStateAction<'edit'|'runtime'>>;
};

const ModeContext = React.createContext<ModeContextProps>({
    mode: 'edit',
    setMode: () => {}
});

const ModeProvider = ({children}: {children: React.ReactNode}): JSX.Element => {
    const [mode, setMode] = useState('edit' as 'edit'|'runtime');
    return (
        <ModeContext.Provider value={{mode, setMode}}>
            {children}
        </ModeContext.Provider>
    )
}

export {ModeContext, ModeProvider};