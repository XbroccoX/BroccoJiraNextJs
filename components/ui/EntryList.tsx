import { FC, useContext, useMemo, DragEvent } from 'react';
import { Paper, List } from '@mui/material';
import { EntryStatus } from '../../interfaces';
import { EntryCard } from './';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';
//STYLES
import styles from './style/EntryList.module.css';


interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    //Context Drag and Drop
    const { isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo(() => entries.filter(item => item.status === status), [entries])

    const onDropEntry = (event: DragEvent) => {
        const id = event.dataTransfer.getData('text')

        const entry = entries.find(e => e._id === id)!;
        entry.status = status
        updateEntry(entry);
        endDragging()

    }

    const allowDrop = (event: DragEvent) => {
        event.preventDefault();
    }


    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{ height: 'calc(100vh - 180px)', overflow: 'auto', backgroundColor: 'transparent', padding: '1px 8px' }} >
                {/* Todo> cambiara dependiendo si estoy haciendo drag o no */}
                <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all 0.3s' }} >
                    {
                        entriesByStatus.map(item => (
                            <EntryCard key={item._id} entry={item} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )

}
