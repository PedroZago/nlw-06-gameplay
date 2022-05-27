import React, { useState } from 'react';
import { FlatList, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { CategorySelection } from '../../components/CategorySelection';
import { Appointment, IAppointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';

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

  const { navigate } = useNavigation();

  const handleSelectedCategory = (categoryId: string) => {
    if (categoryId === category) {
      setCategory('');
    } else {
      setCategory(categoryId);
    }
  };

  const handleAppointmentDetails = () => {
    navigate('AppointmentDetails');
  };

  const handleAppointmentCreate = () => {
    navigate('AppointmentCreate');
  };

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelection
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
            <Appointment
              data={item}
              onPress={handleAppointmentDetails}
            />
          )}
          ItemSeparatorComponent={() => <ListDivider />}
          style={styles.matches}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </Background>
  );
}
