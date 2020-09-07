import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Color from "../constants/color";

const Header = (props) => {
    return (
        <View
            style={{
                ...styles.HeaderBase,
                ...Platform.select({
                    ios: styles.HeaderIOS,
                    android: styles.HeaderAndroid,
                }),
            }}
        >
            <Text style={styles.HeaderText}>{props.title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    HeaderBase: {
        width: "100%",
        height: 60,
        paddingTop: 14,

        alignItems: "center",
        justifyContent: "center",
    },
    HeaderIOS: {
        backgroundColor: "white",
        borderColor: "#ccc",
        borderWidth: 1,
    },
    HeaderAndroid: {
        backgroundColor: Color.primary,
    },
    HeaderText: {
        color: "black",
        fontSize: 18,
    },
});

export default Header;
