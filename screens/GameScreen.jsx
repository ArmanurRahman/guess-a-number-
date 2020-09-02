import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomNumber = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (max - min)) + min;
    if (rndNumber === exclude) {
        return generateRandomNumber(min, max, exclude);
    }
    return rndNumber;
};
const GameScreen = (props) => {
    const [guessNumber, setGuessNumber] = useState(
        generateRandomNumber(0, 100, props.userChoice)
    );
    return (
        <View style={styles.screen}>
            <Text> Opponent's Guess</Text>
            <NumberContainer>{guessNumber}</NumberContainer>
            <View>
                <Card style={styles.buttonContainer}>
                    <Button title='LOWER' />
                    <Button title='HIGHER' />
                </Card>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 30,
        width: 300,
        maxWidth: "80%",
    },
});

export default GameScreen;
