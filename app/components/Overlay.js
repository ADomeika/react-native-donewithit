import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../config/colors';

export default function Overlay({ children }) {
  return <View style={styles.overlay}>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    opacity: 0.7,
  },
});
