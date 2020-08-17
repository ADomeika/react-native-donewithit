import React, { useEffect } from 'react';
import { FlatList, StyleSheet, ActivityIndicator } from 'react-native';

import Card from '../components/Card';
import colors from '../config/colors';
import listingsApi from '../api/listings';
import routes from '../navigation/routes';
import Screen from '../components/Screen';
import AppText from '../components/AppText';
import AppButton from '../components/AppButton';
import AppActivityIndicator from '../components/AppActivityIndicator';
import useApi from '../hooks/useApi';

export default function ListingsScreen({ navigation }) {
  const { data: listings, error, loading, request: loadListings } = useApi(
    listingsApi.getListings
  );

  useEffect(() => {
    loadListings();
  }, []);

  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <AppText>Could not retrieve the listings.</AppText>
          <AppButton title='Retry' onPress={loadListings} />
        </>
      )}
      {/* <AppActivityIndicator visible={loading} /> */}
      <ActivityIndicator animating={loading} size='large' />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={'$' + item.price}
            imageUrl={item.images[0].url}
            thumbnailUrl={item.images[0].thumbnailUrl}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
});
