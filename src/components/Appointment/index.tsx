import React from 'react';
import { View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { categories } from '../../utils/categories';

import PlayerSvg from '../../assets/player.svg';
import CalendarSvg from '../../assets/calendar.svg';

import { GuildIcon } from '../GuildIcon';

import { styles } from './styles';
import { theme } from '../../global/styles/theme';

export type IGuild = {
  id: string;
  name: string;
  icon?: string;
  owner: boolean;
}

export type IAppointment = {
  id: string;
  guild: IGuild;
  category: string;
  date: string;
  description: string;
}

type AppointmentProps = RectButtonProps & {
  data: IAppointment;
}

export function Appointment({ data, ...rest }: AppointmentProps) {
  const [category] = categories.filter((item) => item.id === data.category);
  const { primary, on } = theme.colors;

  return (
    <RectButton {...rest}>
      <View style={styles.container}>
        <GuildIcon />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {data.guild.name}
            </Text>

            <Text style={styles.category}>
              {category.title}
            </Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.dateInfo}>
              <CalendarSvg />

              <Text style={styles.date}>
                {data.date}
              </Text>
            </View>

            <View style={styles.playersInfo}>
              <PlayerSvg fill={data.guild.owner ? primary : on} />

              <Text
                style={[
                  styles.player,
                  { color: data.guild.owner ? primary : on },
                ]}
              >
                {data.guild.owner ? 'Anfitrião' : 'Visitante'}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </RectButton>
  );
}
