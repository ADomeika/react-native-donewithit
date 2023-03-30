import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

export default function ImageInput({ image, onChangeImage }) {
    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async () => {
        const { granted } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!granted) {
            alert("You need to enable permission to access your photo library");
        }
    };

    const handlePress = () => {
        if (!image) selectImage();
        else
            Alert.alert(
                "Delete",
                "Are you sure you want to delete this image?",
                [
                    {
                        text: "Yes",
                        onPress: () => onChangeImage(null),
                    },
                    {
                        text: "No",
                    },
                ]
            );
    };

    const selectImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 0.6,
            });
            if (!result.canceled) {
                onChangeImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                {!image && (
                    <MaterialCommunityIcons
                        name="camera"
                        size={40}
                        color={colors.medium}
                    />
                )}
                {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: colors.light,
        borderRadius: 15,
        height: 100,
        justifyContent: "center",
        overflow: "hidden",
        width: 100,
    },
    image: {
        height: "100%",
        width: "100%",
    },
});
