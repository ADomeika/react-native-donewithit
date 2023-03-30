import React, { useEffect } from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";

import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import useApi from "../hooks/useApi";
// import listingsSubs from "../subscriptions/listings";

export default function ListingsScreen({ navigation, route }) {
    const {
        data: listings,
        error,
        loading,
        request: loadListings,
    } = useApi(listingsApi.getListings);

    useEffect(() => {
        loadListings();
        // listingsSubs.subscribe();
    }, []);

    return (
        <Screen style={styles.screen}>
            {error && (
                <>
                    <AppText>Could not retrieve the listings.</AppText>
                    <AppButton title="Retry" onPress={loadListings} />
                </>
            )}
            <ActivityIndicator animating={loading} size="large" />
            <FlatList
                data={listings}
                keyExtractor={(listing) => listing.key.toString()}
                contentContainerStyle={{ padding: 20 }}
                renderItem={({ item }) => (
                    <Card
                        title={item.title}
                        subTitle={"$" + item.price}
                        imageUrl={item.thumbnail}
                        thumbnailUrl={item.thumbnail}
                        onPress={() =>
                            navigation.navigate(routes.LISTING_DETAILS, item)
                        }
                    />
                )}
            />
        </Screen>
    );
}

const styles = StyleSheet.create({
    screen: {
        backgroundColor: colors.light,
    },
});
