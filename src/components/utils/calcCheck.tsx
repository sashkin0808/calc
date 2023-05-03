export default function lastSybmolIsOperationCheck(str: string): boolean {
    const operationBtns = ['/', '*', '+', '-'];
    const lastExpressionSymbol = str[str.length - 1];
    if (operationBtns.includes(lastExpressionSymbol)) {
        return true;
    } 
    return false;
};
