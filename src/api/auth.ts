import {User} from '../types';
import axios from './axios';
const login = async ({email, password}: {email: string; password: string}) => {
  try {
    const {data: users} = await axios.get<User[]>('users');

    const fndUser = users.find(
      user => user.email === email && user.password === password,
    );
    if (!fndUser) {
      throw Error('user not found');
    }
    return fndUser;
  } catch (error) {
    throw error;
  }
};
const signup = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const {data: users} = await axios.get<User[]>('users');
  if (users.find(user => user.email === email)) {
    throw new Error('Email is existed before');
  }

  const {data: user} = await axios.post<User>('users', {name, email, password});
  return user;
};
export {login, signup};
