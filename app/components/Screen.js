import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={[{ paddingTop: Constants.statusBarHeight, flex: 1 }, style]}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
