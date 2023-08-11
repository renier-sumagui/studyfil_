import { io } from 'socket.io-client'; 

const URL = 'https://studyfil-api.onrender.com';


export const socket = io(URL);