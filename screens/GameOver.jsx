import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOver = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Game is Over</Text>
            <Text> Number of round {props.numberOfRound}</Text>
            <Text> Number was {props.guessNumber}</Text>
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
});

export default GameOver;
