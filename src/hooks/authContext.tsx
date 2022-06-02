import React, {
  createContext, ReactNode, useContext, useState, useEffect,
} from 'react';
import * as AuthSession from 'expo-auth-session';
import { AxiosRequestConfig, AxiosRequestHeaders, HeadersDefaults } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  CLIENT_ID, REDIRECT_URI, CDN_IMAGE, RESPONSE_TYPE, SCOPE,
} from '@env';

import { api } from '../services/api';
import { COLLECTION_USERS } from '../configs/database';

interface SmartAxiosDefaults<D = any> extends Omit<AxiosRequestConfig<D>, 'headers'> {
  headers: HeadersDefaults & AxiosRequestHeaders;
}

type AuthProviderProps = {
  children: ReactNode;
}

type User = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthContextData = {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    try {
      setLoading(true);

      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;

      if (type === 'success' && !params.error) {
        const apiDefaults = api.defaults as SmartAxiosDefaults;
        apiDefaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await api.get('/users/@me');

        const firstName = userInfo.data.username.split(' ')[0];
        userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;

        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };

        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData));

        setUser(userData);
      }
    } catch {
      throw new Error('Não foi possível autenticar.');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  };

  const loadUserStorageData = async () => {
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);

    if (storage) {
      const userLogged = JSON.parse(storage) as User;

      const apiDefaults = api.defaults as SmartAxiosDefaults;
      apiDefaults.headers.authorization = `Bearer ${userLogged.token}`;

      setUser(userLogged);
    }
  };

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return (
    <AuthContext.Provider value={{
      user, signIn, loading, signOut,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
