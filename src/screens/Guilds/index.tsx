import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { IGuild } from '../../components/Appointment';
import { Guild } from '../../components/Guild';
import { ListDivider } from '../../components/ListDivider';
import { Loading } from '../../components/Loading';
import { api } from '../../services/api';

import { styles } from './styles';

type GuildsProps = {
  guildSelected: (_guildSelected: IGuild) => void
}

export function Guilds({ guildSelected }: GuildsProps) {
  const [guilds, setGuilds] = useState<IGuild[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGuilds = async () => {
    const response = await api.get('/users/@me/guilds');

    setGuilds(response.data);

    setLoading(false);
  };

  useEffect(() => {
    fetchGuilds();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <Loading />
        : (
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
            contentContainerStyle={{ paddingBottom: 69 }}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            style={styles.guilds}
          />
        )}
    </View>
  );
}
