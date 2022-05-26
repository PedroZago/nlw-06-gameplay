import React, { useState } from 'react';
import { FlatList, View } from 'react-native';

import { SelectedCategory } from '../../components/SelectedCategory';
import { Appointment, IAppointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';

import { styles } from './styles';

const data: IAppointment[] = [
  {
    id: '1',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: undefined,
      owner: true,
    },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
  },
  {
    id: '2',
    guild: {
      id: '1',
      name: 'Lendários',
      icon: undefined,
      owner: true,
    },
    category: '1',
    date: '22/06 às 20:40h',
    description: 'É hoje que vamos chegar ao challenger sem perder uma partida da md10',
  },
];

export function Home() {
  const [category, setCategory] = useState('');

  const handleSelectedCategory = (categoryId: string) => {
    if (categoryId === category) {
      setCategory('');
    } else {
      setCategory(categoryId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd />
      </View>

      <SelectedCategory
        selectedCategory={category}
        setSelectedCategory={handleSelectedCategory}
      />

      <View style={styles.content}>
        <ListHeader
          title="Partidas agendadas"
          subtitle="Total 6"
        />

        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Appointment data={item} />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}
