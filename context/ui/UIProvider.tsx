import { FC, PropsWithChildren, useReducer } from 'react';
import { UIContext, UIReducer } from "./";

export interface UIState {
    sidemenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isAddingEntry: false,
    isDragging: false,
}

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

    const openSideMenu = () => {
        dispatch({
            type: 'UI - Open Sidebar'
        })
    }

    const closeSideMenu = () => {
        dispatch({
            type: 'UI - Close Sidebar'
        })
    }

    const setIsAddingEntry = (entry: boolean) => {
        dispatch({
            type: 'UI - Add Entry',
            payload: entry
        })
    }

    //FUNCIONES DRAGGING

    const startDragging = () => {
        dispatch({
            type: 'UI - Start Dragging'
        })
    }

    const endDragging = () => {
        dispatch({
            type: 'UI - End Dragging'
        })
    }


    // closeSideMenu

    return (
        <UIContext.Provider value={{
            ...state,
            //
            openSideMenu,
            closeSideMenu,
            //
            setIsAddingEntry,
            //
            startDragging,
            endDragging,
        }}>
            {children}
        </UIContext.Provider>
    )
}
