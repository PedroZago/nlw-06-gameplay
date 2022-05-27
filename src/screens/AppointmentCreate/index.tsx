import React, { useState } from 'react';
import {
  Text, View, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { CategorySelection } from '../../components/CategorySelection';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';

import { styles } from './styles';

import { theme } from '../../global/styles/theme';

import { IGuild } from '../../components/Appointment';

export function AppointmentCreate() {
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<IGuild>({} as IGuild);

  const handleOpenGuildsModal = () => {
    setOpenGuildsModal(true);
  };

  const handleGuildSelected = (guildSelected: IGuild) => {
    setGuild(guildSelected);
    setOpenGuildsModal(false);
  };

  const handleSelectedCategory = (categoryId: string) => {
    if (categoryId === category) {
      setCategory('');
    } else {
      setCategory(categoryId);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* <Background> */}
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
                  ? <GuildIcon />
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
              <Text style={styles.label}>
                Dia e mês
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />

                <Text style={styles.divider}>
                  /
                </Text>

                <SmallInput maxLength={2} />
              </View>
            </View>

            <View>
              <Text style={styles.label}>
                Horário
              </Text>

              <View style={styles.column}>
                <SmallInput maxLength={2} />

                <Text style={styles.divider}>
                  /
                </Text>

                <SmallInput maxLength={2} />
              </View>
            </View>
          </View>

          <View style={[
            styles.field,
            { marginBottom: 12 },
          ]}
          >
            <Text style={styles.label}>
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
          />

          <View style={styles.footer}>
            <Button title="Agendar" />
          </View>
        </View>
      </ScrollView>

      <ModalView
        visible={openGuildsModal}
      >
        <Guilds
          guildSelected={handleGuildSelected}
        />
      </ModalView>
      {/* </Background> */}
    </KeyboardAvoidingView>
  );
}
