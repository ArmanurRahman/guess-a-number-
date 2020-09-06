import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

const GameOver = (props) => {
    return (
        <View style={styles.screen}>
            <TitleText>Game is Over</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../assets/success.png")}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>

            <BodyText> Number of round {props.numberOfRound}</BodyText>
            <BodyText> Number was {props.guessNumber}</BodyText>
            <Button title='New Game' onPress={props.restartGame} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical: 30,
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

export default GameOver;
