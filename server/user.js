const users = [];
const addUsr = ({ id, name, room }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = users.find((user) => user.name === name && user.room === room);
    //    console.log(existingUser)
    if (existingUser) {
        //    console.log('working')
        return ({ error: 'This username is alrady taken' });
    }
    const user = { id, name, room };
    users.push(user);
    // console.log(users)
    return { user }
}
const removeUser =  (id) => {

    const index = users.findIndex((user) => user.id === id);
    // console.log(index)
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => users.find((user) => user.id === id);

const getUserInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUsr, removeUser, getUser, getUserInRoom };