const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const isExistingUser = users.find(
    user => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "User name and room are required." };

  if (isExistingUser) {
    return { error: "This user name has been taken" };
  }
  users.push({ id, name, room });

  return { newUser: { id, name, room } };
};

const removeUser = id => {
  const userIndex = users.findIndex(user => user.id === id);

  if (userIndex === -1) {
    return { error: "User not found" };
  }

  return users.splice(userIndex, 1)[0];
};

const getUser = id => users.find(user => user.id === id);

const getUsersInRoom = room => users.filter(user => user.room === room);

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
};
