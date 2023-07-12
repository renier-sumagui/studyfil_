const LOCAL_SERVER_URL = "https://studyfil-api.onrender.com/meetings";
const API_BASE_URL = "https://api.videosdk.live";

export const getToken = async () => {
    try {
        const response = await fetch(`${LOCAL_SERVER_URL}/get-token`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        const { token } = await response.json();
        return token;
    } catch (error) {
        console.log("error", error);
    }
};
export const createMeeting = async ({ token }) => {
    const url = `${API_BASE_URL}/v2/rooms`;
    const options = {
        method: "POST",
        headers: { Authorization: token, "Content-Type": "application/json" },
    };
    const { roomId } = await fetch(url, options)
        .then((response) => response.json())
        .catch((error) => console.error("error", error));
    return roomId;
};
  
export const validateMeeting = async ({ roomId, token }) => {
    const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;
    
    const options = {
        method: "GET",
        headers: { Authorization: token, "Content-Type": "application/json" },
    };
    
    const result = await fetch(url, options)
        .then((response) => response.json()) //result will have meeting id
        .catch((error) => console.error("error", error));
    
    return result ? result.roomId === roomId : false;
};