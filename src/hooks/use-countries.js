import Axios from 'axios';

async function useCountries() {
    let response = await Axios.get('https://studyfil-api.onrender.com/country/all');
    return response.data;
}

export { useCountries };