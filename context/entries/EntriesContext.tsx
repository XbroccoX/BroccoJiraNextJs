import { createContext } from 'react';
import { Entry } from '../../interfaces';
interface ContextProps {
    entries: Entry[];
    addNewEntry: (description: string) => void;
    deleteEntry: (entry: Entry) => void;
    updateEntry: (entry: Entry, showSnackBar?: boolean | undefined) => void;

}
export const EntriesContext = createContext({} as ContextProps)