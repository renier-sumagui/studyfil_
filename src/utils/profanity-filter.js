async function profanityFilter(string, words) {
    const reEscape = s => s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const special = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    // const response = await Axios.get('http://localhost:8000/messages/words/inappropriate');
    /* Define the list of bad words */

    const badWords = words;

    const badWordsRE = new RegExp(badWords.map(reEscape).join('|'), 'gi');

    /* Split the string into an array of words */
    const stringArray = string.split(' ');

    /* Find the bad words in the sentence */
    const badWordsOnSentence = [];
    for (let i = 0; i < stringArray.length; i++) {
        const word = stringArray[i].toLowerCase();
        for (let key in badWords) {
            if (special.test(word)) {
                if (word.match(badWords[key])) {
                    badWordsOnSentence.push(badWords[key]);
                }
            } else if (word == badWords[key]){
                badWordsOnSentence.push(badWords[key]);
            }
        }
    }

    /* Create a regular expression to match the bad words found */
    const badWordsOnSentenceRE = new RegExp(badWordsOnSentence.map(reEscape).join('|'), 'gi');

    /* Replace the bad words with uppercase versions */
    const newString = string.replace(badWordsOnSentenceRE, function (x) {
        let asterisk = ''
        for (let i = 0; i < x.length; i++) {
            asterisk += '*'
        }
        return asterisk;
    });
    
    if (newString !== string) {
        return newString;
    } else {
        return string;
    }
}
export { profanityFilter };