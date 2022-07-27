import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
    | { type: '[Entry] Add-Entry', payload: Entry }
    | { type: '[Entry] delete-Entry', payload: Entry }
    | { type: '[Entry] Entry-Updated', payload: Entry }
    | { type: '[Entry] INITIAL_REFRESH-DATA', payload: Entry[] }


export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {

    switch (action.type) {
        case '[Entry] Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.payload]
            }
        case '[Entry] delete-Entry':
            return {
                ...state,
                entries: state.entries.filter(item => item._id === action.payload._id)
            }
        case '[Entry] Entry-Updated':
            return {
                ...state,
                entries: state.entries.map(entry => {
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status;
                        entry.description = action.payload.description;
                    }
                    return entry;
                })
            }

        case '[Entry] INITIAL_REFRESH-DATA':
            return {
                ...state,
                entries: [...action.payload]
            }

        default:
            return state;
    }

}