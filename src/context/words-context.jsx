import { useContext, createContext, useState, useEffect } from 'react';
import Axios from 'axios';

const WordsContext = createContext();

export function useWordsContext() {
    return useContext(WordsContext);
}

export function WordsContextProvider({ children }) {
    const [words, setWords] = useState();

    useEffect(() => {
        (async function() {
            const response = await Axios.get('https://studyfil-api.onrender.com/messages/words/inappropriate');
            setWords(response.data.words);
        })();
    
    }, [])

    return (
        <WordsContext.Provider value={{ words }}>
            { children }
        </WordsContext.Provider>
    )
}