import React from 'react';
import { Image } from 'react-native';

import { styles } from './styles';

export function GuildIcon() {
  const uri = 'https://i.pinimg.com/736x/ed/c5/4b/edc54b9cfe42b1417dddbd51b8b622e6.jpg';

  return (
    <Image
      source={{ uri }}
      style={styles.image}
      resizeMode="cover"
    />
  );
}
