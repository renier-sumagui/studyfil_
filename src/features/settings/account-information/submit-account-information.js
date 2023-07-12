import Axios from 'axios';

async function submitAccountInformation(userId, firstName, lastName) {
    
    let tempFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

    let tempLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

    const response = await Axios.post('https://studyfil-api.onrender.com/user/changeinformation', { userId, firstName, lastName }, { withCredentials: true });
    return response;
    
}

export { submitAccountInformation };