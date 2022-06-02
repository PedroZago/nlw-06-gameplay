import React, { useCallback, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { CategorySelection } from '../../components/CategorySelection';
import { Appointment, IAppointment } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Background } from '../../components/Background';
import { Loading } from '../../components/Loading';

import { styles } from './styles';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function Home() {
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  const { navigate } = useNavigation();

  const handleSelectedCategory = (categoryId: string) => {
    if (categoryId === category) {
      setCategory('');
    } else {
      setCategory(categoryId);
    }
  };

  const handleAppointmentDetails = (guildSelected: IAppointment) => {
    navigate('AppointmentDetails', {
      guildSelected,
    });
  };

  const handleAppointmentCreate = () => {
    navigate('AppointmentCreate');
  };

  const loadAppointment = async () => {
    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: IAppointment[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter((item) => item.category === category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  };

  useFocusEffect(useCallback(() => {
    loadAppointment();
  }, [category]));

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

      {
        loading ? <Loading />
          : (
            <>
              <ListHeader
                title="Partidas agendadas"
                subtitle={`Total ${appointments.length}`}
              />

              <FlatList
                data={appointments}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Appointment
                    data={item}
                    onPress={() => handleAppointmentDetails(item)}
                  />
                )}
                ItemSeparatorComponent={() => <ListDivider />}
                contentContainerStyle={{ paddingBottom: 69 }}
                style={styles.matches}
                showsVerticalScrollIndicator={false}
              />
            </>
          )
      }
    </Background>
  );
}
