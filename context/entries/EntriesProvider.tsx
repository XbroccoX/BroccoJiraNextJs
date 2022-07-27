import { FC, PropsWithChildren, useEffect, useReducer } from 'react';
import { Entry } from '../../interfaces';
import { useSnackbar } from 'notistack';
import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '../../apis';

export interface EntriesState {
    entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({
            type: '[Entry] Add-Entry',
            payload: data
        })
    }
    const deleteEntry = async (entry: Entry) => {

        const { data } = await entriesApi.post<Entry>(`/entries`, { id: entry._id });
        dispatch({
            type: '[Entry] delete-Entry',
            payload: data
        })
    }

    const updateEntry = async (entry: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${entry._id}`, { description: entry.description, status: entry.status });

            dispatch({
                type: '[Entry] Entry-Updated',
                payload: data
            })
            if (showSnackbar)
                enqueueSnackbar('Entrada actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                });





        } catch (error) {
            console.log({ error })
        }
    }

    const refreshEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({
            type: '[Entry] INITIAL_REFRESH-DATA',
            payload: data
        })
    }

    useEffect(() => {
        refreshEntries();
    }, []);


    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            deleteEntry,
            updateEntry

        }}>
            {children}
        </EntriesContext.Provider>
    )
}