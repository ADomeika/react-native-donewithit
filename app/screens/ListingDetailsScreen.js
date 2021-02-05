import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import AppText from '../components/AppText';
import ListItem from '../components/ListItem';
import colors from '../config/colors';
import { Image } from 'react-native-expo-image-cache';
import ContactSellerForm from '../components/ContactSellerForm';

export default function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    <ScrollView>
      <Image
        style={styles.image}
        uri={listing.images[0]}
        preview={{ uri: listing.images[0] }}
        tint='light'
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.title}</AppText>
        <AppText style={styles.price}>${listing.price}</AppText>
        <View style={styles.userContainer}>
          <ListItem
            image={require('../assets/jacket.jpg')}
            title='Adomas Domeika'
            subTitle='5 Listings'
          />
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  userContainer: {
    marginVertical: 40,
  },
});
