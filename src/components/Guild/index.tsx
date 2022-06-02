import { Feather } from '@expo/vector-icons';
import React from 'react';
import {
  TouchableOpacityProps, TouchableOpacity, View, Text,
} from 'react-native';
import { theme } from '../../global/styles/theme';

import { IGuild } from '../Appointment';
import { GuildIcon } from '../GuildIcon';

import { styles } from './styles';

type GuildProps = TouchableOpacityProps & {
  data: IGuild;
}

export function Guild({ data, ...rest }: GuildProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      {...rest}
    >
      <GuildIcon
        guildIcon={data.id}
        iconId={data.icon}
      />

      <View style={styles.content}>
        <View>
          <Text style={styles.title}>
            {data.name}
          </Text>

          <Text style={styles.type}>
            {data.owner ? 'Anfitrião' : 'Visitante'}
          </Text>
        </View>
      </View>

      <Feather
        name="chevron-right"
        color={theme.colors.heading}
        size={24}
      />
    </TouchableOpacity>
  );
}
