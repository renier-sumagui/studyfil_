import { useState, useEffect, useRef } from 'react';
import Axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';

export function SearchTopicsForm({ setChosenTopics, topicLabel, chosenTopics }) {
    const [topicValue, setTopicValue] = useState(null);
    const [inputValue, setInputValue] = useState('');


    function handleSubmit(e) {
        e.preventDefault();
        if (topicValue) {
            let temp = chosenTopics;
            let newTopics = {...temp, [`${topicValue.name}`]: { name: topicValue.name, id: topicValue.id }};
            setChosenTopics(newTopics);
        }
    }
    
    return (
        <Box 
            component="form" 
            noValidate 
            autoComplete="off"      
            sx={{
                my: 1
            }}
            onSubmit={handleSubmit}
        >   
            <div className="flex alignCenter">
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={topicValue}
                    onChange={(event, newValue) => {
                        setTopicValue(newValue);
                    }}
                    inputValue={inputValue}
                    onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    options={topicLabel}
                    sx={{ width: 300, display: 'inline-block' }}
                    renderInput={(params) => <TextField {...params} label="Topics" />}
                />
                {topicValue && <Button sx={{ verticalAlign: 'middle', height: 30, ml: 1 }} type="submit" variant="contained">Add</Button>}
            </div>
        </Box>
    )
}