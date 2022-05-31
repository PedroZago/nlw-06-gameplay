import React from 'react';
import {
  View, Text, Image, ActivityIndicator,
} from 'react-native';

import IllustrationImg from '../../assets/illustration.png';

import { Background } from '../../components/Background';
import { ButtonIcon } from '../../components/ButtonIcon';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { useAuth } from '../../hooks/authContext';

export function SignIn() {
  const { signIn, loading } = useAuth();

  const handleSignIn = async () => {
    try {
      await signIn();
    } catch (error) {

    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se
            {' '}
            {'\n'}
            e organize suas
            {' '}
            {'\n'}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games
            {' '}
            {'\n'}
            favoritos com seus amigos
          </Text>

          {loading
            ? <ActivityIndicator color={theme.colors.primary} />
            : (
              <ButtonIcon
                title="Entrar com Discord"
                onPress={handleSignIn}
              />
            )}
        </View>
      </View>
    </Background>
  );
}
