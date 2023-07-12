export function getTimePassed(timestamp) {
    const postTime = new Date(timestamp);
    const currentTime = new Date();
    const timeDiffInSeconds = Math.floor((currentTime - postTime) / 1000);

    if (timeDiffInSeconds < 60) {
        return 'just now';
    } else if (timeDiffInSeconds < 3600) {
        const minutes = Math.floor(timeDiffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 86400) {
        const hours = Math.floor(timeDiffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 2592000) {
        const days = Math.floor(timeDiffInSeconds / 86400);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDiffInSeconds < 31536000) {
        const months = Math.floor(currentTime.getMonth() - postTime.getMonth() + (12 * (currentTime.getFullYear() - postTime.getFullYear())));
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(timeDiffInSeconds / 31536000);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}