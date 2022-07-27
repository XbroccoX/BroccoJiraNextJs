import { ChangeEvent, useState, useContext } from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

    //Context state AddNewEntry
    const { addNewEntry } = useContext(EntriesContext);
    //Context UI
    const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);


    const [inputValue, setInputValue] = useState(' ');
    const [touched, setTouched] = useState(false);



    const onTextFieldChanges = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const onSave = () => {
        if (inputValue.length === 0) return;
        addNewEntry(inputValue);
        setIsAddingEntry(false);
        setTouched(false);
        setInputValue('');

    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 1 }} >

            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva entrada'
                            autoFocus
                            multiline
                            label='Nueva entrada'
                            helperText={inputValue.length <= 0 && touched}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={onTextFieldChanges}
                            onBlur={() => setTouched(!touched)}

                        />
                        <Box display='flex' justifyContent='space-between' >
                            <Button variant="text"
                                onClick={() => setIsAddingEntry(!isAddingEntry)}
                            >
                                Cancelar
                            </Button>
                            <Button variant="outlined" color="secondary" endIcon={<SaveOutlinedIcon />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>
                        </Box>

                    </>
                )
                    :
                    <>
                        <Button fullWidth variant='outlined' startIcon={<AddCircleOutlineOutlinedIcon />}
                            onClick={() => setIsAddingEntry(!isAddingEntry)}
                        >
                            Agregar Tarea
                        </Button>
                    </>

            }
        </Box>
    )
}
