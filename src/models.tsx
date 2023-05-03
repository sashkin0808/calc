export interface iBlock {
    id: number, 
    className: string, 
    content: React.ReactElement, 
    disabled: boolean, 
    order: number
}
export type DragStartHandler = (e: React.DragEvent, block: iBlock) => void;
