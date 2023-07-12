export function getNameInitials(name) {
    const nameArray = name.split(' ');
    let initials = '';
    for (let index in nameArray) {
        initials += nameArray[index][0];
    }
    return initials;
}