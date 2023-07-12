import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import { SearchTopicsForm } from 'features/choose-topics';
import { ChosenTopics } from 'features/choose-topics';
import { submitTopics } from 'features/settings';

const theme = createTheme();

export function ChooseTopicsPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [chosenTopics, setChosenTopics] = useState({});
    const [topics, setTopics] = useState({});
    let [topicLabel, setTopicLabel] = useState([]);

    (async function() {
        const response = await Axios.get('http://localhost:8000/user/check', { withCredentials: true });
        if (response.data.isLoggedIn) {
            setUser(response.data.user);
            setIsLoggedIn(true);
        } else {
            navigate('/signin');
        }
    })();


    async function handleNext() {
        await submitTopics(user.id, chosenTopics);
        navigate('/groups/explore');
    }

    const page = (
        <ThemeProvider theme={theme}>
            <Grid container sx={{ height: '100%' }}>
                <CssBaseline />
                <AppBar elevation={0} sx={{ px: 10 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', margin: '0' }} color="inherit" noWrap gutterBottom>
                        Choose Topics
                    </Typography>
                </AppBar>
                <Box sx={{ width: '100%', mx: 10, mt: 6 }} position="relative">
                    <SearchTopicsForm setChosenTopics={setChosenTopics} chosenTopics={chosenTopics} topicLabel={topicLabel} />
                    <ChosenTopics chosenTopics={chosenTopics} setChosenTopics={setChosenTopics} />
                    <Button 
                        sx={{ position: 'absolute', bottom: 20, right: 0, borderRadius: '20px' }} 
                        disabled={Object.keys(chosenTopics).length > 0 ? false : true} 
                        variant="contained" 
                        endIcon={<NavigateNextIcon />}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </Box>
            </Grid>
        </ThemeProvider>
    );

    useEffect(() => {
        (async function() {
            const response = await Axios.get('http://localhost:8000/topics/all', { withCridentials: true });
            const allTopics = response.data.topics;
            const tempAllTopics = allTopics.map((topic) => {
                return { label: topic.name, id: topic.id, name: topic.name };
            });
            setTopicLabel(tempAllTopics);

            let tempTopics = {};
            for (let pointer = 0; pointer < allTopics.length; pointer++) {
                let id = allTopics[pointer].id;
                let name = allTopics[pointer].name;
                tempTopics[id] = { name: name };
            }
            setTopics(tempTopics);
        })();
    }, [])

    return (
        isLoggedIn ? page : null 
    )
}