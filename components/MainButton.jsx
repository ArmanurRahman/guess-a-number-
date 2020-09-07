import React from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from "react-native";
import Color from "../constants/color";

const MainButton = (props) => {
    let ButtonComponent = TouchableOpacity;
    if (Platform.OS === "android" && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }
    return (
        <View style={styles.buttonContainer}>
            <ButtonComponent activeOpacity={0.7} onPress={props.onPress}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.children}</Text>
                </View>
            </ButtonComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
        fontSize: 18,
    },
    buttonContainer: {
        borderRadius: 25,
        overflow: "hidden",
    },
});

export default MainButton;
