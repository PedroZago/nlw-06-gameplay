import React, { useState } from 'react';
import {
  Text, View, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { CategorySelection } from '../../components/CategorySelection';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { ModalView } from '../../components/ModalView';
import { Background } from '../../components/Background';
import { IGuild } from '../../components/Appointment';
import { Guilds } from '../Guilds';

import { styles } from './styles';

import { theme } from '../../global/styles/theme';
import { COLLECTION_APPOINTMENTS } from '../../configs/database';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<IGuild>({} as IGuild);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  const { navigate } = useNavigation();

  const handleOpenGuildsModal = () => {
    setOpenGuildsModal(true);
  };

  const handleCloseGuildsModal = () => {
    setOpenGuildsModal(false);
  };

  const handleGuildSelected = (guildSelected: IGuild) => {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  };

  const handleSelectedCategory = (categoryId: string) => {
    setCategory(categoryId);
  };

  const handleSave = async () => {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment]),
    );

    navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Background>
        <ScrollView>
          <Header
            title="Agendar partida"
          />

          <Text style={[
            styles.label,
            { marginLeft: 24, marginTop: 36, marginBottom: 18 },
          ]}
          >
            Categoria
          </Text>

          <CategorySelection
            hasCheckBox
            setSelectedCategory={handleSelectedCategory}
            selectedCategory={category}
          />

          <View style={styles.form}>
            <RectButton
              onPress={handleOpenGuildsModal}
            >
              <View style={styles.select}>
                {
                  guild.icon
                    ? (
                      <GuildIcon
                        guildIcon={guild.id}
                        iconId={guild.icon}
                      />
                    )
                    : <View style={styles.image} />
                }

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {
                      guild.name
                        ? guild.name
                        : 'Selecione um servidor'
                    }
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[
                  styles.label,
                  { marginBottom: 12 },
                ]}
                >
                  Dia e mês
                </Text>

                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    value={day}
                    onChangeText={setDay}
                  />

                  <Text style={styles.divider}>
                    /
                  </Text>

                  <SmallInput
                    maxLength={2}
                    value={month}
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[
                  styles.label,
                  { marginBottom: 12 },
                ]}
                >
                  Hora e minuto
                </Text>

                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    value={hour}
                    onChangeText={setHour}
                  />

                  <Text style={styles.divider}>
                    /
                  </Text>

                  <SmallInput
                    maxLength={2}
                    value={minute}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[
              styles.field,
              { marginBottom: 12 },
            ]}
            >
              <Text style={[
                styles.label,
                { marginBottom: 12 },
              ]}
              >
                Descrição
              </Text>

              <Text style={styles.caracteresLimit}>
                Max 100 caracteres
              </Text>
            </View>

            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              value={description}
              onChangeText={setDescription}
            />

            <View style={styles.footer}>
              <Button
                title="Agendar"
                onPress={handleSave}
              />
            </View>
          </View>
        </ScrollView>

        <ModalView
          visible={openGuildsModal}
          closeModal={handleCloseGuildsModal}
        >
          <Guilds
            guildSelected={handleGuildSelected}
          />
        </ModalView>
      </Background>
    </KeyboardAvoidingView>
  );
}
