import { createContext } from 'react';
interface ContextProps {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
    //Methods
    openSideMenu: () => void;
    closeSideMenu: () => void;
    setIsAddingEntry: (entry: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;

}
export const UIContext = createContext({} as ContextProps)