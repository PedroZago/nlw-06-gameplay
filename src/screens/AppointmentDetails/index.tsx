import React, { useState, useEffect } from 'react';
import { Fontisto } from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';
import {
  Alert,
  FlatList, ImageBackground, Platform, Share, Text, View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { ListHeader } from '../../components/ListHeader';
import { IMember, Member } from '../../components/Member';
import { Loading } from '../../components/Loading';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import { IAppointment } from '../../components/Appointment';

import BannerImg from '../../assets/banner.png';

import { theme } from '../../global/styles/theme';
import { styles } from './styles';

import { api } from '../../services/api';

type AppointmentDetailsParams = {
  guildSelected: IAppointment;
}

type guildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: IMember[];
}

export function AppointmentDetails() {
  const [widget, setWidget] = useState<guildWidget>({} as guildWidget);
  const [loading, setLoading] = useState(true);

  const { params } = useRoute();
  const { guildSelected } = params as AppointmentDetailsParams;

  const fetchGuildWidgetInfo = async () => {
    try {
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);

      setWidget(response.data);
    } catch {
      Alert.alert('Verifique as configurações do servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleShareInvitation = () => {
    const message = Platform.OS === 'ios'
      ? `Junte-se a ${guildSelected.guild.name}`
      : widget.instant_invite;

    Share.share({
      message,
      url: widget.instant_invite,
    });
  };

  const handleOpenGuild = () => {
    Linking.openURL(widget.instant_invite);
  };

  useEffect(() => {
    fetchGuildWidgetInfo();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={(
          guildSelected.guild.owner
          && (
            <BorderlessButton onPress={handleShareInvitation}>
              <Fontisto
                name="share"
                size={20}
                color={theme.colors.primary}
              />
            </BorderlessButton>
          )
        )}
      />

      <ImageBackground
        source={BannerImg}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {loading ? <Loading />
        : (
          <>
            <ListHeader
              title="Jogadores"
              subtitle={`Total ${widget.members?.length ?? 0}`}
            />

            <FlatList
              data={widget.members}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Member data={item} />
              )}
              ItemSeparatorComponent={() => <ListDivider isCentered />}
              style={styles.members}
            />
          </>
        )}

      {
        guildSelected.guild.owner
        && (
          <View style={styles.footer}>
            <ButtonIcon
              title="Entrar na partida"
              onPress={handleOpenGuild}
            />
          </View>
        )
      }

    </Background>
  );
}
