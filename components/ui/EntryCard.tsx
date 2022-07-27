import { DragEvent, FC, useContext } from 'react';
import { useRouter } from 'next/router';
import { UIContext } from '../../context/ui';
import { Entry } from '../../interfaces';
import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext)
    const router = useRouter();

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id)

        startDragging();
        // todo: modificar el estado para mostrar que estoy haciendo drag
    }

    const onDragEnd = () => {
        //todo: cancelar el drag
        endDragging();
    }

    const onClickCard = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            sx={{
                marginBottom: 1,
            }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClickCard}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Typography variant="body2">{dateFunctions.getFormatDistanceToNow(entry.createAt)}</Typography>
                </CardActions>

            </CardActionArea>
        </Card>
    )
}
