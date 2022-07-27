import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import mongoose from "mongoose";
import { GetServerSideProps } from 'next'
import { Layout } from "../../components/layouts";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../database";
import { dateFunctions } from "../../utils";
// MATERIAL UI
import Grid from '@mui/material/Grid'
import { capitalize, Card, CardHeader, CardContent, TextField, CardActions, FormControl, FormLabel, FormHelperText, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material';
import Button from '@mui/material/Button';
//ICONS MUI
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { EntriesContext } from "../../context/entries";


const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {



    const { updateEntry, deleteEntry } = useContext(EntriesContext);
    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);

    const onInputValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        if (inputValue.trim().length === 0) return
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue,
        }
        updateEntry(updatedEntry, true);
    }

    const onDelete = () => {
        const deletedEntry: Entry = {
            ...entry,
            _id: entry._id
        }
        console.log(deletedEntry);
        // deleteEntry(deletedEntry);
    }

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched]);

    return (
        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid container spacing={2} justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={`Creada ${dateFunctions.getFormatDistanceToNow(entry.createAt)}`}

                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nueva Entrada"
                                autoFocus
                                multiline
                                label='Nueva Entrada'
                                value={inputValue}
                                onChange={onInputValueChange}
                                helperText={isNotValid ? 'Ingrese un valor' : null}
                                onBlur={() => setTouched(true)}
                                error={isNotValid}
                            />


                            <FormControl component="fieldset">
                                <FormLabel component="legend">Estado:"</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        validStatus.map(item => (
                                            <FormControlLabel
                                                key={item}
                                                value={item}
                                                control={<Radio />}
                                                label={capitalize(item)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                                <FormHelperText></FormHelperText>
                            </FormControl>



                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >Save</Button>
                        </CardActions>

                    </Card>
                </Grid>
            </Grid>

            <IconButton
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
                onClick={onDelete}
            >
                <DeleteOutlineOutlinedIcon />
            </IconButton>




        </Layout>
    );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntrybyId(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false, // porque la pagina sigue existiendo pero no tiene el id de mongo
            }
        }
    }


    return {
        props: {
            entry
        }
    }
}


export default EntryPage
