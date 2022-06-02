import React from 'react';
import { CDN_IMAGE } from '@env';
import { Image, View } from 'react-native';

import DiscordSvg from '../../assets/discord.svg';

import { styles } from './styles';

type GuildIconProps = {
  guildIcon: string;
  iconId?: string;
}

export function GuildIcon({ guildIcon, iconId }: GuildIconProps) {
  const uri = `${CDN_IMAGE}/icons/${guildIcon}/${iconId}.png`;

  return (
    <View style={styles.container}>
      {iconId ? (
        <Image
          source={{ uri }}
          style={styles.image}
          resizeMode="cover"
        />
      )
        : (
          <DiscordSvg
            width={40}
            height={40}
          />
        )}
    </View>
  );
}

GuildIcon.defaultProps = {
  iconId: undefined,
};
