import React from "react";
import {
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
} from "react-native";

export default function Screen({ children, style }) {
    return (
        <SafeAreaView style={styles.screen}>
            <View style={[{ flex: 1 }, style]}>{children}</View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
});
