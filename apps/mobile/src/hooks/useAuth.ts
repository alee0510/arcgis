import {useMutation, useQuery} from '@tanstack/react-query';
import {useAuth} from '@mobile/store/auth';
import {createUser, getUserById, getUsers} from '@mobile/services/auth';
import {formatZodError} from '@mobile/utils/error-formatter';
import {LoginSchema, RegisterSchema} from '@mobile/utils/auth-validation';

import type {User} from '@mobile/types/auth';

export const useAuthLogin = () => {
  const {setUser} = useAuth();
  return useMutation({
    mutationFn: async (user: Pick<User, 'email' | 'password'>) => {
      // do input validation
      const validationResult = LoginSchema.safeParse(user);
      if (!validationResult.success) {
        const errorMessages = formatZodError(validationResult.error);
        throw new Error(errorMessages);
      }

      // check if user exists (?email&password), throw error if not
      const users = await getUsers({
        email: user.email,
        password: user.password,
      });
      if (users.length === 0) {
        throw new Error('User does not exist');
      }

      // if all good, return user
      return {
        id: users[0].id,
        username: users[0].username,
        email: users[0].email,
        role: users[0].role,
      };
    },
    onSuccess: data => {
      setUser(data);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useAuthRegister = () => {
  const {setUser} = useAuth();

  return useMutation({
    mutationFn: async (
      user: Omit<User, 'id' | 'role'> & {confirmPassword: string},
    ) => {
      const {confirmPassword, ...rest} = user;
      if (rest.password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // do input validation
      const validationResult = RegisterSchema.safeParse(rest);
      if (!validationResult.success) {
        const errorMessages = formatZodError(validationResult.error);
        throw new Error(errorMessages);
      }

      // check if user exists (?email), throw error if so
      const users = await getUsers({
        email: user.email,
      });
      if (users.length > 0) {
        throw new Error('User already exists');
      }

      // if all good, create user
      const newUser = await createUser({
        ...validationResult.data,
        role: 'user',
      });
      return {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      };
    },
    onSuccess: data => {
      setUser(data);
    },
    onError: error => {
      console.log(error);
    },
  });
};

export const useCurrentUser = () => {
  const {id} = useAuth();

  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      return await getUserById(id);
    },
    enabled: !!id,
  });
};
