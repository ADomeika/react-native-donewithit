import React from "react";
import {
    createStackNavigator,
    TransitionPresets,
} from "@react-navigation/stack";

import ListingsScreen from "../screens/ListingsScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import routes from "./routes";

const Stack = createStackNavigator();

export default FeedNavigator = () => (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            ...TransitionPresets.ModalPresentationIOS,
        }}
    >
        <Stack.Screen name={routes.LISTINGS} component={ListingsScreen} />
        <Stack.Screen
            name={routes.LISTING_DETAILS}
            component={ListingDetailsScreen}
        />
    </Stack.Navigator>
);
