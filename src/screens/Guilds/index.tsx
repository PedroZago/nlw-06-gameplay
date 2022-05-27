import React from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { IGuild } from '../../components/Appointment';
import { Guild } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';

import { styles } from './styles';

type GuildsProps = {
  guildSelected: (_guildSelected: IGuild) => void
}

const guilds: IGuild[] = [
  {
    id: '1',
    name: 'Lendários',
    icon: 'image.png',
    owner: true,
  },
];

export function Guilds({ guildSelected }: GuildsProps) {
  return (
    <View style={styles.container}>
      <FlatList
        data={guilds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Guild
            data={item}
            onPress={() => guildSelected(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ListDivider />}
        style={styles.guilds}
      />
    </View>
  );
}
