import {env} from '@mobile/env';
import type {User} from '@mobile/types/auth';

export async function getUsers(params: Partial<User>): Promise<User[] | []> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(env.API_BASE_URL + '/users' + '?' + query);
  return response.json();
}

export async function getUserById(id: string): Promise<User | null> {
  const response = await fetch(env.API_BASE_URL + '/users/' + id);
  return response.json();
}

export async function createUser(user: Omit<User, 'id'>): Promise<User> {
  const response = await fetch(env.API_BASE_URL + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}

export async function updateUser(user: Partial<User>): Promise<User> {
  const response = await fetch(env.API_BASE_URL + '/users/' + user.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}
