export type User = {
  id: string;
  name: string;
  room: string;
  error?: string;
};

const users: User[] = [];

export const addUser = ({ id, name, room }: User) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const isExistingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (!name || !room) return { error: "User name and room are required." };

  if (isExistingUser) {
    return { error: "This user name has been taken" };
  }
  users.push({ id, name, room });

  return { newUser: { id, name, room } };
};

export const removeUser = (id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return { error: "User not found" };
  }

  return { removedUser: users.splice(userIndex, 1)[0] };
};

export const getUser = (id: string): User =>
  users.find((user) => user.id === id);

export const getUsersInRoom = (room: string): User[] =>
  users.filter((user) => user.room === room);
