import { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: '10px 20px',
    textAlign: 'center',
    borderRadius: '20px',
    color: theme.palette.text.secondary,
  }));

export function ChosenTopics({ chosenTopics, setChosenTopics }) {

    let topicsArr = [];

    function removeItem(event) {
        let element = event.target;
        let id = element.getAttribute('data-topic-id');
        let temp = {...chosenTopics};
        delete temp[id];
        setChosenTopics(temp);
    }

    if (Object.keys(chosenTopics).length > 0) {
        for (const row in chosenTopics) {
            topicsArr.push(
                <Item key={chosenTopics[row].id} style={{ margin: '0px 20px 20px 0'}} sx={{ background: '#CDE3F9', outline: '1px solid #52759A' }}>
                    <Typography variant="p" sx={{ fontWeight: "bold", fontSize: '1rem' }}>
                        {chosenTopics[row].name}
                    </Typography>
                    <Button onClick={removeItem} data-topic-id={chosenTopics[row].name} sx={{padding: '0 5px', margin: '0 0 0 5px', minWidth: 'fit-content', fontWeight: 400 }}>X</Button>
                </Item>
            )
        }
    }

    useEffect(() => {
        console.log(chosenTopics);
    }, [chosenTopics])

    return (
        <>
            <Typography variant="h6">Your chosen topics:</Typography>
            <Stack direction="row" flexWrap="wrap" >
                {topicsArr.length > 0 ? topicsArr.map((topic) => topic) : <p style={{ color: 'gray'}}>No topic/s selected</p>}
            </Stack>
        </>
    )
}