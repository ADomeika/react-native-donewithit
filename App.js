import React, { useCallback, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { initializeApp, getApps } from "firebase/app";

import AppNavigator from "./app/navigation/AppNavigator";
import navigationTheme from "./app/navigation/navigationTheme";
import OfflineNotice from "./app/components/OfflineNotice";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import { navigationRef } from "./app/navigation/rootNavigation";
import firebaseConfig from "./app/config/firebase";
import { View } from "react-native";

if (getApps().length < 1) {
    initializeApp(firebaseConfig);
}
console.disableYellowBox = true;

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [user, setUser] = useState(null);
    const [isReady, setIsReady] = useState(false);

    const restoreUser = async () => {
        const user = await authStorage.getUser();
        if (user) setUser(user);
    };

    useEffect(() => {
        async function prepare() {
            await restoreUser();
            setIsReady(true);
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (isReady) {
            await SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
            <AuthContext.Provider value={{ user, setUser }}>
                <OfflineNotice />
                <NavigationContainer
                    ref={navigationRef}
                    theme={navigationTheme}
                >
                    {user ? <AppNavigator /> : <AuthNavigator />}
                </NavigationContainer>
            </AuthContext.Provider>
        </View>
    );
}
