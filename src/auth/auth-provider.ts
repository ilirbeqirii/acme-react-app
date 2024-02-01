import { User } from "./user.model";

const localStorageKey = "_user_key_";

function handleResponse(user: User) {
  window.localStorage.setItem(localStorageKey, JSON.stringify(user));
}

function getUser() {
  const serializedUser = window.localStorage.getItem(localStorageKey);
  if (serializedUser) {
    return JSON.parse(serializedUser) as User;
  }
}

async function login(username: string, password: string) {
  console.log(password);

  return new Promise<User>((res) => {
    const user: User = {
      id: 2,
      userName: username,
      isAdmin: false,
    };

    res(user);
  }).then((user) => {
		handleResponse(user);

		return user;
	});
}

async function register(username: string, password: string) {
  console.log(password);

  return new Promise<User>((res) => {
    const user: User = {
      id: 2,
      userName: username,
      isAdmin: false,
    };

    res(user);
  }).then((user) => {
		handleResponse(user);

		return user;
	});
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { login, register, logout, getUser };
