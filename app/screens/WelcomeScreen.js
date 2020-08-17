import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import AppButton from '../components/AppButton';
import routes from '../navigation/routes';

export default function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
      blurRadius={5}
    >
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo-red.png')} style={styles.logo} />
        <Text style={styles.tagline}>Sell What You Don't Need</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          title='Login'
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <AppButton
          title='Register'
          color='secondary'
          onPress={() => navigation.navigate(routes.REGISTER)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonsContainer: {
    padding: 20,
    width: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 80,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  tagline: {
    fontSize: 25,
    fontWeight: '600',
    paddingVertical: 20,
  },
});
